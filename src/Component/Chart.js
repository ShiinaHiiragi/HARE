import React from "react";
import { useTheme } from '@material-ui/core/styles';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Page A", pv: 2400, amt: 2400 },
  { name: "Page B", pv: 1398, amt: 2210 },
  { name: "Page C", pv: 9800, amt: 2290 },
  { name: "Page D", pv: 3908, amt: 2000 },
  { name: "Page E", pv: 4800, amt: 2181 },
  { name: "Page F", pv: 3800, amt: 2500 },
  { name: "Page G", pv: 4300, amt: 2100 }
];

export default function Chart() {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
        <YAxis stroke={theme.palette.text.secondary} />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
