"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition, createRef } from "react";
import { Flex, ToggleButton, IconButton } from "@/once-ui/components";
import { Weather } from "@/components";
import styles from "@/components/Header.module.scss";

import { routes, display } from "@/app/resources";
import { Locale, usePathname, useRouter, routing } from "@/i18n/routing";
import { renderContent } from "@/app/resources";
import { useTranslations } from "next-intl";
import { i18n } from "@/app/resources/config";

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [userLanguage, setUserLanguage] = useState<string | undefined>(
    undefined
  );
  const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserLanguage(navigator.language);
    }
  }, []);

  useEffect(() => {
    if (!userLanguage) return;

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

      const timeString = new Intl.DateTimeFormat(
        userLanguage,
        options
      ).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [userLanguage, deviceTimeZone]);

  return <>{currentTime}</>;
};

export const Header = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname() ?? "";
  const params = useParams();
  const [isLocaleMenuOpen, setLocaleMenuOpen] = useState(false);

  // Store dynamic refs for each locale
  const refs = useRef<Record<string, React.RefObject<HTMLButtonElement>>>(
    routing.locales.reduce((acc, locale) => {
      acc[locale] = createRef<HTMLButtonElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLButtonElement>>)
  );

  const localeMenuRef = useRef<HTMLDivElement>(null);
  const secondlocaleMenuRef = useRef<HTMLDivElement>(null);

  function handleLanguageChange(locale: string) {
    const nextLocale = locale as Locale;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        localeMenuRef.current &&
        !localeMenuRef.current.contains(event.target as Node) &&
        secondlocaleMenuRef.current &&
        !secondlocaleMenuRef.current.contains(event.target as Node)
      ) {
        setLocaleMenuOpen(false);
      }
    };
  
    if (isLocaleMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLocaleMenuOpen]);

  const t = useTranslations();
  const { person, home, about, blog, work, gallery, music } = renderContent(t);

  return (
    <>
      <Flex
        className={styles.mask}
        position="fixed"
        zIndex={9}
        fillWidth
        minHeight="80"
        justifyContent="center"
      ></Flex>
      <Flex
        style={{ height: "fit-content" }}
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        justifyContent="center"
      >
        <Flex
          paddingLeft="12"
          fillWidth
          alignItems="center"
          textVariant="body-default-s"
        >
          {display.location && (
            <Flex hide="s">
              <Weather />
            </Flex>
          )}
        </Flex>

        <Flex
          show="s"
          justifyContent="center"
          alignItems="center"
          style={{ position: "absolute", bottom: 50, maxWidth: "100%", zIndex: 10 }}
        >
          {i18n ? routing.locales.length > 1 && (
            <>
              {isLocaleMenuOpen && (
                <Flex
                  background="surface"
                  border="neutral-medium"
                  borderStyle="solid-1"
                  radius="m-4"
                  shadow="l"
                  padding="4"
                  gap="2"
                  justifyContent="center"
                  fillWidth
                  ref={localeMenuRef}
                >
                  {routing.locales.map((locale, index) => (
                      <ToggleButton
                        key={index}
                        selected={params?.locale === locale}
                        onClick={() => handleLanguageChange(locale)}
                        className={isPending ? "pointer-events-none opacity-60" : undefined}
                        ref={refs.current[locale]}
                      >
                        {locale.toUpperCase()}
                      </ToggleButton>
                  ))}
                </Flex>
              )}
            </>
          ): null}
        </Flex>

        <Flex fillWidth justifyContent="center">
          <Flex
            background="surface"
            border="neutral-medium"
            borderStyle="solid-1"
            radius="m-4"
            shadow="l"
            padding="4"
            justifyContent="center"
          >
            <Flex gap="4" textVariant="body-default-s">
              {routes["/"] && (
                <ToggleButton
                  prefixIcon="home"
                  href={`/${params?.locale}`}
                  selected={pathname === "/"}
                >
                  <Flex paddingX="2" hide="s">
                    {home.label}
                  </Flex>
                </ToggleButton>
              )}
              {routes["/about"] && (
                <ToggleButton
                  prefixIcon="person"
                  href={`/${params?.locale}/about`}
                  selected={pathname === "/about"}
                >
                  <Flex paddingX="2" hide="s">
                    {about.label}
                  </Flex>
                </ToggleButton>
              )}
              {routes["/blog"] && (
                <ToggleButton
                  prefixIcon="blog"
                  href={`/${params?.locale}/blog`}
                  selected={pathname.startsWith("/blog")}
                >
                  <Flex paddingX="2" hide="s">
                    {blog.label}
                  </Flex>
                </ToggleButton>
              )}
              {routes["/work"] && (
                <ToggleButton
                  prefixIcon="work"
                  href={`/${params?.locale}/work`}
                  selected={pathname.startsWith("/work")}
                >
                  <Flex paddingX="2" hide="s">
                    {work.label}
                  </Flex>
                </ToggleButton>
              )}
              {routes["/gallery"] && (
                <ToggleButton
                  prefixIcon="gallery"
                  href={`/${params?.locale}/gallery`}
                  selected={pathname.startsWith("/gallery")}
                >
                  <Flex paddingX="2" hide="s">
                    {gallery.label}
                  </Flex>
                </ToggleButton>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth justifyContent="flex-end" alignItems="center">
          <Flex
            paddingRight="12"
            justifyContent="flex-end"
            alignItems="center"
            textVariant="body-default-s"
            gap="20"
          >
            {i18n ? routing.locales.length > 1 && (
              <>
                {!isLocaleMenuOpen ? (
                  <IconButton
                    icon="lang"
                    variant="secondary"
                    size="s"
                    onClick={() => setLocaleMenuOpen(true)}
                    aria-label="Toggle Locale Menu"
                  />
                ) : null}
                {isLocaleMenuOpen && (
                  <Flex
                    background="surface"
                    border="neutral-medium"
                    borderStyle="solid-1"
                    radius="m-4"
                    shadow="l"
                    padding="4"
                    gap="2"
                    justifyContent="center"
                    fillWidth
                    hide="s"
                    ref={secondlocaleMenuRef}
                  >
                    {routing.locales.map((locale, index) => (
                        <ToggleButton
                          key={index}
                          selected={params?.locale === locale}
                          onClick={() => handleLanguageChange(locale)}
                          className={isPending ? "pointer-events-none opacity-60" : undefined}
                          ref={refs.current[locale]}
                        >
                          {locale.toUpperCase()}
                        </ToggleButton>
                    ))}
                  </Flex>
                )}
              </>
            ): null}
            <Flex hide="s">{display.time && <TimeDisplay />}</Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};