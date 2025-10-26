import { Download, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PWAInstallPromptProps {
  isInstallable: boolean;
  isInstalled: boolean;
  onInstall: () => void;
}

export function PWAInstallPrompt({
  isInstallable,
  isInstalled,
  onInstall
}: PWAInstallPromptProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!isInstallable || isInstalled || dismissed) {
    return null;
  }

  return (
    <Card className="p-4 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Download className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Install PWA App
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
              Install this app on your device for quick access and offline support.
            </p>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          onClick={onInstall}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Install Now
        </Button>
        <Button
          onClick={() => setDismissed(true)}
          variant="outline"
          className="border-blue-200 dark:border-blue-800"
        >
          Later
        </Button>
      </div>
    </Card>
  );
}

