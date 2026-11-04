"use client";{{=<% %>=}}

import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

export const AVATAR_SIZES = {
  xs: 24,
  s: 32,
  m: 40,
  l: 48,
} as const;

export type AvatarSize = keyof typeof AVATAR_SIZES;

export interface AvatarProps extends React.ComponentProps<"div"> {
  /** User image URL. If missing, shows initial from name. */
  imageUrl?: string | null;
  /** Display name, used for fallback initial (first letter). */
  name?: string;
  /** Size from design scale. Default: s (32px, header). */
  size?: AvatarSize;
}

const Avatar = ({
  imageUrl,
  name = "",
  size = "s",
  className,
  ...props
}: AvatarProps) => {
  const pixelSize = AVATAR_SIZES[size];
  const initial = name.trim() ? name.trim().charAt(0).toUpperCase() : "?";

  return (
    <div
      role="img"
      aria-label={name || "Avatar"}
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground",
        className,
      )}
      style={{ width: pixelSize, height: pixelSize }}
      data-slot="avatar"
      data-size={size}
      {...props}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote avatar URL with unknown intrinsic dimensions; container forces square aspect via parent style
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-medium" style={{ fontSize: pixelSize * 0.5 }}>
          {initial}
        </span>
      )}
    </div>
  );
};

export { Avatar };
