import { Hono } from "hono";
import { getUpdates, getChapters, getChapterContents } from "../kiryu/api";

const kiryu = new Hono();

kiryu.get("/chapters/:slug", async (c) => {
  const slug = c.req.param("slug");
  const chapters = await getChapters(slug);
  return c.json(chapters);
});

kiryu.get("/chaptercontents/:slug", async (c) => {
    const slug = c.req.param("slug");
    const chapters = await getChapterContents(slug);
    return c.json(chapters);
  });
export default kiryu;
