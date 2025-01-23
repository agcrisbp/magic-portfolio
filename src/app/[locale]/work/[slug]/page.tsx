import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { getPosts } from '@/app/utils/utils'
import { AvatarGroup, Button, Flex, Heading, ShareButton, SmartImage, Tag, Text } from '@/once-ui/components'
import { baseURL, renderContent } from '@/app/resources';
import { routing } from '@/i18n/routing';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import ScrollToHash from '@/components/ScrollToHash';
import { ToCModal } from '@/components/ToCModal';
import dynamic from 'next/dynamic';

const DateDisplay = dynamic(() => import('@/components/DateDisplay'), { ssr: false });

interface WorkParams {
    params: {
        slug: string;
		locale: string;
    };
}

export async function generateStaticParams() {
	const locales = routing.locales;
    
    // Create an array to store all posts from all locales
    const allPosts = [];

    // Fetch posts for each locale
    for (const locale of locales) {
        const posts = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);
        allPosts.push(...posts.map(post => ({
            slug: post.slug,
            locale: locale,
        })));
    }

    return allPosts;
}

export function generateMetadata({ params: { slug, locale } }: WorkParams) {
	let post = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]).find((post) => post.slug === slug)
	
	if (!post) {
		return
	}

	let {
		title,
		publishedAt: publishedTime,
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
			url: `https://${baseURL}/${locale}/work/${post.slug}`,
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
	unstable_setRequestLocale(params.locale);
	let post = getPosts(['src', 'app', '[locale]', 'work', 'projects', params.locale]).find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	const t = useTranslations();
	const { person } = renderContent(t);

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
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `https://${baseURL}${post.metadata.image}`
							: `https://${baseURL}/og?title=${post.metadata.title}`,
							url: `https://${baseURL}/${params.locale}/work/${post.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/>
			<Button
				href={`/${params.locale}/work`}
				variant="tertiary"
				size="s"
				prefixIcon="chevronLeft">
				{t("button.back")}
			</Button>
			<Heading
				variant="display-strong-s">
				{post.metadata.title}
			</Heading>
			{post.metadata.images.length > 0 && (
				<SmartImage
					aspectRatio="16 / 9"
					radius="m"
					alt="image"
					src={post.metadata.images[0]}/>
			)}
			<Flex style={{margin: 'auto'}}
				as="article"
				maxWidth="xs" fillWidth
				direction="column">
				<Flex
					gap="12" marginBottom="24"
					alignItems="center">
					{ post.metadata.team && (
						<AvatarGroup
							reverseOrder
							avatars={avatars}
							size="m"/>
					)}
					<Text
						variant="body-default-s"
						onBackground="neutral-weak">
						<DateDisplay date={post.metadata.publishedAt} />
					</Text>
				</Flex>
				<Flex
          as="div"
          style={{
            borderBottom: '1px solid',
            margin: '10px 0',
          }}
        />
        <ToCModal headings={headings || []} />
				<CustomMDX source={post.content} />
			</Flex>
			<Flex justifyContent="center">
        <Tag>
          <ShareButton baseURL={baseURL} dir={`${params.locale}/work`} slug={post.slug} />
        </Tag>
      </Flex>
			<ScrollToHash />
		</Flex>
	)
}