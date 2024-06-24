/* eslint-disable react/prop-types */
import React from "react";
import { CircularProgress } from "@nextui-org/react";

export default function Circular({ value, size, label }) {
  return (
    <CircularProgress
      size={size}
      color="success"
      minValue={0}
      maxValue={100}
      value={value}
      showValueLabel
      strokeWidth={3}
    />
  );
}
