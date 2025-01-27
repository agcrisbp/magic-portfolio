"use client";

import React, { forwardRef, useState, useEffect, ReactNode } from "react";
import { ElementType } from "./ElementType";
import { Flex, Icon, Tooltip } from ".";
import buttonStyles from "./Button.module.scss";
import iconStyles from "./IconButton.module.scss";
import classNames from "classnames";

interface CommonProps {
  icon?: string;
  id?: string;
  size?: "xs" | "s" | "m" | "l";
  radius?:
    | "none"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left";
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "ghost";
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  children?: ReactNode;
  copy?: boolean;
}

export type IconButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps | AnchorProps>(
  (
    {
      icon = "refresh",
      size = "m",
      id,
      radius,
      tooltip,
      tooltipPosition = "top",
      variant = "primary",
      href,
      children,
      copy = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isHover) {
        timer = setTimeout(() => {
          setTooltipVisible(true);
        }, 400);
      } else {
        setTooltipVisible(false);
      }

      return () => clearTimeout(timer);
    }, [isHover]);

    const handleCopy = async (e: React.MouseEvent) => {
      if (href && copy) {
        try {
          await navigator.clipboard.writeText(href);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy text: ", err);
        }
        e.preventDefault();
      }
    };

    const content = (
      <>
        {children ? children : <Icon name={icon} size="s" />}
        {tooltip && isTooltipVisible && (
          <Flex position="absolute" zIndex={1} className={iconStyles[tooltipPosition]}>
            <Tooltip label={isCopied ? "Disalin" : tooltip} />
          </Flex>
        )}
      </>
    );

    const radiusSize = size === "s" || size === "m" ? "m" : "l";

    if (copy) {
      return (
        <a
          onClick={(e) => handleCopy(e)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          className={classNames(
            buttonStyles.button,
            buttonStyles[variant],
            iconStyles[size],
            className,
            radius === "none"
              ? "radius-none"
              : radius
              ? `radius-${radiusSize}-${radius}`
              : `radius-${radiusSize}`,
            "text-decoration-none",
            "button",
            "cursor-interactive",
          )}
          style={style}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          aria-label={tooltip || icon}
        >
          {content}
        </a>
      );
    }

    return (
      <ElementType
        id={id}
        href={href}
        ref={ref}
        className={classNames(
          buttonStyles.button,
          buttonStyles[variant],
          iconStyles[size],
          className,
          radius === "none"
            ? "radius-none"
            : radius
            ? `radius-${radiusSize}-${radius}`
            : `radius-${radiusSize}`,
          "text-decoration-none",
          "button",
          "cursor-interactive",
          className,
        )}
        style={style}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        aria-label={tooltip || icon}
        {...props}
      >
        <Flex fill center>
          {content}
        </Flex>
      </ElementType>
    );
  },
);

IconButton.displayName = "IconButton";
export { IconButton };