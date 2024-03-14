import { useTheme } from "../theme-provider";
import { NavLink } from "react-router-dom";
import Container from "../ui/container";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Menu from "@/assets/icons/menu";
import Sun from "@/assets/icons/sun";
import Moon from "@/assets/icons/moon";
import { ROUTES } from "@/constants/routes.ts";
import { FC } from "react";
import ProfileButton from "../ui/ProfileButton";
import logo from "@/assets/images/logo.png";

const Header: FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {ROUTES.map((route) => (
                    <NavLink
                      key={route.label}
                      to={route.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <NavLink to="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">
                <img width={"40"} src={logo}></img>
              </h1>
            </NavLink>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun
                className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                fill="#000"
              />
              <Moon
                className="absolute h-7 w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                fill="#fff"
              />
            </Button>
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
