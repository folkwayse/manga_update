import axios from "axios";

export const getMangaBySlug = async (slug: string) => {
  const options = {
    method: "GET",
    url: process.env.API_URL + "mangas/getmanga/" + slug,
    headers: { "User-Agent": "insomnia/9.1.1" },
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

export const updateStatus = async (slugs: string[]) => {
  const options = {
    method: "POST",
    url: process.env.API_URL + "mangas/hasupdate" ,
    data: {
        slugs,
    },
    headers: { "User-Agent": "insomnia/9.1.1" },
  };
  const data = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return console.error(error);
    });
  return data;
};
