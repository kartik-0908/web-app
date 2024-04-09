import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  colors: ["#FF4560", "#00E396", "#FEB019", "#775DD0", "#FF66C3", "#546E7A", "#D10CE8"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "scatter",
    height: 335,
    stacked: false,
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
    categories: ["Mon", "Tue", "Wed", "Th", "Fri", "Sat", "Sun"]
  },
  yaxis: {
    min: 0,
    max: 24,
    tickAmount: 6,
    labels: {
      formatter: function (val) {
        const hour = Math.floor(val);
        const minute = Math.round((val - hour) * 60);
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        return `${formattedHour}:${formattedMinute}`;
      },
    },
  },
  legend: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: any
  }[];
}

interface ScatterChartProps {
  currentWeekData: number[][][];
}




const ScatterChart: React.FC<ScatterChartProps> = ({ currentWeekData }) => {
  const [state, setState] = useState<ChartTwoState>({
    series: [],
  });

  useEffect(() => {
    const days = ["Mon", "Tue", "Wed", "Th", "Fri", "Sat", "Sun"];
    const series = currentWeekData.map((dayData, index) => {
      const data = dayData.length > 0
        ? dayData.map(([hour, minute]) => [index+1, hour + minute / 60]) :
        [[index+1, null]];

      return {
        name: days[index],
        data,
      };
    });
    setState({ series })
  }, [currentWeekData]);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Peak Interaction
          </h4>
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            4
          </h1>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="scatter"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ScatterChart;
