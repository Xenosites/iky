// CREDITS XEON

const axios = require("axios");
const cheerio = require("cheerio");

exports.Tiktok = async(query) => {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({ query })),
  });

  result = {};

  return result;
}
