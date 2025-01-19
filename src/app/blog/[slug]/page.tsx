import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { getPosts } from '@/app/utils/utils';
import { Avatar, Button, Flex, Heading, Icon, ShareButton, SmartImage, Text } from '@/once-ui/components';
import { formatDate } from '@/app/utils/formatDate';
import { baseURL, renderContent } from '@/app/resources';
import styles from '@/components/blog/Posts.module.scss';
import Comments from './comments';
import ScrollToHash from '@/components/ScrollToHash';
import { ToCModal } from '@/components/ToCModal';

interface BlogParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const allPosts = [];

  // Fetch posts without considering locales
  const posts = getPosts(['src', 'app', 'blog', 'posts']);
  allPosts.push(...posts.map(post => ({
    slug: post.slug,
  })));

  return allPosts;
}

export function generateMetadata({ params: { slug } }: BlogParams) {
  const post = getPosts(['src', 'app', 'blog', 'posts']).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, updatedAt, summary: description, image } = post.metadata;

  const ogImage = image
    ? `https://${baseURL}${image}`
    : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      modifiedTime: updatedAt,
      url: `https://${baseURL}/blog/${post.slug}`,
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
  };
}

export default function Blog({ params }: BlogParams) {
  const post = getPosts(['src', 'app', 'blog', 'posts']).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const { person } = renderContent();

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
            dateModified: post.metadata.updatedAt || post.metadata.publishedAt, // Use updatedAt if available
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
          }),
        }}
      />
      <Button
        href={`/blog`}
        variant="tertiary"
        size="s"
        prefixIcon="chevronLeft"
      >
        Kembali
      </Button>
      <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      {post.metadata.image && (
        <Flex fillWidth className={styles.image}>
          <SmartImage
            priority
            style={{
              cursor: 'pointer',
              border: '1px solid var(--neutral-alpha-weak)',
            }}
            radius="m"
            src={post.metadata.image}
            alt={post.metadata.title}
            aspectRatio="16 / 9"
          />
        </Flex>
      )}
      <Flex gap="12" alignItems="center" justifyContent="space-between">
        <Flex gap="12" alignItems="center">
          {person.avatar && <Avatar size="s" src="/images/logo.png" />}
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
      <ShareButton baseURL={baseURL} dir="blog" slug={post.slug} />
      <ScrollToHash />
      <Comments
        postSlug={post.slug}
        postUrl={`https://${baseURL}/blog/${post.slug}`}
      />
    </Flex>
  );
}