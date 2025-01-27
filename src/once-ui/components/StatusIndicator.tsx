'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '.';
import styles from './StatusIndicator.module.scss';

interface StatusIndicatorProps {
    size: 's' | 'm' | 'l';
    color?: string;
    userId?: string;
    className?: string;
    style?: React.CSSProperties;
    ariaLabel?: string;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(({
    size,
    color,
    userId,
    className,
    style,
    ariaLabel
}, ref) => {
    const [status, setStatus] = useState<'green' | 'yellow' | 'red' | 'gray'>('gray');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [hovered, setHovered] = useState<boolean>(false);

    useEffect(() => {
        const fetchLanyardStatus = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
                const data = await response.json();
                if (data.data) {
                    setData(data.data);
                    const discordStatus = data.data.discord_status;
                    setStatus(
                        discordStatus === 'online'
                            ? 'green'
                            : discordStatus === 'idle'
                            ? 'yellow'
                            : discordStatus === 'dnd'
                            ? 'red'
                            : 'gray'
                    );
                } else {
                    setStatus('gray');
                }
            } catch (error) {
                console.error('Error fetching Lanyard status:', error);
                setStatus('gray');
            } finally {
                setLoading(false);
            }
        };

        fetchLanyardStatus();

        const interval = setInterval(fetchLanyardStatus, 5000);
        return () => clearInterval(interval);
    }, [userId]);

    if (loading || !data) {
        return <div></div>;
    }

    return (
        <div
            ref={ref}
            style={style}
            className={classNames(styles.statusIndicator, styles[size], styles[status], className)}
            aria-label={ariaLabel}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.indicatorCircle}>
                <Icon name="discord" onBackground="neutral-medium" size="xs" className={styles.indicatorCircle} />
            </div>
            {hovered && (
                <div className={classNames(styles.popUp, 'custom-tooltip')}>
                    {capitalize(data.discord_status)} on{' '}
                    {data.active_on_discord_mobile ? 'Mobile' : 'Desktop'}
                </div>
            )}
        </div>
    );
});

StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator };