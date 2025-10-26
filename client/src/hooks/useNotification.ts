import { useEffect, useState } from 'react';

export type NotificationPermission = 'default' | 'granted' | 'denied';

export interface NotificationState {
  permission: NotificationPermission;
  isSupported: boolean;
  notificationCount: number;
}

export function useNotification() {
  const [state, setState] = useState<NotificationState>({
    permission: 'default',
    isSupported: 'Notification' in window,
    notificationCount: 0
  });

  useEffect(() => {
    if (!('Notification' in window)) {
      return;
    }

    // Check current permission
    const permission = Notification.permission as NotificationPermission;
    setState((prev) => ({ ...prev, permission }));

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

    // Try to use service worker if available
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SEND_NOTIFICATION',
        title,
        options
      });
    } else {
      // Fallback to direct notification
      new Notification(title, {
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        ...options
      });
    }

    setState((prev) => ({
      ...prev,
      notificationCount: prev.notificationCount + 1
    }));
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
    sendNotification,
    sendTestNotification
  };
}

