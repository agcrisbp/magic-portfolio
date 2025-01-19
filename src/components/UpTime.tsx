'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Text } from "@/once-ui/components";

const Uptime = () => {
    const [statusName, setStatusName] = useState<string | null>(null);
    const [statusText, setStatusText] = useState<string | null>(null);
    const [statusColor, setStatusColor] = useState<string>("");

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch('/api/uptime'); // Call the Next.js API route
                const data = await response.json();
                
                // Log the response to check if the status is being fetched correctly
                console.log('API Response:', data);

                // Make sure we handle the status correctly
                if (data.status === 1) {
                    setStatusName(data.name);
                    setStatusText('Operational');
                    setStatusColor('green-400');
                } else if (data.status === 0) {
                    setStatusName(data.name);
                    setStatusText('Paused');
                    setStatusColor('yellow');
                } else if (data.status === 2) {
                    setStatusName(data.name);
                    setStatusText('Down');
                    setStatusColor('red');
                } else if (data.status === 8) {
                    setStatusName(data.name);
                    setStatusText('Unknown');
                    setStatusColor('gray');
                } else {
                    setStatusName('Unknown');
                    setStatusText('Unknown');
                    setStatusColor('gray');
                }
            } catch (error) {
                console.error("Error fetching status from API route:", error);
                setStatusText('Error fetching status');
                setStatusColor('gray');
            }
        };

        fetchStatus();
    }, []);

    return (
        <Link href="/status">
          <Text variant="body-default-s" style={{ color: statusColor }}>
                {statusText}
          </Text>
        </Link>
    );
};

export default Uptime;