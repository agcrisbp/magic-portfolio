'use client';

import { Button, Column, Heading, Text } from "@/once-ui/components";

export default function NotFound() {
  return (
    <Column as="section" horizontal="center">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-strong-xs">
        Page Not Found
      </Heading>
      <Text onBackground="neutral-weak">Halaman yang kamu cari tidak ada.</Text>
      <Button
        label="Kembali"
        style={{ marginTop: '32px' }}
        variant="tertiary"
        size="s"
        prefixIcon="chevronLeft"
        onClick={() => window.history.back()} 
      />
    </Column>
  );
}
