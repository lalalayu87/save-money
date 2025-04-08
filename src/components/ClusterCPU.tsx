"use client";

import React from "react";
import Chart from "react-apexcharts";

export default function ClusterCPU() {
  const usage = 54;
  const requests = 834;
  const limit = 1282;
  const totalCores = 1585;

  const chartOptions = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -120,
        endAngle: 120,
        track: {
          background: "#2f3240",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: { show: false },
          value: { show: false },
        },
      },
    },
    colors: ["#38d9a9", "#339af0", "#b197fc"],
    labels: ["Usage", "Requests", "Limit"],
  };

  const chartSeries = [usage, requests, limit];

  return (
    <div className="bg-[#1a1d26] text-white p-4 rounded-xl w-[300px] shadow-lg">
      <h2 className="text-md font-semibold mb-2">CLUSTER CPU</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="radialBar"
        height={250}
      />
      <div className="text-center -mt-16 mb-4 text-2xl font-bold">
        {totalCores} <span className="text-sm">Cores</span>
      </div>
      <div className="flex justify-around text-sm mb-4">
        <div>
          <div className="text-[#38d9a9] font-bold mt-6">{usage}</div>
          <div className="text-gray-400">Usage</div>
        </div>
        <div>
          <div className="text-[#339af0] font-bold mt-6">{requests}</div>
          <div className="text-gray-400">Requests</div>
        </div>
        <div>
          <div className="text-[#b197fc] font-bold mt-6">{limit}</div>
          <div className="text-gray-400">Limit</div>
        </div>
      </div>
      <div className="flex justify-around text-xs border-t border-gray-600 pt-2">
        <div className="text-center">
          <div className="text-lg font-semibold">91</div>
          <div className="text-gray-400">전체 가상 머신</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">87</div>
          <div className="text-gray-400">가동 중 가상 머신</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">4</div>
          <div className="text-gray-400">중지 가상 머신</div>
        </div>
      </div>
    </div>
  );
}
