import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "appweb-trpr02-documentation",
  description: "A VitePress Site",
  base: "/tp2-documentation/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Views", link: "/views/home-view-doc" },
      { text: "Reviews", link: "/reviews/code-review1" },
    ],

    sidebar: {
      "/views/": [
        {
          text: "Views",
          items: [
            { text: "Home view ", link: "/views/home-view-doc" },
            { text: "Game view", link: "/views/game-view-doc" },
            { text: "Ranking view", link: "/views/ranking-view-doc" }
          ],
        },
      ],

      "/reviews/": [
        {
          text: "Reviews",
          items: [
            { text: "Séance 1", link: "/reviews/code-review1" },
            { text: "Séance 2", link: "/reviews/code-review2" },
            { text: "Séance 3", link: "/reviews/code-review3" },
            { text: "Séance 4", link: "/reviews/code-review4" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
