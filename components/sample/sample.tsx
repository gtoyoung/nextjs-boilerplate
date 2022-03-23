import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { NasaPicture } from "services/sample.types";

const Sample = ({ sample }: { sample: NasaPicture[] }) => {
  return (
    <Flex align="center" justify="center">
      <VStack>
        <Text fontSize={{ base: "2xl", md: "3xl", lg: "56px" }}>
          This is responsive text
        </Text>
        {sample.map((item, index) => {
          return (
            <AspectRatio key={index} maxW={400} ratio={4 / 3}>
              <Image src={item.url} alt={item.title} objectFit={"cover"} />
            </AspectRatio>
          );
        })}
      </VStack>
    </Flex>
  );
};

export default Sample;
