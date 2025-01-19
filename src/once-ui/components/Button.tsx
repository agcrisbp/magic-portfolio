'use client';

import React, { ReactNode, forwardRef, useState } from 'react';
import Link from 'next/link';

import { Spinner, Icon } from '.';
import styles from './Button.module.scss';

interface CommonProps {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
    size?: 's' | 'm' | 'l';
    label?: string;
    prefixIcon?: string;
    suffixIcon?: string;
    loading?: boolean;
    fillWidth?: boolean;
    children?: ReactNode;
    href?: string;
    className?: string;
    style?: React.CSSProperties;
    copy?: boolean;
}

export type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

const Button = forwardRef<HTMLButtonElement, ButtonProps | AnchorProps>(({
    variant = 'primary',
    size = 'm',
    label,
    children,
    prefixIcon,
    suffixIcon,
    loading = false,
    fillWidth = false,
    href,
    className,
    style,
    copy = false,
    ...props
}, ref) => {
    const [isCopied, setIsCopied] = useState(false);
    const labelSize = size === 'l' ? 'font-l' : size === 'm' ? 'font-m' : 'font-s';
    const iconSize = size === 'l' ? 'm' : size === 'm' ? 's' : 'xs';

    const content = (
        <>
            {prefixIcon && !loading && (
                <Icon name={isCopied && copy ? "check" : prefixIcon} size={iconSize} />
            )}
            {loading && <Spinner size={size} />}
            <div className={`font-label font-strong ${styles.label} ${labelSize}`}>
                {isCopied && copy ? 'Disalin' : label || children}
            </div>
            {suffixIcon && (
                <Icon name={isCopied && copy ? "check" : suffixIcon} size={iconSize} />
            )}
        </>
    );

    const commonProps = {
        className: `${styles.button} ${styles[variant]} ${styles[size]} ${fillWidth ? styles.fillWidth : styles.fitContent} ${className || ''}`,
        style: { ...style, textDecoration: 'none' },
    };

    const handleCopy = async (e: React.MouseEvent) => {
        if (href && copy) {
            try {
                await navigator.clipboard.writeText(href);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
            e.preventDefault();
        }
    };

    if (href) {
        const isExternal = isExternalLink(href);

        if (copy) {
            return (
                <button
                    onClick={handleCopy}
                    ref={ref as React.Ref<HTMLButtonElement>}
                    {...commonProps}
                    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
                    {content}
                </button>
            );
        }

        if (isExternal) {
            return (
                <a
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    target="_blank"
                    rel="noreferrer"
                    {...commonProps}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {content}
                </a>
            );
        }

        return (
            <Link
                href={href}
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...commonProps}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {content}
            </Link>
        );
    }

    return (
        <button
            ref={ref as React.Ref<HTMLButtonElement>}
            {...commonProps}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {content}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };