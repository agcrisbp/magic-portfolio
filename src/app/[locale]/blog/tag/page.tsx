import { Flex, Heading, Tag, Text } from '@/once-ui/components';
import { getPosts } from '@/app/utils/utils';
import { Posts } from '@/components/blog/Posts';
import Link from 'next/link';
import { baseURL, renderContent } from '@/app/resources'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {

	const t = await getTranslations();
	const { tag } = renderContent(t);

	const title = tag.title;
	const description = tag.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/blog/tag`,
			images: [
				{
					url: ogImage,
					alt: title,
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

export default function TagList(
	{ params: {locale}}: { params: { locale: string }}
) {
	unstable_setRequestLocale(locale);
	
	const t = useTranslations();

  // Retrieve posts for the given locale
  const posts = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]);

  // Get all unique tags
  const tags = Array.from(new Set(posts.flatMap((post) => post.metadata.tag)));

  return (
    <Flex fillWidth maxWidth="s" flex={1} direction="column">
      <Heading marginBottom="s" variant="display-strong-s">
        {t("tag.all")}
      </Heading>
      <Text variant="body-default-xs" onBackground="neutral-weak">
        {t("tag.click")}
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