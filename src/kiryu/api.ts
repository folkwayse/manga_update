import axios from "axios";



export const getUpdates = async () => {
    
  const options = {
    method: "GET",
    url: "http://45.76.148.33:8080/api/kiryuu/v6/summary",
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


export const getChapters = async (slug:string) => {
    
    const options = {
      method: "GET",
      url: "http://45.76.148.33:8080/api/kiryuu/v6/manga?id="+slug,
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
  