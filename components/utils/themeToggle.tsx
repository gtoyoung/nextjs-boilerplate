import {
  HStack,
  Switch,
  Text,
  useBoolean,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { toggleColorMode } = useColorMode();
  const [flag, setFlg] = useBoolean();

  useEffect(() => {
    var getTheme: string = localStorage.getItem("chakra-ui-color-mode");
    // 로컬스토리지에 저장된 테마가 없을 경우 초기 테마로 설정
    if (getTheme) {
      getTheme === "light" ? setFlg.off() : setFlg.on();
    }
  }, []);

  return (
    <HStack>
      <Text fontSize={{ base: "20px", md: "20px", lg: "30px" }}>⛅</Text>
      <Switch
        colorScheme={"red"}
        size="lg"
        isChecked={flag}
        onChange={() => {
          setFlg.toggle();
          toggleColorMode();
        }}
      />
      <Text fontSize={{ base: "20px", md: "20px", lg: "30px" }}>🌛</Text>
    </HStack>
  );
};
