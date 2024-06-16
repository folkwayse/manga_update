import { Hono } from "hono";
import {
  getManga,
  getChapters,
  getChapterContents,
  getMangaUpdate,
} from "../kiryu/api";

const kiryu = new Hono();

kiryu.get("/manga/:slug", async (c) => {
  const slug = c.req.param("slug");
  const chapters = await getManga(slug);
  return c.json(chapters);
});

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

kiryu.get("/mangalist", async (c) => {
  const page = parseInt(c.req.query("page") || "1", 10);
  const mangas = await getMangaUpdate(page);
  return c.json(mangas);
});

export default kiryu;
