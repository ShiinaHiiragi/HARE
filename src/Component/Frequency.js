import React from "react";
import { PanelContext } from "../Page/Panel";
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
  const { data } = props;
  const theme = useTheme();
  const context = React.useContext(PanelContext);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
        <YAxis stroke={theme.palette.text.secondary} />
        <Legend verticalAlign="top" />
        <Bar name={context.lang.panel.stat.barFar} dataKey="far" fill={theme.palette.primary.main} />
        <Bar name={context.lang.panel.stat.barPure} dataKey="pure" fill={theme.palette.primary.light} />
      </BarChart>
    </ResponsiveContainer>
  );
}
