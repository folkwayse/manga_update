import axios from "axios";
import { JSDOM } from 'jsdom';

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
    const listupdElements = document.querySelectorAll('.listupd');
    let updateData:any[] = [];
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
        const bsx = listupdElement.querySelectorAll(".bsx")
        for(const bsxElement of bsx){
            const href = bsxElement.querySelector('a[href*="kiryuu.id/manga/"]')?.href
            const chapters = bsxElement.querySelector('.epxs')?.textContent
            const slug = href?.split("/")[ href?.split("/").length - 2 ]
            const chapter_number =  parseInt(chapters.replace("Chapter", ""))
            updateData.push({slug,chapter_number});
        }
    }
    console.log(updateData);
  return updateData;
};

export const getChapters = async (slug: string) => {
  const options = {
    method: "GET",
    url: "http://45.76.148.33:8080/api/kiryuu/v6/manga?id=" + slug,
    params: { "": "" },
    headers: {
      "User-Agent": "user-agent: Dart/2.8 (dart:io)",
      "Accept-Encoding": "gzip",
      "Content-Type": "application/json",
    },
  };

  const data = axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  return data;
};
