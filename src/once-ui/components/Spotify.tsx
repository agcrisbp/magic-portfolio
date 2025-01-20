'use client';

import { Flex, Icon, Tooltip, Text } from '.';
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import styles from "./Spotify.module.scss";

import type {
  NowPlayingResponseError,
  NowPlayingResponseSuccess,
} from "../../pages/api/nowPlaying";

const formatDuration = (ms: number) => {
  const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, "0");
  const minutes = Math.floor((ms / 1000 / 60) % 60).toString().padStart(2, "0");
  const hours = Math.floor(ms / 1000 / 60 / 60);

  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Spotify() {
  const { data } = useSWR<
    NowPlayingResponseSuccess,
    NowPlayingResponseError
  >("/api/nowPlaying", fetcher, { refreshInterval: 5000 });

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!data?.progessMs || !data.item) return;

    const started = Date.now();

    const interval = setInterval(() => {
      setTime(
        data.isPaused
          ? data.progessMs
          : Math.min(
              data.progessMs! + Date.now() - started,
              data?.item?.duration_ms!
            )
      );
    }, 100);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className={styles["spotify-container"]}>
      <div className={styles["album-image-container"]}>
        <Link href="/spotify">
          <Image
            src={
              (data?.item && "album" in data.item
                ? data?.item?.album.images[0]?.url
                : data?.item?.images[0]?.url) ?? "/images/emptysong.jpg"
            }
            alt="Spotify Album Art"
            width={256}
            height={256}
            priority={true}
            className={styles["album-image"]}
          />
        </Link>
      </div>
      <div className={styles["track-info"]}>
        {data?.item ? (
          <>
            {"album" in data.item ? (
              <>
                <Text variant="body-default-s" onBackground="neutral-medium" className={styles["album-info"]}>
                  <a
                    href={data.item.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["track-name"]}
                  >
                    {data.item.name}
                  </a>{" "}
                  oleh{" "}
                  {data.item.artists.map((artist: any, i: number) => (
                    <span key={data.item?.id + artist.id}>
                      <a
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles["artist-name"]}
                      >
                        {artist.name}
                      </a>
                      {i < data.item?.artists.length! - 1 ? ", " : null}
                    </span>
                  ))}
                </Text>
                <Text variant="body-default-xs" onBackground="neutral-medium" className={styles["album-info"]}>
                  Album{" "}
                  <a
                    href={data.item.album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["album-name"]}
                  >
                    {data.item.album.name}
                  </a>
                </Text>
              </>
            ) : (
              <>
                <Text variant="body-default-s" onBackground="neutral-medium" className={styles["album-info"]}>
                  <a
                    href={data.item.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["track-name"]}
                  >
                    {data.item.name}
                  </a>{" "}
                  oleh{" "}
                  <a
                    href={data.item.show.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["artist-name"]}
                  >
                    {data.item.show.name}
                  </a>
                </Text>
                <Text variant="body-default-s" onBackground="neutral-medium" className={styles["album-info"]}>Podcast Episode</Text>
              </>
            )}
            <Text variant="body-default-s" onBackground="neutral-medium"
              className={`${styles["progress-container"]} ${styles["opacity-80"]} ${styles["flex"]} ${styles["items-center"]} ${styles["gap-1"]}`}
            >
              {data?.isPlayingNow && data.item ? (
                <span className={styles["progress-bar"]}>
                  <span className={styles["progress-bar-bg"]}>
                    <span
                      className={styles["progress-bar-fg"]}
                      style={{
                        width: `${(time! / data.item.duration_ms) * 100}%`,
                      }}
                    />
                  </span>
                  <span className={styles["time-info"]}>
                    <Text variant="body-default-xs" onBackground="neutral-medium" className={styles["full-width"]}>
                      {formatDuration(time!)}
                    </Text>
                    <span>
                      {data?.isPaused ? (
                        <Icon
                          onBackground="neutral-weak"
                          size="xs"
                          name="pausetoplay"
                        />
                      ) : (
                        <Icon
                          onBackground="neutral-medium"
                          size="xs"
                          name="playtopause"
                        />
                      )}
                    </span>
                    <Text variant="body-default-xs" onBackground="neutral-medium" className={styles["right-align"]}>
                      {formatDuration(data.item.duration_ms)}
                    </Text>
                  </span>
                </span>
              ) : (
                <>
                  <Icon
                    onBackground="neutral-medium"
                    size="xs"
                    name="spotify"
                  />
                  {data?.recentlyPlayed ? (
                    <Text variant="body-default-xs" onBackground="neutral-medium" className={styles["album-info"]}>Terakhir diputar di Spotify</Text>
                  ) : null}
                </>
              )}
            </Text>
          </>
        ) : (
          "Tidak ada lagu yang diputar saat ini" 
        )}
      </div>
    </div>
  );
}