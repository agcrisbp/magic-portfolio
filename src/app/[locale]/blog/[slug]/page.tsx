import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { getPosts } from '@/app/utils/utils';
import { Avatar, Button, Flex, Heading, Icon, ShareButton, SmartImage, Text } from '@/once-ui/components';
import { baseURL, renderContent } from '@/app/resources';
import { unstable_setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import styles from '@/components/blog/Posts.module.scss';
import Comments from './comments';
import ScrollToHash from '@/components/ScrollToHash';
import { ToCModal } from '@/components/ToCModal';
import dynamic from 'next/dynamic';

const DateDisplay = dynamic(() => import('@/components/DateDisplay'), { ssr: false });

interface BlogParams {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateStaticParams() {
  const locales = routing.locales;

  const allPosts = [];

  for (const locale of locales) {
    const posts = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]);
    allPosts.push(...posts.map(post => ({
      slug: post.slug,
      locale: locale,
    })));
  }

  return allPosts;
}

export function generateMetadata({ params: { slug, locale } }: BlogParams) {
  const post = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    updatedAt,
    summary: description,
    image,
  } = post.metadata;

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
      url: `https://${baseURL}/${locale}/blog/${post.slug}`,
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
  unstable_setRequestLocale(params.locale);

  const post = getPosts(['src', 'app', '[locale]', 'blog', 'posts', params.locale]).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const t = useTranslations();
  const { person } = renderContent(t);

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
      maxWidth="xs"
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
            url: `https://${baseURL}/${params.locale}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
          }),
        }}
      />
      <Button
        href={`/${params.locale}/blog`}
        variant="tertiary"
        size="s"
        prefixIcon="chevronLeft"
      >
        {t("button.back")}
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
          <DateDisplay date={post.metadata.publishedAt} />
        </Flex>
        {post.metadata.updatedAt && (
          <DateDisplay date={post.metadata.updatedAt} isUpdated />
        )}
      </Flex>
      <Flex as="div" style={{ borderBottom: '1px solid', margin: '10px 0' }} />
      <ToCModal headings={headings || []} />
      <Flex as="article" direction="column" fillWidth>
        <CustomMDX source={post.content} />
      </Flex>
      <ShareButton baseURL={baseURL} dir={`${params.locale}/blog`} slug={post.slug} />
      <ScrollToHash />
      <Comments
        postSlug={post.slug}
        postUrl={`https://${baseURL}/${params.locale}/blog/${post.slug}`}
      />
    </Flex>
  );
}