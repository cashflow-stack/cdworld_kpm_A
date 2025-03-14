import { LuSearch } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import { useEffect, memo, useState, useCallback } from "react";
import { fetchCircles } from "./state/circlesSlice";
import { Circle, Weekday } from "@/models/API";
import { Spotlight } from "@/components/animated/spotlight";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Badge } from "@/components/ui/badge";
import CirclesPageEmpty from "./widgets/CirclePageEmpty";
import CirclesPageLoading from "./widgets/CirclePageLoading";
import CreateNewCircle from "./widgets/CreateNewCircle";
import { addSelectedCircleData } from "@/toolkit/helper/helperSlice";
import { useTranslation } from "react-i18next";
import { formatDateToYYYYMMDD } from "@/toolkit/helper/helperFunctions";
import { circleLockOperation } from "./state/circleOperationSlice";

function Circles() {
  const { member, admin } = useSelector(
    (state: RootState) => state.dataHelper,
    shallowEqual
  );
  const dispatch = useDispatch<AppDispatch>();
  const fetchAdminCircles = useCallback(() => {
    if (member) {
      dispatch(
        fetchCircles({
          adminId: member.id,
          adminEmailId: member.name,
          member: true,
        })
      );
    }
    if (admin) {
      dispatch(
        fetchCircles({
          adminId: admin.id,
          adminEmailId: admin.emailId,
          member: false,
        })
      );
    }
  }, [dispatch, member, admin]);

  useEffect(() => {
    fetchAdminCircles();
  }, [fetchAdminCircles]);

  return <CirclesPage />;
}

export default Circles;

const CirclesPage = memo(() => {
  const { t } = useTranslation();
  const { circles, status } = useSelector((state: RootState) => state.circles, shallowEqual);
  const [search, setSearch] = useState<string>("");
  if (status === "success") {
    return (
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between w-full gap-2 h-8 md:px-6">
          <div className="text-foreground text-xl font-semibold">
            {t("circle.circles")}({circles.length})
          </div>
          <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto hidden sm:inline">
              <div className="relative">
                <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground" />
                <Input
                  type="search"
                  placeholder={t("circle.searchCircles") as string}
                  className="pl-8 md:w-[200px] lg:w-[300px]"
                  onChange={(e) => {
                    setSearch(e.target.value.toLocaleLowerCase());
                  }}
                />
              </div>
            </form>
            <CreateNewCircle />
          </div>
        </div>
        <form className="m-auto pt-5 w-full sm:flex-initial sm:hidden">
          <div className="relative">
            <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground" />
            <Input
              type="search"
              placeholder={t("circle.searchCircles") as string}
              className="pl-8"
              onChange={(e) => {
                setSearch(e.target.value.toLocaleLowerCase());
              }}
            />
          </div>
        </form>
        <main className="flex flex-1 flex-col gap-4 pt-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {circles
              .filter((item) => {
                return search === ""
                  ? item
                  : item.circleName.toLowerCase().includes(search);
              })
              .map((circle) => (
                <CircleCard key={circle.id} circle={circle} />
              ))}
          </div>
        </main>
      </div>
    );
  }
  if (status === "empty") {
    return <CirclesPageEmpty />;
  }
  if (status === "failed") {
    return <div>Error: {status}</div>;
  }
  return <CirclesPageLoading />;
});

type CircleCardProps = {
  circle: Circle;
};

function CircleBadge({ circle }: CircleCardProps) {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  let showbadge =
    dayName ===
    `${circle.day.charAt(0).toUpperCase()}${circle.day.slice(1).toLowerCase()}`;
  let isNewCircle = circle.dateOfCreation === formatDateToYYYYMMDD(today);

  return (
    <>
      {isNewCircle ? (
        <Badge className="hover:cursor-pointer absolute bottom-2 right-2 text-xs rounded-md">
          New
        </Badge>
      ) : (
        showbadge && (
          <Badge className="hover:cursor-pointer absolute bottom-2 right-2 text-xs rounded-md">
            Today
          </Badge>
        )
      )}
    </>
  );
}

function CircleCard({ circle }: CircleCardProps) {
  const { t } = useTranslation();
  const day = `${circle.day.toLowerCase()}`;
  const name = circle.circleName;
  const type =
    circle.day === Weekday.DAILY
      ? t("finance.daily")
      : circle.day === Weekday.MONTHLY
      ? t("finance.monthly")
      : t("finance.weekly");
  const circleName = circle.circleName;
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectCircle = useCallback(() => {
    dispatch(addSelectedCircleData(circle));
  }, [dispatch, circle]);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="relative shadow-lg aspect-auto overflow-hidden rounded-xl bg-zinc-300/10 p-[2px] dark:bg-zinc-700/10">
        <Link
          to="/selected-circle/circle-dashboard"
          onClick={handleSelectCircle}
        >
          <Spotlight
            className="from-violet-600 via-violet-400 to-pink-300 blur-3xl dark:from-pink-200 dark:via-violet-300 dark:to-violet-400"
            size={100}
          />
          <Card className="relative border-0 shadow-none">
            <CircleBadge circle={circle} />
            {/* {showbadge && <Badge className="hover:cursor-pointer absolute bottom-2 right-2 text-xs rounded-md">Today</Badge>} */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base text-muted-foreground">
                {/* {circle.isLocked ? "🔒" : "🔓"}&nbsp; */}
                {t(`weekdays.${day}`)}
              </CardTitle>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="font-cinzel font-bold ">{`${circleName[0].toUpperCase()}${circleName[1].toLowerCase()}`}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                {name.length > 15
                  ? `${name[0].toUpperCase()}${name.substring(1, 15)}...`
                  : `${name[0].toUpperCase()}${name.substring(1)}`}
              </div>
              <p className="text-xs text-muted-foreground pt-1">{type}</p>
            </CardContent>
          </Card>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          disabled
          onClick={() => {
            dispatch(circleLockOperation({ circle, lock: !circle.isLocked }));
          }}
        >
          {circle.isLocked ? "Unlock" : "Lock"} circle
        </ContextMenuItem>
        <ContextMenuItem
          disabled
          onClick={() => {
            console.log("Update circle");
          }}
        >
          Update circle
        </ContextMenuItem>
        <ContextMenuItem
          disabled
          onClick={() => {
            console.log("Delete circle");
          }}
        >
          Delete circle
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}