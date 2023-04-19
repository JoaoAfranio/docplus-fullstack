import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { COLORS } from "../../assets/css/Colors";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraphLine({ name, labels, arrayData }) {
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

  return <LineResponsive options={options} data={data} />;
}

const LineResponsive = styled(Line)`
  max-width: 100%;
`;
