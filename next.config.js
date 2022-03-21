/** @type {import('next').NextConfig} */
const withCss = require("@zeit/next-css"); //css, sass파일을 불러오기 위한 모듈
const withPlugins = require("next-compose-plugins"); // nextjs 의 여러 플러그인을 같이 사용할 수있게 사용하는 모듈
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin"); // typescript 파일 경로 단축을 위한 모듈 ex) .../component/test -> @/componenet/test 와같이 별칭을통한 경로단축
/*PWA를 제대로 적용하기 위한 참조 사이트: https://jcon.tistory.com/171 */
const withPWA = require("next-pwa"); // nextjs pwa 지원을 위한 모듈
const runtimeCaching = require("next-pwa/cache"); // nextjs pwa 캐쉬 처리를 위한 모듈(next-pwa에 같이 있다)
const withImages = require("next-images"); // root 폴더인 public에 정적 이미지를 간단하게 불러오기 위해 사용하는 모듈
const withTM = require("next-transpile-modules")(
  [], //특정 외부라이브러리
  { unstable_webpack5: true }
); //IE등과 같이 일부 브라우저에서 외부 라이브러리를 지원하지 않는경우에 크로스 브라우징 문제를 해결하기 위한 모듈

const nextConfig = {
  webpack: (config) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsConfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsConfigPathsPlugin()];
    }

    return config;
  },

  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
  },

  // staic html 페이지를 직접 경로 지정하여 표현할수있도록 설정
  rewrites: async () => {
    return [
      {
        source: "/:trees", //ex
        destination: "/trees/index.html", //ex
      },
    ];
  },
};
module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          runtimeCaching,
        },
      },
    ],
    // withCss,
    withImages,
    withTM,
  ],
  nextConfig
);
