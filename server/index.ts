import express, { Request, Response } from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import webpush from 'web-push';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// VAPID keys
const vapidKeys = {
  publicKey:
    'BElFVjDMeBiP69hZLqeLBQnlALEh_euEXLsWJKsQXcgTmOkY4XQ63xnfsvLbdbTQhQjs3LenRlTSMQCdQuelyTE',
  privateKey: 'DZJ81PqlRxYQiaBqDjCpmukw8S-TYys6XKOMDj71wLM'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Store subscriptions in memory
let subscriptions: webpush.PushSubscription[] = [];

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, 'public')
      : path.resolve(__dirname, '..', 'dist', 'public');

  app.use(express.static(staticPath));

  // Subscribe route
  app.post('/subscribe', (req: Request, res: Response) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
  });

  // Unsubscribe route
  app.post('/unsubscribe', (req: Request, res: Response) => {
    const subscription = req.body;
    subscriptions = subscriptions.filter(
      (s) => s.endpoint !== subscription.endpoint
    );
    res.status(200).json({});
  });

  // Send notification route
  app.post('/send-notification', (req: Request, res: Response) => {
    const notificationPayload = {
      title: req.body.title || 'Test Notification',
      body: req.body.body || 'This is a test notification',
      icon: '/icon-192.png'
    };

    Promise.all(
      subscriptions.map((subscription) =>
        webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        )
      )
    )
      .then(() =>
        res.status(200).json({ message: 'Notifications sent successfully.' })
      )
      .catch((err) => {
        console.error('Error sending notification, error: ', err);
        res.sendStatus(500);
      });
  });

  // Handle client-side routing - serve index.html for all routes
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
