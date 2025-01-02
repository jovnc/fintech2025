"use server";

export async function getXrpPrice() {
  try {
    const url =
      "https://pro-api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=sgd";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": process.env.COIN_GECKO_API_KEY as string,
      },
    };

    const data = await fetch(url, options);
    const response = await data.json();
    return response.ripple.sgd;
  } catch (error) {
    return 0;
  }
}
