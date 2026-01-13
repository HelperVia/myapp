/**
 * ┌─────────────────────────────────────────────────────────┐
 * │  AVATAR COMPONENT WITH FORWARDREF                       │
 * │  (Updated to work with Tooltip)                         │
 * └─────────────────────────────────────────────────────────┘
 */

import { getColorFromUuid, extractInitials } from "@lib/helper.func";
import { ChangeEvent, forwardRef } from "react";

type AvatarSize = "sm" | "md" | "lg";
type AvatarStatus = "online" | "offline";
type AvatarVariant = "circle" | "square";
export interface AvatarProps {
  name?: string;
  imageUrl?: string;
  status?: AvatarStatus;
  size?: AvatarSize;
  editable?: boolean;
  variant?: AvatarVariant;
  bgColor?: string;
  uuid?: string;
  onImageChange?: (file: File) => void;
}

interface SizeConfig {
  container: number;
  fontSize: number;
  statusSize: number;
  editSize: number;
  editIcon: number;
}

const sizeConfig: Record<AvatarSize, SizeConfig> = {
  sm: {
    container: 48,
    fontSize: 14,
    statusSize: 12,
    editSize: 20,
    editIcon: 10,
  },
  md: {
    container: 64,
    fontSize: 20,
    statusSize: 14,
    editSize: 24,
    editIcon: 12,
  },
  lg: {
    container: 80,
    fontSize: 24,
    statusSize: 18,
    editSize: 28,
    editIcon: 14,
  },
};

// ✅ Using forwardRef to support Tooltip
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      name,
      imageUrl,
      status,
      size = "sm",
      editable = false,
      bgColor = "#374151",
      uuid,
      variant = "circle",
      onImageChange,
    },
    ref
  ) => {
    const config = sizeConfig[size];

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onImageChange) {
        onImageChange(file);
      }
    };

    const borderRadius = variant == "circle" ? "50%" : "10%";

    const bgHex = uuid ? getColorFromUuid(uuid) : bgColor;

    return (
      <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
        <div
          style={{
            width: config.container,
            height: config.container,
            borderRadius: borderRadius,
            backgroundColor: bgHex,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 600,
            fontSize: config.fontSize,
            overflow: "hidden",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            extractInitials(name)
          )}
        </div>

        {status && (
          <span
            style={{
              position: "absolute",
              top: variant == "circle" ? 0 : "-2px",
              right: variant == "circle" ? 0 : "-2px",
              width: config.statusSize,
              height: config.statusSize,
              borderRadius: "50%",
              backgroundColor: status === "online" ? "#22c55e" : "#9ca3af",
              border: "2px solid white",
              boxSizing: "border-box",
            }}
          />
        )}

        {editable && (
          <label
            style={{
              position: "absolute",
              bottom: variant == "circle" ? 0 : "-2px",
              right: variant == "circle" ? 0 : "-2px",
              width: config.editSize,
              height: config.editSize,
              borderRadius: "50%",
              backgroundColor: "white",
              border: "2px solid white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg
              style={{ width: config.editIcon, height: config.editIcon }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6b7280"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    );
  }
);

// Display name for debugging
Avatar.displayName = "Avatar";

export default Avatar;
