import { Link, NavLink, Outlet } from "react-router";
import { MdMenu } from "react-icons/md";
import mainMenuLinks from "@/constants/mainMenuLinks";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "aws-amplify/auth";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/theme-provider";

export default function Home({ name }: { name: string }) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Store the language in local storage
  };
  const userName = name.length > 15 ? name.slice(0, 15) + "..." : name;
  const { setTheme } = useTheme();
  return (
    <>
      <Card className="sticky z-50 top-0 flex h-16 items-center gap-4 px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo />
            <span className="sr-only">Cashflow Inc</span>
          </Link>
          {mainMenuLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "text-foreground transition-colors underline underline-offset-8 font-bold"
                  : "text-muted-foreground transition-colors"
              }
            >
              {t(`mainMenuLinks.${label}`)}
            </NavLink>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center gap-2 shrink-0 md:hidden">
              <Button variant="outline" size="icon">
                <MdMenu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
              <span>Cashflow Inc</span>
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 pt-5 text-lg font-medium">
              {mainMenuLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-foreground transition-colors underline underline-offset-8 font-bold"
                      : "text-muted-foreground transition-colors"
                  }
                >
                  <SheetClose>
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </SheetClose>
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className=" ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="font-cinzel font-extrabold text-lg">{`${userName
                    .slice(0, 10)
                    .charAt(0)
                    .toLocaleUpperCase()}`}</AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium max-w-[20ch] truncate">
                  {userName}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem disabled>
                <Link to={""}>{t("profileMenu.profile")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Link to={""}>{t("profileMenu.settings")}</Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {t("profileMenu.language")}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => changeLanguage("en")}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("te")}>
                      తెలుగు
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>हिन्दी</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {t("profileMenu.style")}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={async () => signOut()}>
                <Link to={""}>{t("profileMenu.logout")}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ">
        <Outlet />
      </main>
    </>
  );
}
