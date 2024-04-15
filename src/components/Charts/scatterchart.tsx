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
  grid:{
    xaxis:{
      lines:{
        show: true
      }
    }
  },
  xaxis: {
    type: 'datetime', // This ensures that each x-value is treated as a discrete category
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

function getWeekTimestamps() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const monday = new Date(now);
  monday.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  monday.setHours(0, 0, 0, 0);

  const timestamps = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date("14 Apr 2024");
    date.setDate(monday.getDate() + i);
    const timestamp = date.getTime();
    timestamps.push(timestamp);
  }

  return timestamps;
}




const ScatterChart: React.FC<ScatterChartProps> = ({ currentWeekData }) => {
  const [state, setState] = useState<ChartTwoState>({
    series: [],
  });
  const unixTimestamp = getWeekTimestamps();
  function convert_data(currentWeekData: any){
    let series = [];
    for(let i=0;i<7;i++){
      let len = currentWeekData[i].length;
      if(len>0){
        for(let j=0;j<len;j++){
          let hour = currentWeekData[i][j][0]
          let minute = currentWeekData[i][j][1]
          let timestamp = unixTimestamp[i] + (6 * 60 ) * 60 * 1000;
          series.push([timestamp,hour + minute/60]);
        }
      }
      else {
        series.push([unixTimestamp[i],null])
      }
    }
    return series
  }

  useEffect(() => {
   
    const series = [{
      name: 'Time',
      data: convert_data(currentWeekData)
    }];
console.log(series)
    if (JSON.stringify(series) !== JSON.stringify(state.series)) {
      setState({ series });
    }
  }, []);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Peak Interaction Time
          </h4>
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
