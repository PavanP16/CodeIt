import React from "react";
import {Avatar, AvatarIcon} from "@nextui-org/react";

export default function Profile() {
  return (
    <div className="flex items-center">
      <Avatar
        icon={<AvatarIcon />}
        classNames={{
          base: "bg-gradient-to-br from- to-[#FF705B]",
          icon: "text-black/80",
        }}
      />
    </div>
  );
}