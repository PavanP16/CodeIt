import React from "react";
import {Chip} from "@nextui-org/react";

export default function Tag({value,size,color,variant}) {
  return (
    <Chip size={size} color={color} variant={variant}>{value}</Chip>
  );
}