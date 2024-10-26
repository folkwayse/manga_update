import axios from "axios";
import { checkSlugByTitle, getMangaBySlug } from "./fakomik/api";
import { getChapterContents, getChapters, getUpdates } from "./kiryu/api";

export const checkStatus = async () => {
  // check update
  const updateData = await getUpdates();

  console.log(updateData);
  //check slug dan chapternumber di db
  for (let i = 0; i < updateData.length; i++) {
    const slug = updateData[i].slug;

    console.log(slug);

    const chapterNumber = updateData[i].chapter_number;
    const manga = await getMangaBySlug(slug);

    if (!manga) {
      //   console.log("manga not found");
      continue;
    }
    // get last chapters of manga
    console.log(manga);
    const chapters = manga.chapter;
    const lastChapter = chapters[0];

    if (!lastChapter) {
      console.log(manga.title + "chapter belum ada isinya");
      console.log(slug);
      await addFirstChapter(manga.id, slug);
      continue;
    }

    if (chapterNumber == lastChapter.chapter_number) {
      //   console.log(slug + " : chapter already up to date");
    } else {
      // process updating chapter
      console.log("process : " + slug);

      await updateChapters(slug, lastChapter.chapter_number, manga.id);

      // post to new chapters
      //  const data =
      //  const response = await axios.post(
      //   `${process.env.API_URL}mangas/${manga.id}/newchapter`,
      //   data
      //  )

      //  console.log(response.data);
    }
  }
  // lakukan update chapters

  return true;
};

const getImageFromUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}images/uploadfromurl`,
      { url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.imageurl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
const retryGetImageFromUrl = async (image: string) => {
  let newImageUrl = null;
  let retryCount = 0;

  while (!newImageUrl) {
    newImageUrl = await getImageFromUrl(image);
    if (!newImageUrl) {
      // Tunggu selama 5 detik
      await new Promise((resolve) => setTimeout(resolve, 5000));
      retryCount++;
      if (retryCount > 10) {
        console.log("Gagal mendapatkan gambar dari URL: " + image);
        return false;
      }
    }
  }
  return newImageUrl;
};

const updateChapters = async (
  slug: string,
  lastChapter: number,
  mangaId: string
) => {
  try {
    const chapters = (await getChapters(slug)).reverse();
    // get index untuk memulai update
    const index = chapters.findIndex(
      (chapter) => chapter.chapterNumber == lastChapter
    );

    for (let i = index + 1; i < chapters.length; i++) {
      const chapter = chapters[i];
      const contents_sumber = await getChapterContents(chapter.slug);

      const name = contents_sumber.title;
      //check slug befor reupload the images
      const isSlugExists = await checkSlugByTitle(name);
      if (isSlugExists.exists === true) {
        console.log("slug already exists: " + name);
        continue;
      }

      // reupload images using promisess all

      // const newImageUrls: string[] = [];
      // for (const image of contents_sumber.imageUrls) {
      //   const newImageUrl = await retryGetImageFromUrl(image);

      //   if (newImageUrl) newImageUrls.push(newImageUrl);
      //   console.log(newImageUrl);
      // }
      // Tunggu semua promises selesai dan dapatkan URL gambar baru

      const reuploadPromises = contents_sumber.imageUrls.map((image) =>
        retryGetImageFromUrl(image)
      );
      const newImageUrls = await Promise.all(reuploadPromises);

      // Tambahkan URL gambar baru ke dalam konten
      const content = [];
      content.push(...newImageUrls);

      const chapter_number = chapter.chapterNumber;
      console.log(chapter_number);
      //   const newChapter = {
      //     name: name,
      //     chapter_number: chapter_number,
      //     content: content,
      //   };
      const response = await axios.post(
        `${process.env.API_URL}mangas/${mangaId}/newchapter`,
        {
          name: name,
          chapter_number: chapter_number,
          content: content,
        }
      );
    }
  } catch (error) {
    // console.log(error);
  }
};

const addFirstChapter = async (mangaId: string, slug: string) => {
  try {
    const _chaps = await getChapters(slug);
    console.log(_chaps);

    const chapters = (await getChapters(slug)).reverse();

    const chapter = chapters[0];
    const contents_sumber = await getChapterContents(chapter.slug);

    const name = contents_sumber.title;
    //check slug befor reupload the images
    // const isSlugExists = await checkSlugByTitle(name);

    // reupload images using promisess all

    const reuploadPromises = contents_sumber.imageUrls.map((image) =>
      retryGetImageFromUrl(image)
    );

    // Tunggu semua promises selesai dan dapatkan URL gambar baru
    const newImageUrls = await Promise.all(reuploadPromises);

    // Tambahkan URL gambar baru ke dalam konten
    const content = [];
    content.push(...newImageUrls);

    const chapter_number = chapter.chapterNumber;

    const response = await axios.post(
      `${process.env.API_URL}mangas/${mangaId}/newchapter`,
      {
        name: name,
        chapter_number: chapter_number,
        content: content,
      }
    );
  } catch (error) {
    // console.log(error);
  }
};
