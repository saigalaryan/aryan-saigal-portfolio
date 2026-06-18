"use client";

import * as React from "react";

import { trackInteraction } from "@/lib/analytics";

type TrackedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventProperties?: Record<string, string | number | boolean | null>;
};

export function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackInteraction(eventName, {
          href: typeof props.href === "string" ? props.href : null,
          ...eventProperties,
        });
        onClick?.(event);
      }}
    />
  );
}
