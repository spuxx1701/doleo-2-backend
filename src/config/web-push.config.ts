import { setVapidDetails } from 'web-push';

export function buildWebPushConfig() {
  setVapidDetails(
    process.env.APP_CLIENT_URL,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
  );
}
