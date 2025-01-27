'use client';

import { useState } from 'react';
import { Column, Flex, Row, SmartLink, SmartImage, Text } from '@/once-ui/components';
import styles from './TrackList.module.scss';

interface TrackListProps {
  tracks?: SpotifyApi.TrackObjectFull[];
  topArtists?: SpotifyApi.ArtistObjectFull[];
  playlists?: { name: string; image: string; href: string }[];
  artist?: boolean;
  priority?: boolean;
  period?: 'short' | 'medium' | 'long';
}

export function TrackList({
  tracks,
  topArtists,
  playlists,
  artist = false,
  priority = false,
  period,
}: TrackListProps) {
  const items = playlists || (artist && topArtists ? topArtists : tracks || []);

  // Determine the label based on the `period` or type of items
  const renderLabel = () => {
    if (playlists) return 'Playlist';
    if (artist) return 'Artis Favorit';
    if (tracks) {
      if (period === 'short') return 'Bulan Ini';
      if (period === 'medium') return '6 Bulan Terakhir';
      if (period === 'long') return 'Sepanjang Masa';
    }
    return '';
  };

  return (
    <Column background="surface" marginBottom="16" className={styles['tracklist-container']} align="start" horizontal="start">
      {/* Display the label once per container */}
      <Text variant="body-default-xs" onBackground="neutral-weak" marginLeft="4">
        {renderLabel()}
      </Text>

      <Row
        className={styles['tracklist-scroll']}
        direction="row"
        gap="4"
        marginTop="4"
        style={{ overflowX: 'auto', paddingLeft: '2rem', scrollSnapType: 'x mandatory' }}
      >
        {items.map((item, index) =>
          item ? (
            <Track key={index} artist={artist} data={item} priority={priority} />
          ) : (
            <Flex key={index} className={styles['track-placeholder']}>
              <div className={styles['placeholder-bg']} />
            </Flex>
          )
        )}
      </Row>
    </Column>
  );
}

interface TrackProps {
  artist: boolean;
  data: SpotifyApi.TrackObjectFull | SpotifyApi.ArtistObjectFull | { name: string; image: string; href: string };
  priority?: boolean;
}

function Track({ artist, data, priority }: TrackProps) {
  const [hovered, setHovered] = useState(false);

  const renderPlaylist = (playlistData: { name: string; image: string; href: string }) => (
    <SmartLink href={playlistData.href} className={styles['track-item']}>
      <Column className={styles['track-image-container']}>
        <SmartImage src={playlistData.image} alt={playlistData.name} priority={priority} className={styles['track-image']} />
        <Column className={styles['track-info']} horizontal="start">
          <Text marginLeft="4" onBackground="brand-medium">{playlistData.name}</Text>
        </Column>
      </Column>
    </SmartLink>
  );

  const renderArtist = (artistData: SpotifyApi.ArtistObjectFull) => {
    const { name, external_urls, images } = artistData;
    return (
      <SmartLink href={external_urls.spotify} className={styles['track-item']}>
        <Column className={styles['track-image-container']}>
          <SmartImage src={images[0]?.url} alt={name} priority={priority} className={styles['track-image']} />
          <Column className={styles['track-info']} horizontal="start">
            <Text marginLeft="4" onBackground="brand-medium">{name}</Text>
          </Column>
        </Column>
      </SmartLink>
    );
  };

  const renderTrack = (trackData: SpotifyApi.TrackObjectFull) => {
    const { name, external_urls, album, artists } = trackData;
    const artistNames = artists.map(artist => artist.name).join(', ');

    return (
      <SmartLink
        href={external_urls.spotify}
        className={styles['track-item']}
        aria-label={hovered ? `${name} oleh ${artistNames}` : 'Dengarkan di Spotify'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Column className={styles['track-image-container']}>
          <SmartImage src={album.images[0].url} alt={name} priority={priority} className={styles['track-image']} />
          <Column className={styles['track-info']} horizontal="start">
            <Text marginLeft="4" onBackground="brand-medium">{name}</Text>
            <Text marginLeft="4" onBackground="brand-weak">{artistNames}</Text>
          </Column>
        </Column>
      </SmartLink>
    );
  };

  if ('href' in data && 'image' in data) {
    return renderPlaylist(data as { name: string; image: string; href: string });
  }

  return artist ? renderArtist(data as SpotifyApi.ArtistObjectFull) : renderTrack(data as SpotifyApi.TrackObjectFull);
}