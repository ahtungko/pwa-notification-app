import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { PWAStatus } from "@/components/PWAStatus";
import { NotificationControl } from "@/components/NotificationControl";
import { usePWA } from "@/hooks/usePWA";
import { APP_TITLE } from "@/const";

export default function Home() {
  const { isInstallable, isInstalled, installApp } = usePWA();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {APP_TITLE}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Test Progressive Web App features and push notifications
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Install Prompt */}
        <div className="mb-8">
          <PWAInstallPrompt
            isInstallable={isInstallable}
            isInstalled={isInstalled}
            onInstall={installApp}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <PWAStatus />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <NotificationControl />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              Install as App
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Install this PWA on your device for quick access and offline support.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              Push Notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Enable notifications to receive test messages. Works even when the app is closed.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              Offline Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              The service worker caches content for offline access. Works without internet.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>PWA Notification Test App • Built with React + TypeScript</p>
        </div>
      </footer>
    </div>
  );
}

