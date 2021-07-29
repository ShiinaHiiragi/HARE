import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { PieChart, Pie, Sector, Cell } from "recharts";

const colors = {
  S: "rgb(255, 198, 88)",
  A: "rgb(164, 222, 108)",
  B: "rgb(130, 202, 157)",
  C: "rgb(131, 166, 237)",
  D: "rgb(136, 132, 216)",
  F: "rgb(255, 255, 255)"
}
const getRank = (value) =>
  value < 72
    ? "D"
    : value < 84
    ? "C"
    : value < 92
    ? "B"
    : value < 96
    ? "A"
    : value < 100
    ? "S"
    : "X";

export default function Accuracy(props) {
  const { value, key } = props;
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
      <PieChart width={144} height={144} key={key}>
        <Pie
          data={data}
          startAngle={90}
          endAngle={-270}
          innerRadius={60}
          outerRadius={72}
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
          style={{ fontSize: 72 }}
        >
          {getRank(value)}
        </Typography>
      </Box>
    </Box>
  );
}