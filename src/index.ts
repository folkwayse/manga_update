import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';

import { getUpdates, getChapters } from './kiryu/api';
import { getMangaBySlug , updateStatus } from './fakomik/api';
dotenv.config();

const app = new Hono()

app.get('/', async (c) => {
  // const mangas = await getUpdates();

  // // get all slugs 
  // const slugs = mangas.new_chapter.map((manga) => {
  //   return manga.slug
  // })
  const updateData = await getUpdates();
  // console.log(updateData)
  const mang = await updateStatus(updateData)

  return c.json(mang);
})

app.get('/kiryu', async (c) => {
  const chapters = await getChapters('legendary-blacksmiths-vengeance');
  return c.json(chapters);
})

const port = parseInt(process.env.PORT || '3000', 10) || 3000;
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
