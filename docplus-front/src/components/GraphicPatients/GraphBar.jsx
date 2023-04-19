import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { COLORS } from "../../assets/css/Colors";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraphBar({ name, labels, arrayData }) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: name,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: name,
        data: arrayData,
        borderColor: COLORS.BLUE,
        backgroundColor: COLORS.DARK_BLUE,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
