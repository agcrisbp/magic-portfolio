import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { getPosts } from '@/app/utils/utils';
import { AvatarGroup, Button, Flex, Heading, Icon, ShareButton, SmartImage, Tag, Text } from '@/once-ui/components';
import { formatDate } from '@/app/utils/formatDate';
import { baseURL, renderContent } from '@/app/resources';
import ScrollToHash from '@/components/ScrollToHash';
import { ToCModal } from '@/components/ToCModal';

interface WorkParams {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const allPosts = [];

    const posts = getPosts(['src', 'app', 'work', 'projects']);
    allPosts.push(...posts.map(post => ({
        slug: post.slug,
    })));

    return allPosts;
}

export function generateMetadata({ params: { slug } }: WorkParams) {
    let post = getPosts(['src', 'app', 'work', 'projects']).find((post) => post.slug === slug)
    
    if (!post) {
        return
    }

    let {
        title,
        publishedAt: publishedTime,
        updatedAt,
        summary: description,
        images,
        image,
        team,
    } = post.metadata
    let ogImage = image
        ? `https://${baseURL}${image}`
        : `https://${baseURL}/og?title=${title}`;

    return {
        title,
        description,
        images,
        team,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            modifiedTime: updatedAt,
            url: `https://${baseURL}/work/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    }
}

export default function Project({ params }: WorkParams) {
    let post = getPosts(['src', 'app', 'work', 'projects']).find((post) => post.slug === params.slug)

    if (!post) {
        notFound()
    }

    const { person } = renderContent();

    const avatars = post.metadata.team?.map((person) => ({
        src: person.avatar,
    })) || [];
    
    const headings = post.content
    .match(/(?<=^|\n)#{1,6} .+/g)
    ?.map((heading) => ({
      text: heading.replace(/^#+ /, '').trim(),
      level: heading.match(/^#+/)?.[0].length || 1,
    }));

  return (
    <Flex
      as="section"
      fillWidth
      maxWidth="m"
      direction="column"
      gap="m"
    >
      <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  headline: post.metadata.title,
                  datePublished: post.metadata.publishedAt,
                  dateModified: post.metadata.updatedAt || post.metadata.publishedAt,
                  description: post.metadata.summary,
                  image: post.metadata.image
                      ? `https://${baseURL}${post.metadata.image}`
                      : `https://${baseURL}/og?title=${post.metadata.title}`,
                  url: `https://${baseURL}/work/${post.slug}`,
                  author: {
                      '@type': 'Person',
                      name: person.name,
                  },
              }),
          }}
      />
        <Button
          href={`/work`}
          variant="tertiary"
          size="s"
          prefixIcon="chevronLeft"
        >
          Kembali
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
        {post.metadata.images.length > 0 && (
            <SmartImage
              priority
              style={{
                cursor: 'pointer',
                border: '1px solid var(--neutral-alpha-weak)',
              }}
              radius="m"
              src={post.metadata.images[0]}
              alt={post.metadata.title[0]}
              aspectRatio="16 / 9"
            />
        )}
        <Flex gap="12" alignItems="center" justifyContent="space-between">
          <Flex gap="12" alignItems="center">
            { post.metadata.team && (
                  <AvatarGroup
                      reverseOrder
                      avatars={avatars}
                      size="m"/>
              )}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt)}
            </Text>
          </Flex>
          {post.metadata.updatedAt && (
            <Flex alignItems="center" gap="2">
              <Icon
                name="infoCircle"
                tooltip="Tanggal diperbarui."
                size="xs"
                onBackground="neutral-weak"
              />
              <Text variant="body-default-s" onBackground="neutral-weak">
                {formatDate(post.metadata.updatedAt)}
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex as="div" style={{ borderBottom: '1px solid', margin: '10px 0' }} />
        <ToCModal headings={headings || []} />
        <Flex as="article" direction="column" paddingBottom="32" fillWidth>
          <CustomMDX source={post.content} />
        </Flex>
        <Flex justifyContent="center">
          <Tag>
            <ShareButton baseURL={baseURL} dir="work" slug={post.slug} />
          </Tag>
        </Flex>
        <ScrollToHash />
    </Flex>
  );
}