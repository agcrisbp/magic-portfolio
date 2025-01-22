import { Button, Flex, Heading, Text } from '@/once-ui/components';
import { getPosts } from '@/app/utils/utils';
import { Posts } from '@/components/blog/Posts';

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
    title: `Tag: ${tag}`,
    description: `Artikel dengan tag ${tag}.`,
    openGraph: {
      title: `Tag: ${tag}`,
      description: `Artikel dengan tag ${tag}.`,
      type: 'website',
      url: `/${locale}/blog/tag/${tag}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Tag: ${tag}`,
      description: `Artikel dengan tag ${tag}.`,
    },
  };
}

export default function TagBlog({ params }: { params: { locale: string; tag: string } }) {
  const { locale, tag } = params;
  return (
    <Flex fillWidth maxWidth="s" flex={1} direction="column">
      <Button
        href={`/${locale}/blog`}
        variant="tertiary"
        size="s"
        prefixIcon="chevronLeft">
        Kembali
      </Button>
      <Heading marginBottom="s" variant="display-strong-s">
        Tag: {tag}
      </Heading>
      <Text variant="body-default-xs" onBackground="neutral-weak">
        Semua artikel dengan tag {tag}.
      </Text>
      <Flex
        as="div"
        style={{
          borderBottom: '1px solid',
          margin: '16px 0',
        }}
      />
      <Posts range={[1, 2]} locale={locale} tag={tag} thumbnail />
      <Posts range={[3]} columns="2" locale={locale} tag={tag} />
    </Flex>
  );
}