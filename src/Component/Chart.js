import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis
} from "recharts";

export default function Chart(props) {
  const { data } = props;
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
        <YAxis
          stroke={theme.palette.text.secondary}
          ticks={[0, 25, 50, 75, 100]}
        />
        <Line
          type="monotone"
          dataKey="acc"
          stroke={theme.palette.primary.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
