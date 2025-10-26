import { useEffect, useState } from 'react';

// TODO: Add VAPID public key
const VAPID_PUBLIC_KEY =
  'BElFVjDMeBiP69hZLqeLBQnlALEh_euEXLsWJKsQXcgTmOkY4XQ63xnfsvLbdbTQhQjs3LenRlTSMQCdQuelyTE';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export type NotificationPermission = 'default' | 'granted' | 'denied';

export interface NotificationState {
  permission: NotificationPermission;
  isSupported: boolean;
  notificationCount: number;
  isSubscribed: boolean;
}

export function useNotification() {
  const [state, setState] = useState<NotificationState>({
    permission: 'default',
    isSupported: 'Notification' in window,
    notificationCount: 0,
    isSubscribed: false
  });

  useEffect(() => {
    if (!('Notification' in window)) {
      return;
    }

    // Check current permission
    const permission = Notification.permission as NotificationPermission;
    setState((prev) => ({ ...prev, permission }));

    // Check if subscribed
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          if (subscription) {
            setState((prev) => ({ ...prev, isSubscribed: true }));
          }
        });
      });
    }

    // Listen for notification events
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NOTIFICATION_RECEIVED') {
          setState((prev) => ({
            ...prev,
            notificationCount: prev.notificationCount + 1
          }));
        }
      });
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.error('Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      setState((prev) => ({
        ...prev,
        permission: permission as NotificationPermission
      }));
      return permission === 'granted';
    }

    return false;
  };

  const subscribeToPush = async () => {
    if (!('serviceWorker' in navigator)) {
      console.error('Service workers not supported');
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setState((prev) => ({ ...prev, isSubscribed: true }));
  };

  const unsubscribeFromPush = async () => {
    if (!('serviceWorker' in navigator)) {
      console.error('Service workers not supported');
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await fetch('/unsubscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      await subscription.unsubscribe();

      setState((prev) => ({ ...prev, isSubscribed: false }));
    }
  };

  const sendNotification = async (
    title: string,
    options?: NotificationOptions
  ) => {
    if (!state.isSupported) {
      console.error('Notifications not supported');
      return;
    }

    if (state.permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        console.error('Notification permission denied');
        return;
      }
    }

    await fetch('/send-notification', {
      method: 'POST',
      body: JSON.stringify({ title, body: options?.body }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  const sendTestNotification = () => {
    const now = new Date().toLocaleTimeString();
    sendNotification('Test Notification', {
      body: `This is a test notification sent at ${now}`,
      tag: 'test-notification',
      requireInteraction: false,
      icon: '/icon-192.png',
      badge: '/icon-192.png'
    });
  };

  return {
    ...state,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    sendNotification,
    sendTestNotification
  };
}


