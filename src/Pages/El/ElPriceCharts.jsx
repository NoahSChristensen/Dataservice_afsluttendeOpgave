import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ElPriceChart = ({ records }) => {
  // Sort records by time ascending
  const sorted = [...records.slice(0, 24)].sort(
    (a, b) => new Date(a.HourDK) - new Date(b.HourDK),
  );
  const labels = sorted.map((item) =>
    new Date(item.HourDK).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  );
  const prices = sorted.map((item) => item.SpotPriceDKK);

  const data = {
    labels,
    datasets: [
      {
        label: "Pris i DKK",
        data: prices,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.2,
      },
    ],
  };

  return (
    <section>
      <Line data={data} />
    </section>
  );
};

export default ElPriceChart;
