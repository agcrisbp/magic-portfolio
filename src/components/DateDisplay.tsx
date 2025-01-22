// components/DateDisplay.tsx
'use client';

import { formatDate } from '@/app/utils/formatDate';
import { Text, Flex, Icon } from '@/once-ui/components';

interface DateDisplayProps {
  date: string;
  isUpdated?: boolean;
}

export default function DateDisplay({ date, isUpdated }: DateDisplayProps) {
  const formattedDate = formatDate(date);

  return (
    <Flex alignItems="center" gap="2">
      {isUpdated && (
        <Icon name="infoCircle" tooltip="Tanggal diperbarui." size="xs" onBackground="neutral-weak" />
      )}
      <Text variant="body-default-s" onBackground="neutral-weak">
        {formattedDate}
      </Text>
    </Flex>
  );
}