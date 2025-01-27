'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Flex, Text, IconButton } from '@/once-ui/components';

const ResumeModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const files = [ // this can be any files inside public directory
    { name: 'Example: LinkedIn Icon', link: '/trademark/linkedin.svg' },
    { name: 'Example: _redirects', link: '/_redirects' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleDownload = (link: string) => {
    window.open(link, '_blank');
    setModalOpen(false);
  };

  return (
    <>
      <IconButton
        data-border="rounded"
        variant="secondary"
        icon="download"
        onClick={() => setModalOpen(true)}
      />

      {isModalOpen && (
        <Flex
          horizontal="center"
          vertical="center"
          fillWidth
          fillHeight
          position="fixed"
          style={{
            paddingTop: '50px',
            zIndex: 1000,
          }}
        >
          <Flex
            ref={modalRef}
            direction="column"
            padding="16"
            radius="l"
            background="brand-weak"
            gap="12"
            shadow="l"
            style={{
              maxWidth: '100%',
              width: 'fit-content',
            }}
          >
            <Flex horizontal="space-between" vertical="center" gap="8" fillHeight>
              <Text variant="body-default-l">
                Pilih Resume
              </Text>
              <IconButton
                data-border="rounded"
                variant="secondary"
                size="s"
                icon="close"
                onClick={() => setModalOpen(false)}
              />
            </Flex>

            <Flex direction="column" gap="8">
              {files.map((file, index) => (
                <Button
                  key={index}
                  label={file.name}
                  variant="secondary"
                  size="s"
                  onClick={() => handleDownload(file.link)}
                  fillWidth
                  style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ResumeModal;