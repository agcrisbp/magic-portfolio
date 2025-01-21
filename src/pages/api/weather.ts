import { NextApiRequest, NextApiResponse } from 'next';
import { longLat } from '@/app/resources/config';

type WeatherResponse = {
  main: {
    temp: number;
  };
  weather: Array<{ description: string }>;
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${longLat}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: WeatherResponse = await response.json();

    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}