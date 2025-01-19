import React from "react";
import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, SmartLink } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes, renderContent } from "@/app/resources";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
	const { home } = renderContent();
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			url: `https://${baseURL}`,
			images: [
				{
					url: ogImage,
					alt: title,
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

export default function Home() {
	const { home, about, person, newsletter } = renderContent();

	return (
		<Flex maxWidth="m" fillWidth gap="xl" direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebPage",
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
							"@type": "Person",
							name: person.name,
							image: {
								"@type": "ImageObject",
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<Flex fillWidth direction="column" paddingY="l" gap="m">
				<Flex direction="column" fillWidth maxWidth="m" gap="m">
					<RevealFx translateY="4">
						<Heading wrap="balance" variant="display-strong-l">
							{home.headline}
						</Heading>
					</RevealFx>
					<RevealFx translateY="8" delay={0.2}>
						<Flex fillWidth>
							<Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
								{home.subline}
							</Text>
						</Flex>
					</RevealFx>
					<RevealFx translateY="12" delay={0.4}>
						<Flex fillWidth>
							<Button
								id="about"
								data-border="rounded"
								href={`/about`}
								variant="tertiary"
								size="m"
							>
								<Flex gap="8" alignItems="center">
									{about.avatar.display && (
										<Avatar
											style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
											src={person.avatar}
											size="m"
										/>
									)}
									{about.title}
									<Arrow trigger="#about" />
								</Flex>
							</Button>
						</Flex>
					</RevealFx>
				</Flex>
			</Flex>

			{routes["/blog"] && (
				<Flex fillWidth gap="24" mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading as="h2" variant="display-strong-xs" wrap="balance">
						  <SmartLink href={`/blog`}>
							Tulisan Terbaru
							</SmartLink>
						</Heading>
					</Flex>
					<Flex flex={3} paddingX="20">
						<Posts range={[1, 2]} columns="2" />
					</Flex>
				</Flex>
			)}

			{routes["/work"] && (
				<Flex fillWidth gap="24" mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading as="h2" variant="display-strong-xs" wrap="balance">
						  <SmartLink href={`/work`}>
							Projek Terbaru
							</SmartLink>
						</Heading>
					</Flex>
					<Flex flex={3} paddingX="20">
						<Projects range={[1, 1]} />
					</Flex>
				</Flex>
			)}
			{newsletter.display && <Mailchimp newsletter={newsletter} />}
		</Flex>
	);
}