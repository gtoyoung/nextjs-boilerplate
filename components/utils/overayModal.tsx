import {
  AspectRatio,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseDisclosureProps,
} from "@chakra-ui/react";

export const OverlayModal = ({
  props,
  imgUrl,
}: {
  props: UseDisclosureProps;
  imgUrl: string;
}) => {
  const { isOpen, onOpen, onClose } = props;

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
        }}
      >
        Use Overlay one
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
            <AspectRatio ratio={16 / 9}>
              <Image src={imgUrl} />
            </AspectRatio>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
