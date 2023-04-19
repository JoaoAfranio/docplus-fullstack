import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { COLORS } from "../../assets/css/Colors";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphPie({ name, labels, arrayData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: name,
        data: arrayData,
        borderColor: [COLORS.BLUE, "#FF92A5"],
        backgroundColor: [COLORS.DARK_BLUE, "#FF3659"],
      },
    ],
  };

  return <PieResponsive data={data} labels={labels} options={options} />;
}

const PieResponsive = styled(Pie)`
  max-width: 100%;
  max-height: 100%;
`;
