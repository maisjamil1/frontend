import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/store/authStore";
import { NavLink } from "react-router-dom";
import { Button } from "./button";

const ProfileButton = () => {
  const { logout, isAuthenticated } = useAuthStore((state) => ({
    logout: state.logout,
    isAuthenticated: state.isAuthenticated,
  }));
  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="/img/shadcn.jpg" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <NavLink to="/login">
          <Button className="rounded-2 py-2" aria-label="login">
            Login or Register
          </Button>
        </NavLink>
      )}
    </>
  );
};

export default ProfileButton;
