'use client';

import { useState, useEffect, useRef } from 'react';
import { IconButton, Flex, Text } from '@/once-ui/components';
import styles from './ToCModal.module.scss';

type ToCModalProps = {
  headings: { text: string; level: number }[];
};

export function ToCModal({ headings }: ToCModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => setIsMinimized((prev) => !prev);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsMinimized(true);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMinimized(true);
      }
      
      if (event.key === 'Enter') {
        setIsMinimized(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  
  let levelOneCounter = 0;

  return (
    <>
      {isMinimized && (
        <Flex
          justifyContent="center"
          alignItems="center"
          background="accent-medium"
          onClick={toggleModal}
          zIndex={10}
          style={{
            position: 'fixed',
            right: '16px',
            cursor: 'pointer',
            borderRadius: '16px',
            transform: 'translateY(-50%)',
            top: '50%',
          }}
        >
          <IconButton
            icon="table"
            tooltip="Daftar Isi"
            size="l"
            variant="tertiary"
          />
        </Flex>
      )}

      {isOpen && !isMinimized && (
        <Flex
          className={styles.modal}
          justifyContent="center"
          alignItems="center"
          fillWidth
          zIndex={10}
          position="fixed"
          style={{
            top: '50%',
            right: '16px',
            borderRadius: '8px',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 8px rgba(255,255,255,0.3)',
            maxWidth: '350px',
          }}
        >
          <Flex
            ref={modalRef}
            direction="column"
            padding="16"
            radius="l"
            background="accent-weak"
            gap="12"
            shadow="l"
            zIndex={10}
            style={{
              maxWidth: '100%',
              width: 'fit-content',
            }}
          >
            <Flex justifyContent="space-between" alignItems="center" gap="8" zIndex={10}>
                <Text variant="body-default-l">Daftar Isi</Text>
                <IconButton
                  icon="close"
                  data-border="rounded"
                  variant="secondary"
                  size="s"
                  onClick={toggleModal}
                />
            </Flex>
            
            <Flex
                direction="column"
                gap="8"
                zIndex={10}
                style={{
                  maxHeight: '500px',
                  overflowY: 'auto',
                  scrollbarColor: 'transparent transparent',
                }}>
              {headings.map(({ text, level }, index) => {
                const isLevelOne = level === 1;
                if (isLevelOne) {
                  levelOneCounter += 1;
                }
              
                return (
                  <a
                    key={index}
                    href={`#${text.toLowerCase().replace(/\s+/g, '-').replace(/[:_.]/g, '')}`}
                    style={{ marginLeft: `${(level - 1) * 4}px` }}
                  >
                    <Flex style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                      <Text
                        variant="body-default-m"
                        style={{ 
                          marginRight: '8px', 
                          whiteSpace: 'nowrap', 
                          flexShrink: 0 
                        }}
                      >
                        {isLevelOne ? `${levelOneCounter}.` : '⤷'}
                      </Text>
                      <Text
                        variant="body-default-m"
                        style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          whiteSpace: 'normal',
                        }}
                      >
                        {text}
                      </Text>
                    </Flex>
                  </a>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}