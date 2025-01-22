import { Flex, Heading, Tag, Text } from '@/once-ui/components';
import { getPosts } from '@/app/utils/utils';
import { Posts } from '@/components/blog/Posts';
import Link from 'next/link';

export async function generateStaticParams() {
  const locales = ['id', 'en'];
  const posts = locales.flatMap((locale) =>
    getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale])
  );
  const tags = Array.from(new Set(posts.flatMap((post) => post.metadata.tag)));
  return locales.flatMap((locale) =>
    tags.map((tag) => ({ tag, locale }))
  );
}

export async function generateMetadata({ params }: { params: { locale: string; tag: string } }) {
  const { locale, tag } = params;
  return {
    title: `Tag`,
    description: `Telusuri artikel dengan tag.`,
    openGraph: {
      title: `Tag`,
      description: `Telusuri artikel dengan tag.`,
      type: 'website',
      url: `/${locale}/blog/tag/${tag}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Tag`,
      description: `Telusuri artikel dengan tag.`,
    },
  };
}

export default function TagList({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Retrieve posts for the given locale
  const posts = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]);

  // Get all unique tags
  const tags = Array.from(new Set(posts.flatMap((post) => post.metadata.tag)));

  return (
    <Flex fillWidth maxWidth="s" flex={1} direction="column">
      <Heading marginBottom="s" variant="display-strong-s">
        Semua Tag
      </Heading>
      <Text variant="body-default-xs" onBackground="neutral-weak">
        Klik tag untuk melihat artikel terkait.
      </Text>
      <Flex
        as="div"
        style={{
          borderBottom: '1px solid',
          margin: '16px 0',
        }}
      />
      <Flex direction="row" wrap gap="4">
        {tags.map((tag) => (
          <Link key={tag} href={`/${locale}/blog/tag/${tag}`} passHref>
            <Tag
                className="mt-8"
                label={tag}
                variant="neutral"
            />
          </Link>
        ))}
      </Flex>
      {/* Optionally, you can show some posts here */}
      {/* <Posts range={[1, 2]} locale={locale} thumbnail /> */}
    </Flex>
  );
}