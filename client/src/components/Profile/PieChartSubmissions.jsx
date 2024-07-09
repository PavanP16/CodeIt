import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PieChartSubmissions = () => {

    const [numbers,setNumbers] = useState([]);

    useEffect(()=>{
        const getSubStats = async () => {
            try {
              const {data} = await axios.get(
                `${import.meta.env.VITE_SERVER_API}/api/v1/submissions/stats/`,
                {
                  withCredentials: true,
                }
              );
              setNumbers(data?.subs);
            } catch (error) {
              toast.error("Failed to fetch submissions");
              console.error("Failed to fetch submissions:", error);
            }
          };
      
          getSubStats();
    },[])

  return (
    <div className="w-full h-[60vh]">
      <ResponsivePie
        data={numbers}
        margin={{ top: 20, right: 120, bottom: 80, left: 150 }}
        startAngle={-51}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "set2" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["brighter", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        enableArcLinkLabels={false}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["brighter", 10]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 20,
            translateY: 60,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChartSubmissions;
