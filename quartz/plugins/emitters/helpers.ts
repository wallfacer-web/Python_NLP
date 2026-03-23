import path from "path"
import fs from "fs"
import { BuildCtx } from "../../util/ctx"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
import { Readable } from "stream"

type WriteOptions = {
  ctx: BuildCtx
  slug: FullSlug
  ext: `.${string}` | ""
  content: string | Buffer | Readable
}

export const write = async ({ ctx, slug, ext, content }: WriteOptions): Promise<FilePath> => {
  const shouldEmitDirectoryIndex =
    ext === ".html" && slug !== ("404" as FullSlug) && slug !== ("index" as FullSlug) && !slug.endsWith("/index")

  const pathToPage = (
    shouldEmitDirectoryIndex
      ? joinSegments(ctx.argv.output, slug, "index.html")
      : joinSegments(ctx.argv.output, slug + ext)
  ) as FilePath
  const dir = path.dirname(pathToPage)
  await fs.promises.mkdir(dir, { recursive: true })
  await fs.promises.writeFile(pathToPage, content)
  return pathToPage
}
