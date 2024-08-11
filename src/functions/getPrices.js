import axios from "axios";

export const getPrices = (id, days, priceType, setError) => {
  const prices = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
    .then((response) => {
      if (response.data) {
        if (priceType == "market_caps") {
          return response.data.market_caps;
        } else if (priceType == "total_volumes") {
          return response.data.total_volumes;
        } else {
          return response.data.prices;
        }
      }
    })
    .catch((e) => {
      console.log(e.message);
      if (setError) {
        setError(true);
      }
    });

  return prices;
};


export const getPricesfor1day = (id, day1,day2, priceType, setError) => {
  const prices = axios
    .get(
      `https://pro-api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${day1}&to=${day2}&interval=hourly&precision=2`
    )
    .then((response) => {
      if (response.data) {
        if (priceType == "market_caps") {
          return response.data.market_caps;
        } else if (priceType == "total_volumes") {
          return response.data.total_volumes;
        } else {
          return response.data.prices;
        }
      }
    })
    .catch((e) => {
      console.log(e.message);
      if (setError) {
        setError(true);
      }
    });

  return prices;
};