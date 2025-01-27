'use client';

import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { Flex, Text, Icon } from '.';
import styles from './Tag.module.scss';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'brand' | 'accent' | 'warning' | 'success' | 'danger' | 'neutral' | 'info' | 'gradient';
    size?: 's' | 'm' | 'l';
    label?: string;
    prefixIcon?: string;
    suffixIcon?: string;
    children?: ReactNode;
}

const getIconLabel = (variant: string) => {
    if (variant === 'penting') return 'PENTING';
    if (variant === 'informasi') return 'INFORMASI';
    if (variant === 'peringatan') return 'PERINGATAN';
    return '';
};

const Tag = forwardRef<HTMLDivElement, TagProps>(({
    variant = 'neutral',
    size = 'm',
    label = '',
    prefixIcon,
    suffixIcon,
    className,
    children,
    ...props
}, ref) => {
    const paddingSize = size === 's' ? '2' : '4';

    return (
        <Flex
            radius="l"
            gap="4"
            ref={ref}
            className={classNames(styles.tag, styles[variant], styles[size], className)}
            {...props}
        >
            {['peringatan', 'informasi', 'penting'].includes(variant) && prefixIcon && (
                <div className={classNames(styles.topLeftIcon, styles[variant])}>
                    <Icon name={prefixIcon} />
                    <Text as="span" className={styles.iconLabel}>
                        {getIconLabel(variant)}
                    </Text>
                </div>
            )}
            {prefixIcon && !['peringatan', 'informasi', 'penting'].includes(variant) && (
                <Flex className={classNames(styles.iconWrapper, styles[size])}>
                    <Icon name={prefixIcon} />
                </Flex>
            )}
            <Flex
                style={{ userSelect: 'none' }}
                paddingX={paddingSize}
            >
                <Text
                    as="span"
                    variant="label-default-s"
                >
                    {label || children}
                </Text>
            </Flex>
            {suffixIcon && (
                <Flex className={classNames(styles.iconWrapper, styles[size])}>
                    <Icon name={suffixIcon} />
                </Flex>
            )}
        </Flex>
    );
});

Tag.displayName = 'Tag';

export { Tag };
export type { TagProps };