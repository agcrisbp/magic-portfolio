import { Button, Flex, Heading, Text } from '@/once-ui/components';
import { getPosts } from '@/app/utils/utils';
import { Posts } from '@/components/blog/Posts';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export async function generateStaticParams() {
  const locales = routing.locales;
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
  const t = await getTranslations();

  const title = `Tag: ${tag}`;
  const description = t("tag.all-2", { tag: tag });
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/${locale}/blog/tag/${tag}`,
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

export default function TagBlog({ params }: { params: { locale: string; tag: string } }) {
  unstable_setRequestLocale(params.locale);
  
  const t = useTranslations();
  
  const { locale, tag } = params;
  return (
    <Flex
      as="section"
      fillWidth
      maxWidth="xs"
      direction="column"
      gap="m"
    >
      <Button
        href={`/${locale}/blog`}
        variant="tertiary"
        size="s"
        prefixIcon="chevronLeft">
        {t("button.back")}
      </Button>
      <Heading marginBottom="s" variant="display-strong-s">
        Tag: {tag}
      </Heading>
      <Text variant="body-default-xs" onBackground="neutral-weak">
        {t("tag.all-2", {tag: tag})}
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