import axios from "axios";
import { JSDOM } from "jsdom";

export const getUpdates = async () => {
  //   const options = {
  //     method: "GET",
  //     url: "http://45.76.148.33:8080/api/kiryuu/v6/summary",
  //     params: { "": "" },
  //     headers: {
  //       "User-Agent": "user-agent: Dart/2.8 (dart:io)",
  //       "Accept-Encoding": "gzip",
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const data = axios
  //     .request(options)
  //     .then(function (response) {
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  //   return data;

  const options = {
    method: "GET",
    url: "https://kiryuu.id/manga/",
    params: { status: "", type: "", order: "update" },
    headers: { "User-Agent": "insomnia/9.2.0" },
  };

  const data = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  const dom = new JSDOM(data);
  const document = dom.window.document;
  // Select elements with class "listupd"
  const listupdElements = document.querySelectorAll(".listupd");
  let updateData: any[] = [];
  // listupdElements.forEach((listupdElement:any) => {
  //   // Find links within these elements
  //   listupdElement.querySelectorAll('a[href*="kiryuu.id/manga/"]').forEach((element) => {
  //     const href = element.href.split("/")
  //     console.log(href[ href.length - 2 ])
  //     slugs.push(href[ href.length - 2 ])
  //   });
  // });
  for (const listupdElement of listupdElements) {
    //add href and chapters number
    const bsx = listupdElement.querySelectorAll(".bsx");
    for (const bsxElement of bsx) {
      const href = bsxElement.querySelector(
        'a[href*="kiryuu.id/manga/"]'
      )?.href;
      const chapters = bsxElement.querySelector(".epxs")?.textContent;
      const slug = href?.split("/")[href?.split("/").length - 2];
      const chapter_number = parseFloat(chapters.replace("Chapter", ""));
      updateData.push({ slug, chapter_number });
    }
  }
  // console.log(updateData);
  return updateData;
};


export const getMangaUpdate = async ( page: number = 1) => {
  //   const options = {
  //     method: "GET",
  //     url: "http://45.76.148.33:8080/api/kiryuu/v6/summary",
  //     params: { "": "" },
  //     headers: {
  //       "User-Agent": "user-agent: Dart/2.8 (dart:io)",
  //       "Accept-Encoding": "gzip",
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const data = axios
  //     .request(options)
  //     .then(function (response) {
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  //   return data;

  const options = {
    method: "GET",
    url: "https://kiryuu.id/manga/",
    params: { page: page, status: "", type: "", order: "update" },
    headers: { "User-Agent": "insomnia/9.2.0" },
  };

  const data = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  const dom = new JSDOM(data);
  const document = dom.window.document;
  // Select elements with class "listupd"
  const listupdElements = document.querySelectorAll(".listupd");
  let updateData: any[] = [];
  // listupdElements.forEach((listupdElement:any) => {
  //   // Find links within these elements
  //   listupdElement.querySelectorAll('a[href*="kiryuu.id/manga/"]').forEach((element) => {
  //     const href = element.href.split("/")
  //     console.log(href[ href.length - 2 ])
  //     slugs.push(href[ href.length - 2 ])
  //   });
  // });
  for (const listupdElement of listupdElements) {
    //add href and chapters number
    const bsx = listupdElement.querySelectorAll(".bsx");
    for (const bsxElement of bsx) {
      const href = bsxElement.querySelector(
        'a[href*="kiryuu.id/manga/"]'
      )?.href;
      const chapters = bsxElement.querySelector(".epxs")?.textContent;
      const slug = href?.split("/")[href?.split("/").length - 2];
      const chapter_number = parseFloat(chapters.replace("Chapter", ""));
      const judul = bsxElement.querySelector("div.tt")?.textContent.trim();
      const poster = bsxElement.querySelector("img")?.getAttribute("src");
      updateData.push({ slug, chapter_number, judul, poster });
    }
  }
  // console.log(updateData);
  return updateData;
};
export const getChapters = async (slug: string) => {
  // const options = {
  //   method: "GET",
  //   url: "http://45.76.148.33:8080/api/kiryuu/v6/manga?id=" + slug,
  //   params: { "": "" },
  //   headers: {
  //     "User-Agent": "user-agent: Dart/2.8 (dart:io)",
  //     "Accept-Encoding": "gzip",
  //     "Content-Type": "application/json",
  //   },
  // };
  const options = {
    method: "GET",
    url: "https://kiryuu.id/manga/" + slug + "/",
    params: { "": "" },
    headers: {
      "User-Agent": "insomnia/9.2.0",
      "Accept-Encoding": "gzip",
    },
  };

  const data = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error("error");
    });
  const dom = new JSDOM(data);
  const document = dom.window.document;
  // Select elements with class "listupd"
  const chapters: any[] = [];
  const listElements = document.querySelectorAll(".clstyle > li");

  // Iterate over each list element
  listElements.forEach((element: any) => {
    // Get the URL from the anchor tag
    const url = element.querySelector('a[href*="kiryuu.id/"]')?.href;
    const slug = url?.split("/")[url?.split("/").length - 2];
    // Get the chapter number and remove the "Chapter " prefix
    const chapterNumber = parseFloat(
      element.querySelector(".chapternum")?.textContent?.replace("Chapter ", "")
    );

    // Log the URL and chapter number
    chapters.push({ slug, chapterNumber });
  });
  return chapters;
};
export const getManga = async (slug: string) => {
  // const options = {
  //   method: "GET",
  //   url: "http://45.76.148.33:8080/api/kiryuu/v6/manga?id=" + slug,
  //   params: { "": "" },
  //   headers: {
  //     "User-Agent": "user-agent: Dart/2.8 (dart:io)",
  //     "Accept-Encoding": "gzip",
  //     "Content-Type": "application/json",
  //   },
  // };
  const options = {
    method: "GET",
    url: "https://kiryuu.id/manga/" + slug + "/",
    params: { "": "" },
    headers: {
      "User-Agent": "insomnia/9.2.0",
      "Accept-Encoding": "gzip",
    },
  };

  const data = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error("error");
    });
  const dom = new JSDOM(data);
  const document = dom.window.document;
  const title =
    document
      .querySelector(".entry-title")
      ?.textContent?.replace(" Bahasa Indonesia", "")
      .trim() || "";
  const altTitle =
    document.querySelector(".seriestualt")?.textContent.trim() || "";
  const poster = document.querySelector(".thumb > img")?.src;
  const synopsis =
    document.querySelector(".entry-content-single")?.textContent.trim() ?? "";
  const rows = document.querySelectorAll("table.infotable tbody tr");
  const rating: number = parseFloat(
    document.querySelector(".num")?.textContent.trim() || "0"
  );
  // genres
  const genres: string[] = [];
  const genresSelector = document.querySelectorAll(".seriestugenre > a");
  for (let i = 0; i < genresSelector.length; i++) {
    genres.push(genresSelector[i].textContent.trim());
  }
  
  const info = {};

  // Memproses setiap baris dan menambahkannya ke objek hasil
  rows.forEach((row: any) => {
    const cells = row.querySelectorAll("td");
    if (cells.length === 2) {
      const key = cells[0].textContent
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
      const value = cells[1].textContent.trim();
      info[key] = value;
    }
  });

  return {
    title,
    altTitle,
    poster,
    synopsis,
    rating,
    genres,
    ...info,
  };
};

export const getChapterContents = async (slug: string) => {
  const options = {
    method: "GET",
    url: `https://kiryuu.id/${slug}/`,
    params: { "": "" },
    headers: {
      "User-Agent": "insomnia/9.2.0",
      "Accept-Encoding": "gzip",
    },
  };

  const data = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error("error");
    });
  const dom = new JSDOM(data);
  const document = dom.window.document;
  // Select elements with class "listupd"
  const title = document.querySelector(".entry-title")?.textContent;
  const imageElements = document.querySelectorAll("#readerarea img");

  // Create an array to hold the URLs
  const imageUrls: string[] = [];

  // Iterate over each img element and push the src to the array
  imageElements.forEach((img: any) => {
    imageUrls.push(img.src);
  });

  // Log the array of image URLs
  // console.log(title, imageUrls);
  return {
    title,
    imageUrls,
  };
};
