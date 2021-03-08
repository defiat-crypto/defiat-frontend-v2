import { useTheme } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

export const TokenomicsGraph = () => {
  const theme = useTheme();

  const pieData = () => {
    // var ctx = canvas.getContext("2d");

    // var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    // gradientStroke.addColorStop(0, '#80b6f4');
    // gradientStroke.addColorStop(1, '#FFFFFF');

    return {
      labels: [
        "Team",
        "Marketing",
        "Dev & Ops",
        "Treasury - Staking",
        "Treasury - Locked Liquidity",
        "Initial Circulating",
      ],
      datasets: [
        {
          data: [25, 50, 50, 50, 75, 250],
          borderColor: theme.palette.background.paper,
          backgroundColor: [
            "#8355ff",
            "#a99cff",
            "#4036aa",
            "#071834",
            "#221c57",
            "#0091f2",
          ],
        },
      ],
    };
  };

  const chartOptions = {
    legend: {
      display: false,
    },
  };

  return <Doughnut data={pieData} options={chartOptions} />;
};
