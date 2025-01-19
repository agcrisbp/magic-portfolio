import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const apiKey = process.env.UPTIME_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ message: 'API key is missing' });
        }

        const response = await fetch('https://api.uptimerobot.com/v2/getPSPs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: apiKey,
                format: 'json',
            }),
        });

        const data = await response.json();

        if (data.stat === 'ok' && data.psps.length > 0) {
            const psp = data.psps[0];
            return res.status(200).json({ name: psp.friendly_name, status: psp.status });
        } else {
            return res.status(200).json({ name: 'No Status Available', status: null });
        }
    } catch (error) {
        console.error('Error fetching status:', error);
        return res.status(500).json({ message: 'Error fetching status' });
    }
}