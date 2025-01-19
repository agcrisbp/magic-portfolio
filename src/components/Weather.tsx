'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Flex, Text } from "@/once-ui/components"

type WeatherResponse = {
  main: {
    temp: number;
  };
  weather: Array<{ main: string; description: string }>;
  name: string;
};

const names: Record<string, string> = {
  Clear: 'Cerah',
  Clouds: 'Berawan',
  Rain: 'Hujan',
  Drizzle: 'Gerimis',
  Thunderstorm: 'Petir',
  Snow: 'Bersalju',
  Mist: 'Kabut Tipis',
  Smoke: 'Berasap',
  Haze: 'Kabut Asap',
  Dust: 'Debu',
  Fog: 'Kabut Tebal',
  Sand: 'Pasir',
  Ash: 'Abu Vulkanik',
  Squall: 'Angin Kencang',
  Tornado: 'Puting Beliung',
};

const icons: Record<string, string> = {
  Clear: 'typcn:weather-sunny',
  Clouds: 'typcn:weather-partly-sunny',
  Rain: 'ion:rainy',
  Drizzle: 'mdi:weather-rainy-light',
  Thunderstorm: 'mdi:weather-lightning',
  Snow: 'mdi:weather-snowy',
  Mist: 'mdi:weather-fog',
  Smoke: 'mdi:weather-smoke',
  Haze: 'mdi:weather-hazy',
  Dust: 'mdi:weather-dust',
  Fog: 'mdi:weather-fog',
  Sand: 'mdi:weather-sandstorm',
  Ash: 'mdi:weather-dust',
  Squall: 'mdi:weather-windy',
  Tornado: 'mdi:weather-tornado',
};

export function Weather({ onlyCity = false }: { onlyCity?: boolean }): JSX.Element | null {
  const [data, setData] = useState<WeatherResponse | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/weather')
      .then((res) => res.json())
      .then((res: WeatherResponse) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching weather data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  if (!data) {
    return <p>Data cuaca tidak tersedia.</p>;
  }

  if (onlyCity) {
    return (
      <Text variant="body-default-s">
        {data.name}
      </Text>
    );
  }

  // Default behavior for showing full weather
  const tempCelsius = ((data.main.temp - 32) * 5) / 9;
  const weatherMain = data.weather[0]?.main || '';
  const weatherIcon = icons[weatherMain] || 'mdi:weather-partly-cloudy';

  return (
    <Flex alignItems="center" justifyContent="center">
      <Text variant="body-default-s" align="center">
        <Icon icon={weatherIcon} className="w-5 h-5" />
        {' '}
        <span>
          {tempCelsius.toFixed(0)}°C{' '}
          {names[weatherMain] ?? weatherMain}
        </span>
      </Text>
    </Flex>
  );
}