import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import sideNavLinks from "@/constants/sideNavLinks";
import { ChevronDownIcon, SlashIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/toolkit/store";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Circle } from "@/models/API";
import { addSelectedCircleData } from "@/toolkit/helper/helperSlice";
import AnimatedBackground from "@/components/animated/animated-background";
import { useTheme } from "@/components/theme-provider";
import { Toggle } from "@/components/ui/toggle";
import { ArrowBigLeftDash, Home, Moon, PanelLeft, Sun } from "lucide-react";
// import CreateTestCustomer from "../temp/createTestCustomer";

export default function SelectedCircle() {
  // const dispatch = useDispatch();
  const { selectedCircle, circles } = useSelector(
    (state: RootState) => state.dataHelper
  );
  const location = useLocation();

  // Find the matching label for current path
  const getCurrentLabel = () => {
    const currentRoute = sideNavLinks.find((link) =>
      location.pathname.includes(link.to)
    );
    return currentRoute?.label || undefined;
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-card sm:flex">
        <TooltipProvider delayDuration={500}>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            <AnimatedBackground
              defaultValue={getCurrentLabel()}
              className="rounded-sm bg-muted-foreground/30 shadow-inner dark:bg-muted/60"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 1.0,
              }}
            >
              {sideNavLinks.map(({ label, to, icon: I }) => (
                <NavLink
                  data-id={label}
                  key={to}
                  to={to}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "text-white"
                      : isActive
                      ? "rounded-sm bg-muted-foreground/30 shadow-inner dark:bg-muted/60"
                      : "text-muted-foreground"
                  }
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex h-11 w-11 items-center justify-center transition-colors hover:text-foreground">
                        <I size={26} />
                        <span className="sr-only">{label}</span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right">{label}</TooltipContent>
                  </Tooltip>
                </NavLink>
              ))}
            </AnimatedBackground>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
            {/* <CreateTestCustomer /> */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className="group flex h-9 w-9 shrink-2 items-center justify-center text-primary border hover:bg-primary gap-2 rounded-lg text-lg font-semibold hover:text-primary-foreground md:text-base"
                >
                  <ArrowBigLeftDash
                    size={20}
                    className="transition-all group-hover:scale-125"
                  />
                  <span className="sr-only">CashFlow Inc</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-primary" side="right">
                {"Back To Home"}
              </TooltipContent>
            </Tooltip>
            <ThemeToggle />
          </nav>
        </TooltipProvider>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 flex h-14 items-center z-50 gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <ArrowBigLeftDash className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">CashFlow Inc</span>
                </Link>
                {sideNavLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.to}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-accent rounded-sm text-accent-foreground flex gap-2 items-center p-2"
                        : "text-muted-foreground flex gap-2 items-center p-2"
                    }
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb>
            <BreadcrumbList className="text-base tracking-wide">
              <BreadcrumbItem className="hidden sm:block">
                <BreadcrumbLink asChild>
                  <Link to="/">
                    <Home size={18} strokeWidth={2} aria-hidden="true" />
                    <span className="sr-only">All Circles</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden sm:block">
                <SlashIcon />
              </BreadcrumbSeparator>
              <CircleDropdown
                selectedCircle={selectedCircle!}
                circlesList={circles!}
              />
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <CustomBreadcrumbs />
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

// Memoize CustomBreadcrumbs component
const CustomBreadcrumbs = React.memo(function CustomBreadcrumbs() {
  const { pathname } = useLocation();
  function extractBreadcrumbName({ pathname }: { pathname: string }) {
    let str = pathname.split("-").pop() || "";
    let endpoint = str.endsWith("/") ? str.slice(0, -1) : str;

    return (
      (endpoint ?? "").slice(0, 1).toUpperCase() + (endpoint ?? "").slice(1)
    );
  }
  const pathIncludes = (path: string) => pathname.includes(path);
  switch (true) {
    case pathIncludes("selected-customer"):
      return (
        <>
          <BreadcrumbLink asChild>
            <Link to="/selected-circle/circle-Customers">Customers</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Selected Customer</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    case pathIncludes("bulk-posting"):
      return (
        <>
          <BreadcrumbLink asChild>
            <Link to="/selected-circle/circle-Customers">Customers</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Bulk Posting</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    case pathIncludes("history"):
      return (
        <>
          <BreadcrumbLink asChild>
            <Link to="/selected-circle/circle-dashboard">Dashboard</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>History</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    default:
      return (
        <BreadcrumbItem>
          <BreadcrumbPage>
            {pathname && extractBreadcrumbName({ pathname })}
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
  }
});

// Memoize CircleDropdown component
const CircleDropdown = React.memo(function CircleDropdown({
  selectedCircle,
  circlesList,
}: {
  selectedCircle: Circle;
  circlesList?: Circle[];
}) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  if (
    pathname.includes("/selected-circle/selected-customer") ||
    pathname.includes("/selected-circle/history") ||
    pathname.includes("/selected-circle/bulk-posting")
  ) {
    return (
      <BreadcrumbLink asChild className="hidden sm:inline-flex">
        <BreadcrumbEllipsis />
      </BreadcrumbLink>
    );
  } else {
    return (
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <span>{selectedCircle.circleName}</span>
            <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {circlesList?.map((circle, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={() => {
                  dispatch(addSelectedCircleData(circle));
                }}
              >
                {circle.circleName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
    );
  }
});

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <Toggle
        variant="outline"
        className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
        pressed={theme === "dark"}
        onPressedChange={() => {
          if (theme === "dark") {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
        <Moon
          size={16}
          strokeWidth={2}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <Sun
          size={16}
          strokeWidth={2}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}
