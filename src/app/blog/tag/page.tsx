import { Column, Row, Heading, Tag, Text } from '@/once-ui/components';
import { getPosts } from '@/app/utils/utils';
import { Posts } from '@/components/blog/Posts';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getPosts(['src', 'app', 'blog', 'posts']);
  const tags = Array.from(new Set(posts.flatMap((post) => post.metadata.tag)));
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  const { tag } = params;
  return {
    title: `Tag`,
    description: `Telusuri artikel dengan tag.`,
    openGraph: {
      title: `Tag`,
      description: `Telusuri artikel dengan tag.`,
      type: 'website',
      url: `/blog/tag/${tag}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Tag`,
      description: `Telusuri artikel dengan tag.`,
    },
  };
}

export default function TagList({ params }: { params: { tag: string } }) {
  const { tag } = params;

  const posts = getPosts(['src', 'app', 'blog', 'posts']);
  const tags = Array.from(new Set(posts.flatMap((post) => post.metadata.tag)));

  return (
    <Column fillWidth maxWidth="s" flex={1} direction="column">
      <Heading marginBottom="s" variant="display-strong-s">
        Semua Tag
      </Heading>
      <Text variant="body-default-xs" onBackground="neutral-weak">
        Klik tag untuk melihat artikel terkait.
      </Text>
      <div
        style={{
          borderBottom: '1px solid',
          margin: '16px 0',
        }}
      />
      <Row wrap gap="4">
        {tags.map((tag) => (
          <Link key={tag} href={`/blog/tag/${tag}`} passHref>
            <Tag
                className="mt-8"
                label={tag}
                variant="neutral"
            />
          </Link>
        ))}
      </Row>
    </Column>
  );
}