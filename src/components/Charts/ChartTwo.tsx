"use client"
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

// const getDateLabels = () => {
//   const labels = [];
//   const today = new Date();
//   for (let i = 6; i >= 0; i--) {
//     const day = new Date(today);
//     day.setDate(day.getDate() - i);
//     labels.push(day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })); // Format: 'Mar 10'
//   }
//   return labels;
// };

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    toolbar: {
      show: true,
      tools: {
        download: '<img src="/images/download.png" width="20">',
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        reset: false,
        pan: false
      }
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        if (isFinite(val)) {
          return Math.floor(val).toString();
        } else {
          return "100"; // or any other default value you prefer
        }
      },
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoProps {
  last7days: number[]
}
interface ChartTwoState {
  series: {
    name: string,
    data: number[]
  }[]
}

const ChartTwo: React.FC<ChartTwoProps> = ({ last7days = [] }) => {
  const [state, setState] = useState({
    series: [{ name: "Interactions", data: last7days }],
  });
  const [chartOptions, setChartOptions] = useState(options);
  const [sumOfLast7Days, setsum] = useState(0);

  const getDateLabels = () => {
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      labels.push(day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })); // Format: 'Mar 10'
    }
    return labels;
  };


  useEffect(() => {
    let data = {
      series: [
        {
          name: "Interactions",
          data: last7days
        }
      ]
    }
    const dateLabels = getDateLabels();

    const updatedOptions = {
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: dateLabels,
      },
    };

    // Update your state or a new state variable with the updated options
    setChartOptions(updatedOptions);
    setState(data)
    const sumOfLast7Days = last7days.reduce((acc, curr) => acc + curr, 0);
    setsum(sumOfLast7Days)


  }, []);

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;




  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Total Interaction
          </h4>
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            {sumOfLast7Days}
          </h1>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
