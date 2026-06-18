"use client";

import { track } from "@vercel/analytics";

type AnalyticsProperties = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: AnalyticsProperties,
    ) => void;
  }
}

export function trackInteraction(
  eventName: string,
  properties: AnalyticsProperties = {},
) {
  track(eventName, properties);

  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, properties);
}
