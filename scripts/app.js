import { renderChart } from "./chart.js";
import { renderStockList, createButton } from "./list.js";
import { fetchStockProfile } from "./api.js";
import { renderDetails } from "./details.js";

document.addEventListener("DOMContentLoaded", async () => {
  renderStockList();
  const profile = await fetchStockProfile("AAPL");
  const data = profile.stocksStatsData[0].AAPL;
  renderChart("AAPL"); // Default chart
  renderDetails("AAPL", data);
  createButton("1mo", "1 Month");
  createButton("3mo", "3 Month");
  createButton("1y", "1 Years");
  createButton("5y", "5 Years");
});
