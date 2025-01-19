import { Button, Flex, Heading, Text } from '@/once-ui/components';
import { getPosts } from '@/app/utils/utils';
import { Posts } from '@/components/blog/Posts';

export async function generateStaticParams() {
  const posts = getPosts(['src', 'app', 'blog', 'posts']);
  const tags = Array.from(new Set(posts.flatMap((post) => post.metadata.tag)));
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  const { tag } = params;
  return {
    title: `Tag: ${tag}`,
    description: `Artikel dengan tag ${tag}.`,
    openGraph: {
      title: `Tag: ${tag}`,
      description: `Artikel dengan tag ${tag}.`,
      type: 'website',
      url: `/blog/tag/${tag}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Tag: ${tag}`,
      description: `Artikel dengan tag ${tag}.`,
    },
  };
}

export default function TagBlog({ params }: { params: { tag: string } }) {
  const { tag } = params;
  return (
    <Flex
      as="section"
      fillWidth
      maxWidth="m"
      direction="column"
      gap="m"
    >
      <Button
        href="/blog"
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
      <Posts range={[1, 2]} tag={tag} thumbnail />
      <Posts range={[3]} columns="2" tag={tag} />
    </Flex>
  );
}