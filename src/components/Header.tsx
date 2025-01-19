"use client";

import { useEffect, useState, useTransition } from "react";

import { Flex, Line, ToggleButton } from "@/once-ui/components"
import { Weather } from "@/components"
import styles from '@/components/Header.module.scss'

import { routes, display } from '@/app/resources'
import { renderContent } from "@/app/resources";

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Set the user language in the useEffect hook
  useEffect(() => {
    const userLanguage = navigator.language;
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: deviceTimeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "short",
      };

      const timeString = new Intl.DateTimeFormat(userLanguage, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [deviceTimeZone]);

  return <>{currentTime}</>;
};

export const Header = () => {
    const [isPending, startTransition] = useTransition();

    const { person, home, about, blog, gallery, music, work } = renderContent();

    return (
        <>
            <Flex
                className={styles.mask}
                position="fixed" zIndex={9}
                fillWidth minHeight="80" justifyContent="center">
            </Flex>
            <Flex style={{height: 'fit-content'}}
                className={styles.position}
                as="header"
                zIndex={9}
                fillWidth padding="8"
                justifyContent="center">
                <Flex
                    paddingLeft="12" fillWidth
                    alignItems="center"
                    textVariant="body-default-s">
                    { display.location && (
                        <Flex hide="s">
                            <Weather />
                        </Flex>
                    )}
                </Flex>
                
                <Flex fillWidth justifyContent="center">
                    <Flex
                        background="surface" border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
                        padding="4"
                        justifyContent="center">
                        <Flex
                            gap="4"
                            textVariant="body-default-s">
                            { routes['/'] && (
                                <ToggleButton
                                    prefixIcon="home"
                                    href="/"
                                    selected={false}>
                                    <Flex paddingX="2" hide="s">{home.label}</Flex>
                                </ToggleButton>
                            )}
                            <Line vert maxHeight="30" />
                            { routes['/about'] && (
                                <ToggleButton
                                    prefixIcon="person"
                                    href="/about"
                                    selected={false}>
                                    <Flex paddingX="2" hide="s">{about.label}</Flex>
                                </ToggleButton>
                            )}
                            { routes['/blog'] && (
                                <ToggleButton
                                    prefixIcon="blog"
                                    href="/blog"
                                    selected={false}>
                                    <Flex paddingX="2" hide="s">{blog.label}</Flex>
                                </ToggleButton>
                            )}
                            { routes['/work'] && (
                                <ToggleButton
                                    prefixIcon="work"
                                    href="/work"
                                    selected={false}>
                                    <Flex paddingX="2" hide="s">{work.label}</Flex>
                                </ToggleButton>
                            )}
                            { routes['/gallery'] && (
                                <ToggleButton
                                    prefixIcon="gallery"
                                    href="/gallery"
                                    selected={false}>
                                    <Flex paddingX="2" hide="s">{gallery.label}</Flex>
                                </ToggleButton>
                            )}
                            { routes['/music'] && (
                                <ToggleButton
                                    prefixIcon="music"
                                    href="/music"
                                    selected={false}>
                                    <Flex paddingX="2" hide="s">{music.label}</Flex>
                                </ToggleButton>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
                <Flex fillWidth justifyContent="flex-end" alignItems="center">
                    <Flex
                        paddingRight="12"
                        justifyContent="flex-end" alignItems="center"
                        textVariant="body-default-s"
                        gap="20" hide="s">
                        <Flex hide="s">
                            { display.time && (
                                <TimeDisplay />
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}