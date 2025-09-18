import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

if (key) {
  posthog.init(key, {
    api_host: host,
    defaults: '2025-05-24',
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
} else if (process.env.NODE_ENV === 'development') {
  console.warn('[analytics] NEXT_PUBLIC_POSTHOG_KEY not set — analytics disabled');
}
