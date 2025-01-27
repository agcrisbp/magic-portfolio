'use client';

import { useEffect, useState } from 'react';
import { Flex, Icon, Row, Text } from "@/once-ui/components";
import { person } from "@/app/resources/content";

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
    if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
      setLoading(false);
      return;
    }

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

  if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
    return <> <Flex hide="s">{person.location}</Flex> </>;
  }

  if (loading) {
    return null;
  }

  if (!data) {
    return null;
  }

  if (onlyCity) {
    return (
      <Text variant="body-default-s">
        {data.name}
      </Text>
    );
  }

  const tempCelsius = ((data.main.temp - 32) * 5) / 9;
  const weatherMain = data.weather[0]?.main || '';
  const weatherIcon = icons[weatherMain] || 'resfresh';

  return (
    <Row gap="4" fillWidth horizontal="center" vertical="center">
      <Icon onBackground="neutral-weak" name={weatherIcon} size="xs" />
      <Text onBackground="neutral-weak" variant="body-default-s" align="center">
        {tempCelsius.toFixed(0)}°C <Flex hide="s" style={{ display: 'inline' }}>  {names[weatherMain] ?? weatherMain}</Flex>
      </Text>
    </Row>
  );
}