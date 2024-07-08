/* eslint-disable react/prop-types */
import React from "react";
import {Chip} from "@nextui-org/react";

export default function Tag({value,size,color,variant}) {

  
  let co = "default" ;
  if(value === "Easy") {
    co = "success"
  }else if(value === "Hard"){
    co = "danger"
  }else if(value === "Medium"){
    co = "warning"
  }

  if(color) co = color

  return (
    <Chip size={size} color={co} variant={variant} className="">{value}</Chip>
  );
}