'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Flex, IconButton, Text } from '.';
import styles from './SharedInteractiveStyles.module.scss';

interface ShareButtonProps {
  baseURL: string;
  dir: string;
  slug: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ baseURL, dir, slug }) => {
  const [showIcons, setShowIcons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const shareURL = `https://${baseURL}/${dir}/${slug}`;

  const toggleIcons = () => {
    setShowIcons((prev) => !prev);
  };

  const hideIcons = () => {
    setShowIcons(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideIcons();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        hideIcons();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Flex
      ref={containerRef}
      gap="8"
      horizontal="start"
      vertical="center"
      fillWidth
      zIndex={0}
    >
      <Text
        variant="body-default-m"
        onBackground="neutral-strong"
        onClick={toggleIcons}
        className={styles.container}
      >
        Bagikan
      </Text>
      <Flex
        wrap
        gap="8"
        vertical="center"
        horizontal="start"
        className={`${showIcons ? styles.visible : styles.hidden}`}
      >
        <IconButton
          icon="facebook"
          tooltip="Bagikan ke Facebook"
          variant="tertiary"
          size="xs"
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareURL}`}
        />
        <IconButton
          icon="linkedin"
          tooltip="Bagikan ke LinkedIn"
          variant="tertiary"
          size="xs"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareURL}`}
        />
        <IconButton
          icon="x"
          tooltip="Bagikan ke Twitter"
          variant="tertiary"
          size="xs"
          href={`https://twitter.com/share?url=${shareURL}`}
        />
        <IconButton
          icon="whatsapp"
          tooltip="Bagikan ke WhatsApp"
          variant="tertiary"
          size="xs"
          href={`https://wa.me/?text=${shareURL}`}
        />
        <IconButton
          icon="clipboard"
          tooltip="Salin Tautan"
          variant="tertiary"
          size="xs"
          href={shareURL}
          copy
        />
      </Flex>
    </Flex>
  );
};

export default ShareButton;