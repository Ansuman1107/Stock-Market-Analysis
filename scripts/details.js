import { fetchStockProfile, fetchStockSummary } from "./api.js";

export const renderDetails = async (symbol, data) => {
  const summaryList = await fetchStockSummary(symbol);

  document.getElementById("stock-name").textContent = `${symbol}`;
  document.getElementById(
    "stock-bookValue"
  ).textContent = `$${data.bookValue}%`;
  document.getElementById("stock-profit").textContent = `${data.profit}%`;
  document.getElementById("stock-profit").className =
    data.profit > 0 ? "positive" : "negative";
  document.getElementById(
    "stock-summary"
  ).textContent = `Summary: ${summaryList.stocksProfileData[0][symbol].summary}`;
};
