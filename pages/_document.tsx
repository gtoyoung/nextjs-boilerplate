import { ColorModeScript } from "@chakra-ui/react";
import theme from "components/utils/theme";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>{/* 필요한 raw script 및 메타 정보 삽입 */}</Head>
        <body>
          {/* ColorModeScript가 제대로 동작하기 위해선 body 태그 내부의 콘텐츠 전에 색상모드 스크립트를 추가해야함 */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
