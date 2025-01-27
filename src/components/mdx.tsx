import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";

import { Accordion, Button, Carousel, Flex, SmartImage, SmartLink, Tag, Text } from "@/once-ui/components";
import { CodeBlock } from "@/once-ui/modules";
import { HeadingLink } from "@/components";
import { ProjectInfo } from "@/components/work/ProjectInfo";

import { InlineMath as OriginalInlineMath, BlockMath as OriginalBlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import { baseURL } from '@/app/resources/config';

import { TextProps } from "@/once-ui/interfaces";
import { SmartImageProps } from "@/once-ui/components/SmartImage";

type TableProps = {
    data: {
        headers: string[];
        rows: string[][];
    };
    collapse?: boolean;
};

function Table({ data, collapse = false }: TableProps) {
    const headers = data.headers.map((header, index) => (
        <th
            key={index}
            style={{
                padding: '8px',
                textAlign: 'left',
                border: '1px solid rgba(255,255,255,0.3)',
            }}
        >
            {header}
        </th>
    ));

    const rows = data.rows.map((row, index) => (
        <tr
            key={index}
            style={{
                borderBottom: '1px solid rgba(255,255,255,0.3)',
            }}
        >
            {row.map((cell, cellIndex) => (
                <td
                    key={cellIndex}
                    style={{
                        padding: '8px',
                        textAlign: 'left',
                        border: '1px solid rgba(255,255,255,0.3)',
                    }}
                >
                    {cell}
                </td>
            ))}
        </tr>
    ));

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: collapse ? 'hidden' : 'auto', // Hidden overflow for collapse true
                marginTop: '12px',
                marginBottom: '16px',
            }}
        >
            <div
                style={{
                    transform: collapse ? 'scale(1)' : 'none', // Apply scaling only if collapse is true
                    transformOrigin: 'top left', // Ensure scaling starts from the top-left
                    width: '100%',
                    maxWidth: collapse ? 'calc(100% - 5px)' : '100%', // Adjust max-width for scaling
                    transition: 'transform 0.3s ease-in-out, max-width 0.3s ease-in-out', // Smooth transition for scaling and size
                }}
            >
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: collapse ? 'calc(0.6em + 0.5vw)' : 'initial', // Scale font size if collapse is true
                        tableLayout: collapse ? 'fixed' : 'auto', // Ensure table fits when collapsed
                    }}
                >
                    <thead>
                        <tr>{headers}</tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        </div>
    );
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  
  const decodedHref = decodeURIComponent(href);
    if (decodedHref.includes('{baseURL}')) {
        const updatedHref = decodedHref.replace('{baseURL}', `https://${baseURL}`);
        return (
            <a
                href={updatedHref}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );
    }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: SmartImageProps & { src: string }) {
  if (!src) {
    console.error("SmartImage requires a valid 'src' property.");
    return null;
  }

  return (
    <SmartImage
      className="my-20"
      enlarge
      radius="m"
      aspectRatio="16 / 9"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function InlineImages({ children }: { children: ReactNode }) {
    return (
        <Flex gap="8" wrap >
            {children}
        </Flex>
    );
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const CustomHeading = ({ children, ...props }: TextProps) => {
  const slug = slugify(children as string);
      return (
          <HeadingLink
              style={{
                  marginTop: 'var(--static-space-24)',
                  marginBottom: 'var(--static-space-12)',
                  maxWidth: 'var(--responsive-width-xs)',
                  width: '100%'
              }}
              className="fill-width"
              level={level}
              id={slug}
              {...props}>
              {children}
          </HeadingLink>
      );
  };

  CustomHeading.displayName = `Heading${level}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
      <Text
          style={{
              lineHeight: '175%',
              maxWidth: 'var(--responsive-width-xs)',
          }}
          className="fill-width"
          variant="body-default-m"
          onBackground="neutral-medium"
          marginTop="8"
          marginBottom="12">
          {children}
      </Text>
  );
};

function createBlockquote({ children }: { children: ReactNode }) {
  return (
    <Flex
      background="neutral-alpha-weak"
      paddingX="16"
      paddingY="16"
      radius="m"
      marginY="24"
      style={{
        maxWidth: 'var(--responsive-width-xs)',
        width: '100%'
    }}
    >
      <Text
        variant="body-default-m"
        onBackground="neutral-strong"
        style={{ lineHeight: "175%" }}
      >
        {children}
      </Text>
    </Flex>
  );
}

const InlineMath = ({ math, style }: { math: string, style?: React.CSSProperties }) => (
    <Flex
        align="start"
        overflowX="auto"
        marginTop="8"
        marginBottom="8"
        style={{
            width: '100%',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
        }}
    >
      <Text variant="body-default-xs">
        <OriginalInlineMath
            math={math}
            style={{
                ...style,
                display: 'block',
                width: '100%',
                maxWidth: '100%',
                fontSize: 'calc(1vw + 1vh)',
            }}
        />
      </Text>
    </Flex>
);

const BlockMath = ({ math, style }: { math: string, style?: React.CSSProperties }) => (
    <Flex
        align="start"
        overflowX="auto"
        marginTop="8"
        marginBottom="8"
        style={{
            width: '100%',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
        }}
    >
      <Text variant="body-default-xs">
        <OriginalBlockMath
            math={math}
            style={{
                ...style,
                display: 'block',
                width: '100%',
                maxWidth: '100%',
                fontSize: 'calc(1vw + 1vh)',
            }}
        />
      </Text>
    </Flex>
);

const components = {
  p: createParagraph as any,
  h1: createHeading(1) as any,
  h2: createHeading(2) as any,
  h3: createHeading(3) as any,
  h4: createHeading(4) as any,
  h5: createHeading(5) as any,
  h6: createHeading(6) as any,
  img: createImage as any,
  a: CustomLink as any,
  blockquote: createBlockquote as any,
  Table,
  CodeBlock,
  Button,
  Carousel,
  Accordion,
  Flex,
  Text,
  ProjectInfo,
  SmartImage,
  Tag,
  InlineMath,
  BlockMath,
  InlineImages,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    // @ts-ignore: Suppressing type error for MDXRemote usage
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}
