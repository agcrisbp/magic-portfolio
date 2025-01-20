import { Flex } from "@/once-ui/components";
import MusicIndex from "@/components/music/Music";
import { baseURL, renderContent } from "@/app/resources";

export async function generateMetadata() {
	const { music } = renderContent();

	const title = music.title;
	const description = music.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/music`,
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

export default function Music() {
	const { music, person } = renderContent();
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
						'@type': 'ImageMusic',
						name: music.title,
						description: music.description,
						url: `https://${baseURL}/music`,
						author: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<MusicIndex />
		</Flex>
	);
}