'use client';

import { useState } from 'react';
import { Flex, SmartImage, Text } from '@/once-ui/components';
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
    <Flex className={styles['tracklist-container']} direction="column" align="start" justifyContent="flex-start">
      {/* Display the label once per container */}
      <Text variant="body-default-xs" onBackground="neutral-weak" paddingBottom="4">
        {renderLabel()}
      </Text>

      <Flex
        className={styles['tracklist-scroll']}
        direction="row"
        gap="4"
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
      </Flex>
    </Flex>
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
    <a href={playlistData.href} target="_blank" rel="noopener noreferrer" className={styles['track-item']}>
      <Flex direction="column" className={styles['track-image-container']}>
        <SmartImage src={playlistData.image} alt={playlistData.name} width={512} height={512} priority={priority} className={styles['track-image']} />
        <Flex direction="column" className={styles['track-info']} justifyContent="flex-end">
          <p className={styles['track-title']}>{playlistData.name}</p>
        </Flex>
      </Flex>
    </a>
  );

  const renderArtist = (artistData: SpotifyApi.ArtistObjectFull) => {
    const { name, external_urls, images } = artistData;
    return (
      <a href={external_urls.spotify} target="_blank" rel="noopener noreferrer" className={styles['track-item']}>
        <Flex direction="column" className={styles['track-image-container']}>
          <SmartImage src={images[0]?.url} alt={name} width={512} height={512} priority={priority} className={styles['track-image']} />
          <Flex direction="column" className={styles['track-info']} justifyContent="flex-end">
            <p className={styles['track-title']}>{name}</p>
          </Flex>
        </Flex>
      </a>
    );
  };

  const renderTrack = (trackData: SpotifyApi.TrackObjectFull) => {
    const { name, external_urls, album, artists } = trackData;
    const artistNames = artists.map(artist => artist.name).join(', ');

    return (
      <a
        href={external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className={styles['track-item']}
        aria-label={hovered ? `${name} oleh ${artistNames}` : 'Dengarkan di Spotify'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Flex direction="column" className={styles['track-image-container']}>
          <SmartImage src={album.images[0].url} alt={name} width={512} height={512} priority={priority} className={styles['track-image']} />
          <Flex direction="column" className={styles['track-info']} justifyContent="flex-end">
            <p className={styles['track-title']}>{name}</p>
            <p className={styles['track-artist']}>{artistNames}</p>
          </Flex>
        </Flex>
      </a>
    );
  };

  if ('href' in data && 'image' in data) {
    return renderPlaylist(data as { name: string; image: string; href: string });
  }

  return artist ? renderArtist(data as SpotifyApi.ArtistObjectFull) : renderTrack(data as SpotifyApi.TrackObjectFull);
}