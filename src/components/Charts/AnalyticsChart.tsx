import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

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
        pan: false,
      },
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
    type: 'datetime',
    labels: {
      format: 'MMM dd',
    },
    tickAmount: 12,
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return Math.floor(val).toString();
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
  data: number[];
  startTime: string;
  endTime: string;
}

const ChartTwo: React.FC<ChartTwoProps> = ({ data, startTime, endTime }) => {
  const [state, setState] = useState({
    series: [{ name: "Conversations", data: [] as { x: string; y: number }[] }],
  });

  useEffect(() => {
    if (data) {
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();
      const intervalDuration = (end - start) / 12;

      const intervals = Array.from({ length: 12 }, (_, i) => ({
        x: new Date(start + i * intervalDuration).toISOString(),
        y: 0,
      }));

      for (let i = 0; i < 12; i++) {
        const d = data[i];
        intervals[i].y = data[i]
      }
      console.log(data)
      console.log("above data below inetrvals")
      console.log(intervals)

      setState({
        series: [{ name: "Conversations", data: intervals }],
      });
    }
  }, [data, startTime, endTime]);

  return (
    <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Conversations Over Time
          </h4>
        </div>
      </div>
      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
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
