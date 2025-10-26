import { Wifi, WifiOff, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { usePWA } from '@/hooks/usePWA';

export function PWAStatus() {
  const { isInstalled, isOnline, swRegistration } = usePWA();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">PWA Status</h3>

      <div className="space-y-3">
        {/* Installation Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Installation Status
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {isInstalled ? 'Installed as App' : 'Web Version'}
              </p>
            </div>
          </div>
          {isInstalled && (
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          )}
        </div>

        {/* Online Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connection Status
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </div>

        {/* Service Worker Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3">
            {swRegistration ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            )}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Service Worker
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {swRegistration ? 'Active' : 'Registering...'}
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            This is a Progressive Web App. It works offline, can be installed as an app, and supports push notifications.
          </p>
        </div>
      </div>
    </Card>
  );
}

