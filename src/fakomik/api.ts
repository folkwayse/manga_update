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

export const updateStatus = async (updateData: any[]) => {
  const options = {
    method: "POST",
    url: process.env.API_URL + "mangas/hasupdate",
    data: {
      updateData,
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

export const reupload = async (imgurl: string) => {
  const options = {
    method: "POST",
    url: process.env.API_URL + "images/uploadfromurl",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/9.1.1",
    },
    data: {
      url: imgurl,
    },
  };

  const response = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return response;
};

export const checkSlugByTitle = async (title: string) => {
  const options = {
    method: "POST",
    url: process.env.API_URL + "chapters/checkslug",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/9.2.0",
    },
    data: { title: title },
  };

  const response = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  return response;
};
