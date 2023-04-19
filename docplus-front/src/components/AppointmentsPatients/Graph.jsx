import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController, BarElement } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { COLORS } from "../../assets/css/Colors";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

export default function Graph({ name, labels, arrayData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
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

  return <BarResponsive options={options} data={data} />;
}

const BarResponsive = styled(Bar)`
  max-width: 100%;
`;
