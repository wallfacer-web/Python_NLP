import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/wallfacer-web/Python_NLP",
      课程总导航: "https://wallfacer-web.github.io/Python_NLP/00-MOC-%E8%AF%BE%E7%A8%8B%E6%80%BB%E5%AF%BC%E8%88%AA",
      工作台总览: "https://wallfacer-web.github.io/Python_NLP/%E5%B7%A5%E4%BD%9C%E5%8F%B0%E6%80%BB%E8%A7%88%EF%BC%88%E7%BD%91%E9%A1%B5%E7%89%88%EF%BC%89"
    }
  })
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index"
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList()
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() }
      ]
    }),
    Component.Explorer()
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks()
  ]
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() }
      ]
    }),
    Component.Explorer()
  ],
  right: []
}
