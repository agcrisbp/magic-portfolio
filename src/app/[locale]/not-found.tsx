'use client';

import { Flex, Heading, Text, Button } from "@/once-ui/components";
import { useTranslations } from 'next-intl';

export default function NotFound() {
    const t = useTranslations();
    
    return (
        <Flex
            as="section"
            direction="column"
            alignItems="center">
            <Text
                marginBottom="s"
                variant="display-strong-xl">
                404
            </Text>
            <Heading
                marginBottom="l"
                variant="display-strong-xs">
                Page Not Found
            </Heading>
            <Text
                onBackground="neutral-weak">
                Halaman yang kamu cari tidak ada.
            </Text>
            <Button
                label={t("button.back")}
                style={{ marginTop: '32px' }}
                variant="tertiary"
                size="s"
                prefixIcon="chevronLeft"
                onClick={() => window.history.back()} />
        </Flex>
    );
}