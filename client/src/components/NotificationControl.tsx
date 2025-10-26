import { Bell, BellOff, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNotification } from '@/hooks/useNotification';

export function NotificationControl() {
  const {
    permission,
    isSupported,
    notificationCount,
    isSubscribed,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    sendTestNotification
  } = useNotification();

  const getPermissionColor = () => {
    switch (permission) {
      case 'granted':
        return 'text-green-600 dark:text-green-400';
      case 'denied':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const getPermissionLabel = () => {
    switch (permission) {
      case 'granted':
        return 'Enabled';
      case 'denied':
        return 'Blocked';
      default:
        return 'Not Requested';
    }
  };

  if (!isSupported) {
    return (
      <Card className="p-6 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100">
              Notifications Not Supported
            </h3>
            <p className="text-sm text-red-800 dark:text-red-200 mt-1">
              Your browser does not support web notifications.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>

          <div className="space-y-4">
            {/* Permission Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                {permission === 'granted' ? (
                  <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <BellOff className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Permission Status
                  </p>
                  <p className={`font-semibold ${getPermissionColor()}`}>
                    {getPermissionLabel()}
                  </p>
                </div>
              </div>
              {permission === 'granted' && (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              )}
            </div>

            {/* Subscription Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Subscription Status
                  </p>
                  <p className={`font-semibold ${isSubscribed ? 'text-green-600' : 'text-red-600'}`}>
                    {isSubscribed ? 'Subscribed' : 'Not Subscribed'}
                  </p>
                </div>
              </div>
            </div>

            {/* Notification Count */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Notifications Sent
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {notificationCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {permission !== 'granted' && (
            <Button
              onClick={requestPermission}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Enable Notifications
            </Button>
          )}

          {permission === 'granted' && !isSubscribed && (
            <Button
              onClick={subscribeToPush}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Subscribe to Push
            </Button>
          )}

          {permission === 'granted' && isSubscribed && (
            <Button
              onClick={unsubscribeFromPush}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Unsubscribe from Push
            </Button>
          )}

          {permission === 'granted' && (
            <Button
              onClick={sendTestNotification}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Send Test Notification
            </Button>
          )}

          {permission === 'denied' && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Notifications are blocked. Please enable them in your browser settings.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
