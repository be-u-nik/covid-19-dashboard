import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: {
      type: "time",
      time: {
        format: "MM/DD/YY",
        tooptipFormat: "ll",
      },
    },

    yAxes: {
      gridLines: {
        display: false,
      },
      ticks: {
        callback: function (value, index, values) {
          return numeral(value).format("0a");
        },
      },
    },
  },
};
function LineGraph({ caseType, countryCode = "all" }) {
  const getChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data && data[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }

    return chartData;
  };

  const [data, setdata] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=60`;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let chartdata =
            countryCode === "all"
              ? getChartData(data, caseType)
              : getChartData(data.timeline, caseType);
          console.log(data);
          setdata(chartdata);
        });
    };
    fetchData();
  }, [caseType, countryCode]);

  return (
    <div>
      {data?.length > 0 ? (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "#ff6666",
                borderColor: "#ff0000",
                data: data,
                fill: true,
              },
            ],
          }}
        ></Line>
      ) : (
        <span>
          {caseType} data for this region in the last 60 days is not available
        </span>
      )}
    </div>
  );
}

export default LineGraph;
