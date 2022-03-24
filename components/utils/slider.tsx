import React, { useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { ImageProp } from "props/common";
import { OverlayModal } from "./overayModal";
// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  afterChange: null,
  // centerMode: true,
};

export const Carousel = ({
  imgList,
  callBackLoad,
}: {
  imgList: ImageProp[];
  callBackLoad: Function;
}) => {
  // 커스텀한 Button을 만들기위한 Slider 상태값 설정
  const [slider, setSlider] = useState<Slider>(null);
  const lastIndex = imgList?.length - 2;
  // 스크린 사이즈 변화에 맞춘 버튼의 위치 변화를 위한 브레이크포인트
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  // 다음 이미지를 가져올수 있는 포인트
  settings.afterChange = (index) => {
    // 보고있는 이미지가 변경되었을 경우 해당이미지로 셋팅
    setSelectedImage(imgList[index]);
    if (index === lastIndex) {
      callBackLoad();
    }
  };

  // 모달창 Props 셋팅
  const modalProps = useDisclosure();
  // 선택한 이미지
  const [selectedImage, setSelectedImage] = useState<ImageProp>(null);

  // TODO 처음이미지를 로드하기 위한 방법이 필요함(첫번째 index 이미지는 afterChange이벤트에 잡히지 않음)

  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="solid"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="solid"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {imgList &&
          imgList.map((card, index) => (
            <Box
              key={index}
              height={"6xl"}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${card.src})`}
            >
              {/* This is the block you need to change, to customize the caption */}
              <Container
                size="container.lg"
                height="600px"
                position="relative"
                onClick={() => {
                  modalProps.onOpen();
                }}
              >
                <Stack
                  spacing={6}
                  w={"full"}
                  maxW={"md"}
                  position="absolute"
                  top="50%"
                  transform="translate(0, -50%)"
                >
                  <Heading fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }}>
                    {card.title}
                  </Heading>
                  <Text
                    fontSize={{ base: "sm", md: "2xl", lg: "md" }}
                    color="Highlight"
                  >
                    {card.description}
                  </Text>
                </Stack>
              </Container>
            </Box>
          ))}
      </Slider>
      <OverlayModal props={modalProps} imgUrl={selectedImage?.src} />
    </Box>
  );
};
