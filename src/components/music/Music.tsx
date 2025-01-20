"use client";

import { Flex, Heading, Tag, Text } from '@/once-ui/components';
import { useEffect, useState } from "react";
import type { TopMusicResponseSuccess } from "@/pages/api/topMusic";
import { TrackList } from "@/components";
import Masonry from 'react-masonry-css';
import { SmartImage } from "@/once-ui/components";
import musStyles from "@/components/gallery/Gallery.module.scss";
import { renderContent } from '@/app/resources';

type PlaylistsInfo = {
  name: string;
  image: string;
  href: string;
  bg?: string;
};

export default function MusicPage() {
  const [topMusic, setTopMusic] = useState<TopMusicResponseSuccess | null>(null);
  const { music } = renderContent();
  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(`/api/topMusic`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setTopMusic(data);
          }
        })
        .catch(console.error);
    };
    fetchData();
  
    const interval = setInterval(fetchData, 60000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex fillWidth flex={1} direction="column">
      <Heading marginBottom="s" variant="display-strong-s">
        Musik
      </Heading>
      <Text variant="body-default-xs" onBackground="neutral-weak">
        Lagu dan playlist yang sering saya dengarkan di <a className="text-green-400" target="_blank" href="/spotify">Spotify</a>.
      </Text>
      
      {topMusic && (
        <Flex marginTop="16">
        <Tag variant="success">
          Total lagu yang didengarkan: {topMusic.lastFMPlayCount}.
        </Tag>
        </Flex>
      )}
      
      <Flex
        as="div"
        style={{
          borderBottom: '1px solid',
          margin: '16px 0',
        }}
      />
      
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={musStyles.masonryGrid}
        columnClassName={musStyles.masonryGridColumn}>
        {music.images.map((image, index) => (
          <SmartImage
            key={index}
            enlarge
            radius="m"
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "9 / 16"}
            src={image.src}
            alt={image.alt}
            className={musStyles.gridItem}
          />
        ))}
      </Masonry>
      
      {/* Pass the playlists fetched from API */}
      <Text variant="body-default-xs" onBackground="neutral-weak" paddingTop="16" paddingBottom="16">
        <TrackList playlists={topMusic?.playlists} />
      </Text>
      
      <Text variant="body-default-xs" onBackground="neutral-weak" paddingBottom="16">
        <TrackList tracks={topMusic?.short.items} period="short" priority={true} />
      </Text>
      
      <Text variant="body-default-xs" onBackground="neutral-weak" paddingBottom="16">
        <TrackList tracks={topMusic?.medium.items} period="medium" />
      </Text>
      
      <Text variant="body-default-xs" onBackground="neutral-weak" paddingBottom="16">
        <TrackList tracks={topMusic?.long.items} period="long" />
      </Text>
      
      <Text variant="body-default-xs" onBackground="neutral-weak" paddingBottom="16">
        <TrackList
          topArtists={topMusic?.topArtists}
          artist={true}
          priority={true}
        />
      </Text>
    </Flex>
  );
}