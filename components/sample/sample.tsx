import { Flex, Text, VStack } from "@chakra-ui/react";
import { Carousel } from "components/utils/slider";
import { ImageProp } from "props/common";
import React, { useEffect, useState } from "react";
import { NasaPicture } from "services/sample.types";
import { SampleApi } from "services/sampleSvc";

const sampleApi = new SampleApi();

const Sample = ({ sample }: { sample: NasaPicture[] }) => {
  const [imgList, setImgeList] = useState(null as ImageProp[]);

  useEffect(() => {
    // 갤러리에 맞는 형식으로 변환
    var convertImgList = sample.map((item) => convertImageProps(item));
    setImgeList(convertImgList);
  }, []);

  // 이미지 타입으로 변환
  const convertImageProps = (picture: NasaPicture): ImageProp => {
    return {
      src: picture.url,
      description: picture.explanation,
      title: picture.title,
    };
  };

  // 이미지 추가 로드
  const getMorePicture = () => {
    sampleApi.getNasaPicture(10).then((res) => {
      var convertImgList = res.map((item) => convertImageProps(item));
      setImgeList((prev) => [...prev, ...convertImgList]);
    });
  };

  return (
    <VStack>
      <Flex align="center" justify="center">
        <VStack>
          <Text fontSize={{ base: "2xl", md: "3xl", lg: "56px" }}>
            Nasa Space Picture
          </Text>
        </VStack>
      </Flex>
      <Carousel imgList={imgList} callBackLoad={getMorePicture} />
    </VStack>
  );
};

export default Sample;
