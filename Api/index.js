const axios = require("axios");

const server = process.env.NODE_ENV === "production" ? "/" : "/";

// hit the internal backend to this project at "/"

export async function updateSkus(query) {
  const answer = await axios({
    url: server + endUrl,
    method: "post",
    data: {
      query: query,
    },
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return answer;
}

export async function querySkus(endUrl, query) {
  const answer = await axios({
    url: server + endUrl,
    method: "get",
    data: {
      query: query,
  
    },
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return answer;
}
export async function getProducts() {
  const products = await axios({
    method: "get",
    url: server,
  })
    .then((res) => {
      console.log("res".res)
      return res;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return products;
}
