import { fetchChartData } from "./api.js";

export const renderChart = async (companyName, time = "1mo") => {
  let data = await fetchChartData(companyName);
  let dataArray = data.stocksData[0];
  let timeObject = dataArray[companyName][time];
  let timestamp = timeObject.timeStamp;
  console.log(timestamp);
  //  get date from timestamp
  // for(let i=0; i< timestamp.siz\\\)
  for (let time of timestamp) {
    time = new Date(time * 1000).toLocaleDateString();
    // console.log(time);
  }

  let values = timeObject.value;

  displayHelper(values, timestamp, companyName);
};
let currentChart = null;
let chartCanvas = document.querySelector("#chart");

export const displayHelper = (values, timestamp, companyName) => {
  if (currentChart) {
    currentChart.destroy();
  }

  currentChart = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: timestamp,
      datasets: [
        {
          label: "Company : " + companyName,
          data: values,
          borderWidth: 1,
          borderColor: "rgb(51, 216, 17)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          display: false,
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            title: (tooltipItems) => {
              let index = tooltipItems[0].dataIndex;
              let date = new Date(timestamp[index] * 1000); // Convert to date
              return date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
            },
            label: (tooltipItem) => {
              let value = tooltipItem.raw;
              return `Value: ${value.toFixed(2)}`;
            },
          },
        },
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "vertical",
              scaleID: "x",
              borderWidth: 1,
              borderColor: "white",
              value: timestamp[0],
              label: {
                content: "",
                enabled: true,
                position: "top",
              },
            },
          ],
        },
      },
      hover: {
        mode: "index",
        intersect: false,
      },
    },
  });

  //  used for mouse hover to show vertical line
  chartCanvas.addEventListener("mousemove", (e) => {
    let activePoints = currentChart.getElementsAtEventForMode(
      e,
      "index",
      { intersect: false },
      true
    );

    if (activePoints.length > 0) {
      let index = activePoints[0].index;
      let value = currentChart.data.datasets[0].data[index];
      let label = currentChart.scales["x"].getValueForPixel(e.x).toFixed(2);

      currentChart.options.plugins.annotation.annotations[0].value =
        timestamp[index];
      currentChart.options.plugins.annotation.annotations[0].label.content = `${label}: ${value.toFixed(
        2
      )}`;
      currentChart.update();
    }
  });
};
