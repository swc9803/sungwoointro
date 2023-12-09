export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/css/main.scss", "~/assets/css/swiper.scss"],
  app: {
    head: {
      title: "New Sungwoo portfolio",
      meta: [
        {
          name: "New Sungwoo portfolio",
          content: "New Sungwoo portfolio",
        },
        {
          hid: "description",
          name: "description",
          content: "New Sungwoo portfolio",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "New Sungwoo portfolio",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "New Sungwoo portfolio",
        },
      ],
    },
  },
  devtools: {
    enabled: false,
  },
});
