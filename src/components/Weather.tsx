'use client';

import { useEffect, useState } from 'react';
import { Icon, Flex, Text } from "@/once-ui/components"

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
  Clear: 'sun',
  Clouds: 'clouds',
  Rain: 'rain',
  Drizzle: 'drizzle',
  Thunderstorm: 'thunderstorm',
  Snow: 'snow',
  Mist: 'mist',
  Smoke: 'smoke',
  Haze: 'haze',
  Dust: 'dust',
  Fog: 'fog',
  Sand: 'sand',
  Ash: 'ash',
  Squall: 'squall',
  Tornado: 'tornado',
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
  const weatherIcon = icons[weatherMain] || 'rain';

  return (
    <Flex gap="4" fillWidth justifyContent="center" alignItems="center" direction="row">
      <Icon name={weatherIcon} size="xs" />
      <Text variant="body-default-s" align="center">
        {tempCelsius.toFixed(0)}°C {names[weatherMain] ?? weatherMain}
      </Text>
    </Flex>
  );
}