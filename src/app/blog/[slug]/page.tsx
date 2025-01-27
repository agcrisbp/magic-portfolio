import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { Avatar, AvatarGroup, Button, Column, Heading, Icon, Row, ShareButton, SmartImage, Tag, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import Comments from './comments';
import ScrollToHash from "@/components/ScrollToHash";
import { ToCModal } from '@/components/ToCModal';
import styles from "@/components/blog/Posts.module.scss";

interface BlogParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params: { slug } }: BlogParams) {
  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    updatedAt,
    summary: description,
    images,
    image,
    team,
  } = post.metadata;
  let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
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
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }: BlogParams) {
  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];
    
  const headings = post.content
    .match(/(?<=^|\n)#{1,6} .+/g)
    ?.map((heading) => ({
      text: heading.replace(/^#+ /, '').trim(),
      level: heading.match(/^#+/)?.[0].length || 1,
  }));

  return (
    <Column as="section" maxWidth="xs" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.updatedAt || post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <Button href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
        Kembali
      </Button>
      <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      {post.metadata.image && (
        <Row fillWidth>
          <SmartImage
            priority
            className={styles.image}
            sizes="640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="m"
            src={post.metadata.image}
            alt={post.metadata.title}
            aspectRatio="16 / 9"
          />
        </Row>
      )}
      <Row gap="12" vertical="center" horizontal="space-between">
        <Row gap="12" vertical="center" horizontal="center">
        {/*}
        {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
        */}
          {person.avatar && <Avatar size="s" src="/images/logo.png" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {formatDate(post.metadata.publishedAt)}
          </Text>
        </Row>
        {post.metadata.updatedAt && (
          <Row horizontal="center" gap="2">
            <Icon
              name="infoCircle"
              size="xs"
              tooltip="Tanggal diperbarui."
              onBackground="neutral-weak"
            />
            <Text variant="body-default-s" onBackground="neutral-weak">
              {formatDate(post.metadata.updatedAt)}
            </Text>
          </Row>
        )}
      </Row>
      <div style={{ borderBottom: '1px solid var(--accent-border-medium)', margin: '10px 0' }} />
      <ToCModal headings={headings || []} />
      <Column as="article" fillWidth>
        <CustomMDX source={post.content} />
      </Column>
      <Column horizontal="center">
        <Tag>
          <ShareButton baseURL={baseURL} dir="blog" slug={post.slug} />
        </Tag>
      </Column>
      <ScrollToHash />
      <Comments
        postSlug={post.slug}
        postUrl={`https://${baseURL}/blog/${post.slug}`}
      />
    </Column>
  );
}
