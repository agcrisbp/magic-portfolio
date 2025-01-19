import { baseURL, renderContent } from '@/app/resources';
import { Flex, IconButton, SmartLink, Spotify, Text } from "@/once-ui/components";
import styles from './Footer.module.scss';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { person, social } = renderContent();

    return (
        <Flex
            as="footer"
            position="relative"
            padding="8"
            fillWidth
            justifyContent="center"
            mobileDirection="column">
            <Flex
                className={`${styles.mobile} ${styles.footerGrid}`}
                fillWidth
                maxWidth="m"
                paddingY="8"
                paddingX="16"
                gap="16"
                justifyContent="space-between"
                alignItems="center">
                
                {/* Left Section */}
                <div className={styles.footerLeft}>
                    <Spotify />
                </div>

                {/* Center Section */}
                <Flex className={styles.footerCenter} gap="16">
                    {social.map((item) =>
                        item.link && (
                            <IconButton
                                key={item.name}
                                href={item.link}
                                icon={item.icon}
                                tooltip={item.name}
                                size="s"
                                variant="ghost"
                            />
                        )
                    )}
                </Flex>

                {/* Right Section */}
                <div className={styles.footerRight}>
                    <Text variant="body-default-s" onBackground="neutral-strong">
                        <Text onBackground="neutral-weak">
                            © {currentYear}{' '}
                        </Text>
                        <Text onBackground="neutral-strong">{person.name}</Text>
                        <br />
                        <Text onBackground="neutral-weak" style={{ display: 'inline-flex' }} >
                            Powered by<SmartLink href={`https://${baseURL}/once-ui`}><img src="/trademark/OnceUIxCH.svg" width="auto" height="17" style={{ pointerEvents: 'none' }} /></SmartLink>
                        </Text>
                    </Text>
                </div>
            </Flex>
            <Flex height="80" show="s"></Flex>
        </Flex>
    );
};