# PWA Notification App

This is a Progressive Web App (PWA) for testing push notifications and other PWA features.

## Development

To run the application in development mode, follow these steps:

1.  Install the dependencies:

    ```bash
    pnpm install
    ```

2.  Run the development server:

    ```bash
    pnpm dev
    ```

This will start the application at `http://localhost:3000`.

## Production

To build the application for production, follow these steps:

1.  Install the dependencies:

    ```bash
    pnpm install
    ```

2.  Build the application:

    ```bash
    pnpm build
    ```

This will create a `dist` folder with the production-ready assets.

To run the application in production, you can use a static file server to serve the `dist/public` directory.

## Vercel Deployment

To deploy the application to Vercel, follow these steps:

1.  Push your code to a Git repository (e.g., GitHub, GitLab, Bitbucket).

2.  Create a new project on Vercel and connect it to your Git repository.

3.  Vercel will automatically detect the `vercel.json` file and deploy your application.
