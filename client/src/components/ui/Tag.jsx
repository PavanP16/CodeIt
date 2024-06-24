import React from "react";
import {Chip} from "@nextui-org/react";

export default function Tag({value,size}) {
  return (
    <Chip size={size}>{value}</Chip>
  );
}