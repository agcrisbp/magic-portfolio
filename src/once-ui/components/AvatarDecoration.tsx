'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { Skeleton, Icon, Text, Flex, SmartImage, StatusIndicator } from '.';
import { UserID } from '@/app/resources/config';
import styles from './AvatarDecoration.module.scss';

interface AvatarDecorationProps {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    value?: string;
    src?: string;
    loading?: boolean;
    empty?: boolean;
    avatarDecorationData?: {
        asset: string;
    };
    style?: React.CSSProperties;
    className?: string;
}

const sizeMapping: Record<'xs' | 's' | 'm' | 'l' | 'xl', number> = {
    xs: 20,
    s: 24,
    m: 32,
    l: 48,
    xl: 160,
};

const AvatarDecoration: React.FC<AvatarDecorationProps> = forwardRef<HTMLDivElement, AvatarDecorationProps>(({
    size = 'm',
    value,
    src,
    loading,
    empty,
    avatarDecorationData,
    style,
    className
}, ref) => {
    const [lanyardData, setLanyardData] = useState<any>(null);
    const [lanyardLoading, setLanyardLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${UserID}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                setLanyardData(data);
                setLanyardLoading(false);
            } catch (err) {
                setError("Failed to load data");
                setLanyardLoading(false);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (lanyardLoading) return null;
    if (error) return <div>{error}</div>;

    const { data } = lanyardData || {};

    const isEmpty = empty || (!src && !value);

    if (loading || lanyardLoading) {
        return (
            <Skeleton
                style={{ border: '1px solid var(--neutral-border-medium)' }}
                shape="circle"
                width={size}
                height={size}
                className={`${styles.avatar} ${className}`}
                aria-busy="true"
                aria-label="Loading avatar"
            />
        );
    }

    const renderContent = () => {
        if (isEmpty) {
            return (
                <Icon
                    onBackground="neutral-medium"
                    name="person"
                    size={size as 'xs' | 's' | 'm' | 'l' | 'xl'}
                    className={styles.icon}
                    aria-label="Empty avatar"
                />
            );
        }

        if (src) {
            return (
                <>
                    <SmartImage
                        radius="full"
                        src={src}
                        fill
                        alt="Avatar"
                        sizes={`${sizeMapping[size]}px`}
                        className={styles.image}
                    />
                </>
            );
        }

        if (value) {
            return (
                <Text
                    as="span"
                    onBackground="neutral-weak"
                    variant={`body-default-${size}`}
                    className={styles.value}
                    aria-label={`Avatar with initials ${value}`}
                >
                    {value}
                </Text>
            );
        }

        return null;
    };

    return (
        <Flex
            ref={ref}
            role="img"
            position="relative"
            horizontal="center"
            vertical="center"
            radius="full"
            border="neutral-strong"
            borderStyle="solid"
            background="surface"
            style={style}
            className={`${styles.avatarWrapper} ${className || ''}`}
        >
            <div className={styles.avatar}>
                {renderContent()}
            </div>
            {data?.discord_user?.avatar_decoration_data?.asset && (
                <a href="/discord">
                    <img
                        src={`https://cdn.discordapp.com/avatar-decoration-presets/${data.discord_user.avatar_decoration_data.asset}.png?size=100&passthrough=true`}
                        alt="Avatar Decoration"
                        className={styles.avatarDecoration}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </a>
            )}
            {data?.discord_user?.id && (
                <StatusIndicator
                    size="l"
                    userId={UserID}
                    className={styles.indicator}
                />
            )}
        </Flex>
    );
});

AvatarDecoration.displayName = 'AvatarDecoration';

export { AvatarDecoration };
export type { AvatarDecorationProps };