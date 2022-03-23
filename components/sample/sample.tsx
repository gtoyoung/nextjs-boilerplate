import { Divider, Flex, Image, Text, VStack } from "@chakra-ui/react";
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
            <>
              {/* <AspectRatio ratio={1}> */}
              <Image
                key={index}
                src={item.url}
                alt={item.title}
                objectFit={"cover"}
              />
              {/* </AspectRatio> */}
              <Divider orientation="horizontal" />
            </>
          );
        })}
      </VStack>
    </Flex>
  );
};

export default Sample;
