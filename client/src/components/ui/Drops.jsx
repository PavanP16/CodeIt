import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../ContextAPI/AuthContext";

export default function App() {
  const navigate = useNavigate();
  const { logoutUser } = useGlobalContext();

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Avatar as="button" className="transition-transform w-12 h-12" />
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem
          key="profile"
          className="py-4"
          onClick={() => navigate("profile/user")}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key="settings"
          className="py-4"
          color="danger"
          onClick={() => {
            logoutUser();
            navigate("/");
          }}
        >
          <p>LogOut</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
