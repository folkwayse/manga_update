import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';

import { getUpdates, getChapters } from './kiryu/api';
import { getMangaBySlug , updateStatus } from './fakomik/api';
dotenv.config();

const app = new Hono()

app.get('/', async (c) => {
  const mangas = await getUpdates();

  // get all slugs 
  const slugs = mangas.new_chapter.map((manga) => {
    return manga.slug
  })
  console.log(slugs)
  const mang = await updateStatus(slugs)
  // for (const manga of mangas.new_chapter) {
   
  //   if (manga.slug) {
  //     const fakomikManga = await getMangaBySlug(manga.slug);
  //     if(!fakomikManga) {
  //       continue;
  //     }
  //     const kiryuManga = await getChapters(manga.slug);
  //     //find index of chapter
  //     const indx = kiryuManga.chapters.findIndex((chapter) => {
  //       return chapter.slug ===fakomikManga.chapter[0].slug.replace('-bahasa-indonesia','')
  //     })
      
  //     console.log(kiryuManga.chapters[indx-1]);
  //     await updateStatus(manga.slug);
      
  //   }

  // }
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
