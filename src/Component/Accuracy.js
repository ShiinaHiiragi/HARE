import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { PieChart, Pie, Cell } from "recharts";
import { getRank } from "../Interface/Constant";

const colors = {
  S: "rgb(130, 202, 157)",
  A: "rgb(141, 209, 225)",
  B: "rgb(131, 166, 237)",
  C: "rgb(71, 145, 219)",
  D: "rgb(136, 132, 216)",
  F: "rgb(240, 240, 240)"
}

export default function Accuracy(props) {
  const { value, times, anime } = props;
  const data = [
    { name: "D", value: Math.min(72, value) },
    { name: "C", value: Math.min(12, Math.max(0, value - 72)) },
    { name: "B", value: Math.min(8, Math.max(0, value - 84)) },
    { name: "A", value: Math.min(4, Math.max(0, value - 92)) },
    { name: "S", value: Math.min(4, Math.max(0, value - 96)) },
    { name: "F", value: 100 - value }
  ];

  return (
    <Box position="relative" display="inline-flex">
      <PieChart width={144} height={144} key={anime}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          innerRadius={60 * times}
          outerRadius={72 * times}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[entry.name]} />
          ))}
        </Pie>
      </PieChart>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="h2"
          component="div"
          color="textSecondary"
          style={{ fontSize: 72 * times }}
        >
          {getRank(value)}
        </Typography>
      </Box>
    </Box>
  );
}
