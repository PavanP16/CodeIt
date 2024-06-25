/* eslint-disable react/prop-types */
import {Code} from "@nextui-org/react";

export default function Snippet({value,size,color,variant}) {
  return (
    <Code size={size} color={color} variant={variant}>{value}</Code>
  );
}
