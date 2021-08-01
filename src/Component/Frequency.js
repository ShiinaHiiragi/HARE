import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend
} from "recharts";

export default function Frequency(props) {
  const { lang, data } = props;
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
        <YAxis stroke={theme.palette.text.secondary} />
        <Legend verticalAlign="top" />
        <Bar name={lang.panel.stat.barFar} dataKey="far" fill={theme.palette.primary.main} />
        <Bar name={lang.panel.stat.barPure} dataKey="pure" fill={theme.palette.primary.light} />
      </BarChart>
    </ResponsiveContainer>
  );
}
