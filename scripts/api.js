// const API_BASE = "https://stocksapi-uhe1.onrender.com/api/stocks";

export const fetchChartData = async (companyName, time) => {
  let response = await fetch(
    "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata"
  );
  return response.json();
  // request
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //   let dataArray = data.stocksData[0];
  //   let timeObject = dataArray[companyName][time];
  //   let timestamp = timeObject.timeStamp;

  //   //  get date from timestamp
  //   for (let time of timestamp) {
  //     time = new Date(time * 1000).toLocaleDateString();
  //   }

  //   let values = timeObject.value;
  //   displayHelper(values, timestamp, companyName);
  //   })
  //   .catch((err) => {
  //     console.log("Error fetching Date " + err);
  //   });
};

export const fetchStockProfile = async (symbol) => {
  const response = await fetch(
    `https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata`
  );
  return response.json();
};

export const fetchStockSummary = async (symbol) => {
  const response = await fetch(
    `https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata`
  );
  return response.json();
};
