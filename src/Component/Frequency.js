import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";

export default function Frequency(props) {
  const { data } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="far" fill="#8884d8" />
        <Bar dataKey="pure" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
