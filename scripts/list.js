import { fetchStockProfile } from "./api.js";
import { renderChart } from "./chart.js";
import { renderDetails } from "./details.js";

let currentStock;

export const renderStockList = async () => {
  const stocks = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "PYPL",
    "TSLA",
    "JPM",
    "NVDA",
    "NFLX",
    "DIS",
  ];

  const listContainer = document.getElementById("stock-list");
  listContainer.innerHTML = "";
  for (const symbol of stocks) {
    const profile = await fetchStockProfile(symbol);
    const data = profile.stocksStatsData[0][symbol];
    const listItem = document.createElement("li");
    listItem.textContent = `${symbol}    $${data.bookValue.toFixed(
      3
    )}    ${data.profit.toFixed(2)}%`;
    listItem.classList.add(data.profit > 0 ? "positive" : "negative");

    listItem.addEventListener("click", () => {
      renderChart(symbol);

      renderDetails(symbol, data);
    });

    currentStock = symbol;
    // document.querySelectorAll("#chart-controls button").forEach((button) => {
    //   button.addEventListener("click", (event) => {
    //     const range = event.target.getAttribute("data-range");
    //     let flag = true;
    //     if (flag) renderChart(currentStock, range);
    //     flag = false;
    //   });
    // });

    listContainer.appendChild(listItem);
  }
};

const timeLineButtonDiv = document.getElementById("chart-controls");
export const createButton = async (value, text) => {
  let btn = document.createElement("button");
  btn.id = "data-range";
  btn.value = value;
  btn.textContent = text;

  btn.addEventListener("click", (event) => {
    const range = event.target.getAttribute("data-range");
    renderChart(currentStock, event.value);
  });

  timeLineButtonDiv.appendChild(btn);
};
