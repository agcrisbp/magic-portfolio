import React from "react";
import { Background, Flex, Text } from "@/once-ui/components";

interface InfoItem {
  label: string;
  value: string | string[];
}

interface ProjectInfoProps {
  items: InfoItem[];
}

export function ProjectInfo({ items }: ProjectInfoProps) {
  const renderValue = (value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.map((item, i) => (
        <Text
          key={i}
          marginBottom={i < value.length - 1 ? "xs" : "s"}
          variant="body-default-m"
          align="center"
          style={{ margin: 0 }}
        >
          {item}
        </Text>
      ));
    }
    return (
      <Text
        variant="body-default-m"
        align="center"
        style={{ margin: 0 }}
      >
        {value}
      </Text>
    );
  };

  return (
    <Flex
      fillWidth
      background="page"
      radius="m"
      marginY="24"
      position="relative"
      style={{ overflow: "hidden" }}
      maxWidth="xs"
    >
      <Background
        position="absolute"
        gradient={{
          colorEnd: 'static-transparent',
          colorStart: 'accent-background-strong',
          display: true,
          height: 100,
          opacity: 100,
          tilt: -5,
          width: 150,
          x: 50,
          y: 0
        }}
        mask={{
          x: 0,
          y: 0,
          radius: 100,
        }}
      />
      <Background
        position="absolute"
        mask={{
          x: 100,
          y: 100,
          radius: 100,
        }}
        grid={{
          color: 'neutral-alpha-weak',
          display: true,
          height: "2rem",
          opacity: 100,
          width: "2rem",
        }}
      />
      {items.map((item, index) => (
        <Flex
          position="relative"
          key={index}
          fillWidth
          direction="column"
          padding="m"
        >
          <Text
            marginBottom="s"
            variant="label-strong-s"
            onBackground="accent-weak"
            align="center"
          >
            {item.label}
          </Text>
          <Flex
            vertical="center"
            horizontal="center"
            direction="column"
            fill>
            {renderValue(item.value)}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
