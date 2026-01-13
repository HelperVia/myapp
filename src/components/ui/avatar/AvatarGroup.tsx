/**
 * ┌─────────────────────────────────────────────────────────┐
 * │  ██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗       │
 * │  ██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗      │
 * │  ███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝      │
 * │  ██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗      │
 * │  ██║  ██║███████╗███████╗██║     ███████╗██║  ██║      │
 * │  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝      │
 * │                     VIA                                  │
 * ├─────────────────────────────────────────────────────────┤
 * │  Developer: Yaşar Demirtaş                              │
 * │  Email: ydemirtas1745@gmail.com                         │
 * │  Component: AvatarGroup                                 │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { ReactElement } from "react";
import { AvatarProps } from "./Avatar";

type AvatarSize = "sm" | "md" | "lg";

export interface AvatarGroupProps {
  children: ReactElement<AvatarProps> | ReactElement<AvatarProps>[];
  max?: number;
  spacing?: "tight" | "normal" | "loose";
  borderColor?: string;
  onClick?: () => void;
}

interface SpacingConfig {
  overlap: number;
  border: number;
}

const spacingConfig: Record<string, SpacingConfig> = {
  "sm-tight": { overlap: -12, border: 2 },
  "sm-normal": { overlap: -8, border: 2 },
  "sm-loose": { overlap: -4, border: 2 },
  "md-tight": { overlap: -16, border: 2 },
  "md-normal": { overlap: -12, border: 2 },
  "md-loose": { overlap: -8, border: 2 },
  "lg-tight": { overlap: -20, border: 3 },
  "lg-normal": { overlap: -16, border: 3 },
  "lg-loose": { overlap: -12, border: 3 },
};

const sizeMap = {
  sm: 48,
  md: 64,
  lg: 80,
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 3,
  spacing = "normal",
  borderColor = "#ffffff",
  onClick,
}) => {
  // Convert children to array
  const childrenArray = React.Children.toArray(
    children
  ) as ReactElement<AvatarProps>[];

  // Get size from first child (or default to 'sm')
  const firstChild = childrenArray[0];
  const size: AvatarSize = firstChild?.props?.size || "sm";

  const configKey = `${size}-${spacing}`;
  const config = spacingConfig[configKey];
  const avatarSize = sizeMap[size];

  // Split children into visible and extra
  const visibleChildren = childrenArray.slice(0, max);
  const extraCount = childrenArray.length - max;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            marginLeft: index === 0 ? 0 : config.overlap,
            zIndex: visibleChildren.length - index,
            transition: "all 0.2s ease",
          }}
          className="avatar-group-item"
        >
          <div
            style={{
              borderRadius: "50%",
              border: `${config.border}px solid ${borderColor}`,
              boxSizing: "content-box",
              display: "inline-block",
            }}
          >
            {child}
          </div>
        </div>
      ))}

      {extraCount > 0 && (
        <div
          style={{
            position: "relative",
            marginLeft: config.overlap,
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: "50%",
              backgroundColor: "#f3f4f6",
              border: `${config.border}px solid ${borderColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              fontWeight: 600,
              fontSize: size === "sm" ? 14 : size === "md" ? 18 : 22,
              boxSizing: "border-box",
            }}
          >
            +{extraCount}
          </div>
        </div>
      )}

      <style>{`
        .avatar-group-item:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default AvatarGroup;
