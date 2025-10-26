import { useState, useEffect } from 'react';
import { useNotification } from '@/hooks/useNotification';
import { Button } from '@/components/ui/button';

export function NotificationScheduler() {
  const { sendNotification } = useNotification();
  const [isSending, setIsSending] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startSending = () => {
    setIsSending(true);
    const id = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      sendNotification('Scheduled Notification', {
        body: `This is a scheduled notification sent at ${now}`,
        tag: 'scheduled-notification',
      });
    }, 60000);
    setIntervalId(id);
  };

  const stopSending = () => {
    setIsSending(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
        Notification Scheduler
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        Send a notification every minute.
      </p>
      <div className="flex gap-4">
        <Button onClick={startSending} disabled={isSending}>
          Start Sending
        </Button>
        <Button onClick={stopSending} disabled={!isSending}>
          Stop Sending
        </Button>
      </div>
    </div>
  );
}
