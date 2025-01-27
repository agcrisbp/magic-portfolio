import { Column } from "@/once-ui/components";
import MusicIndex from "@/components/music/Music";
import { baseURL } from "@/app/resources";
import { music, person } from "@/app/resources/content";

export async function generateMetadata() {
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
	return (
		<Column maxWidth="m">
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
		</Column>
	);
}