"use client"
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";




interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

interface ChartOneProps {
  maxSumIndex: number;
  convArray: number[];
}


export const ChartOne: React.FC<ChartOneProps> = ({
  maxSumIndex,
  convArray
}) => {
  const [state, setState] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    const series = [
      {
        name: "Conversations",
        data: convArray,
      },
    ];
    setState({ series });
  }, [convArray]);

  const chartOptions: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

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
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: Array.from({ length: 12 }, (_, i) => {
        const hour = (maxSumIndex + i) % 12;
        return `${hour.toString().padStart(2, "0")}:00`;
      }),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 100,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-7.5">
            {/* <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span> */}
            <div>
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Peak Interaction Time
              </h4>
              <h1 className="text-3xl font-semibold text-black dark:text-white">
                4
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
}

