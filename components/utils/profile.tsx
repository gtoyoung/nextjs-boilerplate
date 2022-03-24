import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Flex,
  Text,
  useColorModeValue,
  Image,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseAuth from "services/firebase/auth";
import firebaseDb from "services/firebase/database";

const Profile = ({ user }: { user: User }) => {
  const [profileImg, setProfileImg] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (user) {
      firebaseDb.getProfileImg(user.uid).then((img) => {
        setProfileImg(img ? img : user.photoURL);
      });
    }
  });
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"sm"} src={profileImg} />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <Box
          maxW={"270px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          {user ? (
            <>
              <Image
                h={"120px"}
                w={"full"}
                src={
                  "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                }
                objectFit={"cover"}
              />
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  size={"xl"}
                  src={profileImg}
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    {user.displayName}
                  </Heading>
                  <Text color={"gray.500"}>개발자</Text>
                </Stack>

                {/* <Stack direction={"row"} justify={"center"} spacing={6}>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </Stack>
                </Stack> */}

                <MenuDivider />
                <MenuItem
                  bgColor={"rebeccapurple"}
                  onClick={() => {
                    firebaseAuth.logout();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </MenuItem>
              </Box>
            </>
          ) : (
            <>
              <MenuItem
                bgColor={"blueviolet"}
                autoFocus
                onClick={() => firebaseAuth.login("google")}
              >
                Login
              </MenuItem>
            </>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
};

export default Profile;
