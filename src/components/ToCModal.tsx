'use client';

import { useState, useRef } from 'react';
import { IconButton, Flex, Text } from '@/once-ui/components';
import styles from './ToCModal.module.scss';

type ToCModalProps = {
  headings: { text: string; level: number }[];
};

export function ToCModal({ headings }: ToCModalProps) {
  const [isMinimized, setIsMinimized] = useState(true);
  const [position, setPosition] = useState({ top: '50%', right: '16px' });
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => setIsMinimized((prev) => !prev);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setIsDragging(true);

    const startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const startY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    const { offsetTop, offsetLeft, offsetWidth } = buttonRef.current || {};
    const startRight = window.innerWidth - (offsetLeft || 0) - (offsetWidth || 0);

    const onDrag = (e: MouseEvent | TouchEvent) => {
      const moveX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const moveY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const newTop = (offsetTop || 0) + moveY - startY;
      const newRight = startRight - (moveX - startX);

      // Prevent dragging outside the window boundaries
      const clampedTop = Math.max(0, Math.min(newTop, window.innerHeight - (buttonRef.current?.offsetHeight || 0)));
      const clampedRight = Math.max(0, Math.min(newRight, window.innerWidth - (buttonRef.current?.offsetWidth || 0)));

      setPosition({
        top: `${clampedTop}px`,
        right: `${clampedRight}px`,
      });
    };

    const stopDrag = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchend', stopDrag);
    };

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  };

  let levelOneCounter = 0;

  return (
    <>
      {isMinimized && (
        <Flex
          ref={buttonRef}
          zIndex={10}
          background="accent-medium"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onClick={!isDragging ? toggleModal : undefined}
          style={{
            position: 'fixed',
            top: position.top,
            right: position.right,
            cursor: 'grab',
            borderRadius: '16px',
            transform: 'translateY(-50%)',
            transition: 'top 0.8s, right 0.3s',
          }}
        >
          <IconButton icon="table" tooltip="Daftar Isi" size="l" variant="tertiary" />
        </Flex>
      )}

      {!isMinimized && (
        <Flex
          className={styles.modal}
          background="accent-medium"
          zIndex={10}
          fillWidth
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
            maxWidth: '350px',
            boxShadow: '0 0 8px rgba(255,255,255,0.3)',
          }}
        >
          <Flex direction="column" padding="16" gap="12" style={{ maxWidth: '100%' }}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text variant="body-default-l">Daftar Isi</Text>
              <IconButton icon="close" variant="secondary" size="s" onClick={toggleModal} />
            </Flex>
            <Flex direction="column" gap="8" style={{ maxHeight: '350px', overflowY: 'auto' }}>
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