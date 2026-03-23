import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Python 与自然语言处理",
    pageTitleSuffix: "课程系统",
    enableSPA: true,
    enablePopovers: true,
    locale: "zh-CN",
    baseUrl: "wallfacer-web.github.io/Python_NLP",
    ignorePatterns: ["private", "templates", ".obsidian", ".smart-env", "notebooklm-py"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Serif SC",
        body: "Noto Sans SC",
        code: "IBM Plex Mono"
      },
      colors: {
        lightMode: {
          light: "#f7f2e8",
          lightgray: "#ddd4c3",
          gray: "#a49a87",
          darkgray: "#4c463d",
          dark: "#1f1c19",
          secondary: "#0f6b6f",
          tertiary: "#d17b49",
          highlight: "rgba(209, 123, 73, 0.12)",
          textHighlight: "#fff1a8"
        },
        darkMode: {
          light: "#161514",
          lightgray: "#37322d",
          gray: "#6f675d",
          darkgray: "#ddd1bf",
          dark: "#f3ecdf",
          secondary: "#78c2c4",
          tertiary: "#f0a065",
          highlight: "rgba(240, 160, 101, 0.18)",
          textHighlight: "#8d6e00"
        }
      }
    }
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"]
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark"
        },
        keepBackground: false
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" })
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: false
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage()
    ]
  }
}

export default config
