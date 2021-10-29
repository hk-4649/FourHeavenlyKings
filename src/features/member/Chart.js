import React from "react";
import { Radar } from "react-chartjs-2";
import styles from "./member.module.css";

export const Chart = (props) => {
  const data = {
    // x 軸のラベル
    labels: [
      "破壊力",
      "スピード",
      "射程距離",
      "持続力",
      "精密動作性",
      "成長性",
    ],
    datasets: [
      {
        label: "Dataset",
        // データの値
        data: props.data,
        // グラフの背景色
        backgroundColor: "rgba(255, 205, 86, 0.2)",
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
        // 最小値・最大値
        min: 0,
        max: 5,
        stepSize: 1,
        // グリッドライン
        grid: {
          color: "lightseagreen",
        },
        // アングルライン
        angleLines: {
          color: "lightseagreen",
        },
        // ポイントラベル
        pointLabels: {
          color: "whitesmoke",
          backdropPadding: 5,
          padding: 10,
        },
      },
    },
  };
  return (
    <div className={styles.chart}>
      <Radar data={data} options={options} />
    </div>
  );
};
