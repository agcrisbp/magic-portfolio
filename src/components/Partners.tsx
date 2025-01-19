'use client';

import React, { useState } from 'react';
import { Flex } from '@/once-ui/components';
import Image from 'next/image';

interface Partner {
  name: string;
  logo: string;
}

interface PartnersProps {
  partners: Partner[];
}

const Tooltip: React.FC<{ text: string }> = ({ text }) => {
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const adjustPosition = () => {
      if (tooltipRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let newStyle: React.CSSProperties = {};

        if (tooltipRect.right > viewportWidth) {
          newStyle.left = `calc(100% - ${tooltipRect.width}px)`;
          newStyle.transform = 'none';
        }

        if (tooltipRect.left < 0) {
          newStyle.left = '0';
          newStyle.transform = 'none';
        }

        setTooltipStyle(newStyle);
      }
    };

    adjustPosition();
    window.addEventListener('resize', adjustPosition);

    return () => window.removeEventListener('resize', adjustPosition);
  }, []);

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        bottom: '110%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '2px',
        backgroundColor: '#010a2b',
        color: '#fff',
        borderRadius: '8px',
        fontSize: '14px',
        zIndex: '10',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        ...tooltipStyle,
      }}
    >
      {text}
    </div>
  );
};

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  const handleMouseEnter = (name: string) => {
    setHoveredPartner(name);
  };

  const handleMouseLeave = () => {
    setHoveredPartner(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {partners.length > 0 && (
        <Flex wrap gap="16" justifyContent="center" onContextMenu={handleContextMenu}>
          {partners.map((partner, index) => (
            <div
              key={index}
              style={{ position: 'relative', width: '35px', height: '35px' }}
              onMouseEnter={() => handleMouseEnter(partner.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={50}
                height={50}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
              {hoveredPartner === partner.name && <Tooltip text={partner.name} />}
            </div>
          ))}
        </Flex>
      )}
    </>
  );
};

export default Partners;