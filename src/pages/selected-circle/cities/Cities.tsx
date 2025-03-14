import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/toolkit/store";
import { fetchCities } from "@/toolkit/common/city/citiesSlice";
import { MdEditSquare, MdWarning } from "react-icons/md";
import { City } from "@/models/API";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/Notification";
import {
  createCity,
  deleteCity,
  resetCityState,
  updateCity,
} from "@/toolkit/common/city/cityOperatationsSlice";
import { LuTrash2 } from "react-icons/lu";

export default function Cities() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCircle } = useSelector(
    (state: RootState) => state.dataHelper
  );
  useEffect(() => {
    dispatch(
      fetchCities({
        circleID: selectedCircle?.id!,
        circleDateOfCreation: selectedCircle?.dateOfCreation!,
      })
    );
  }, [selectedCircle, dispatch]);
  return <CitiesScreen />;
}

function CitiesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { cities, status } = useSelector((state: RootState) => state.cities);
  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, cities]);

  if (status === "success") {
    return (
      <>
        <div className="flex items-center flex-wrap mx-5 my-2 justify-between">
          <h2 className="text-xl my-2 sm:my-0 font-semibold tracking-tight">
            Cities({filteredCities.length})
          </h2>
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 flex items-center justify-between">
            <Input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mr-4"
            />
            <AddNewCity />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredCities.map((city) => (
            <Card key={city.id} className="p-4 border rounded-md relative">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]">
                  {city.name}
                </h3>
                <div className="flex items-center gap-2">
                  <UpdateCity city={city} />
                  <ShowAlert city={city} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  } else if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-card m-10">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Failed to Load Cities
        </h2>
        <p className="text-lg text-muted mb-2">
          An error occurred while loading the cities. Please try again.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            window.location.reload();
          }}
        >
          Retry
        </Button>
      </div>
    );
  }

  // Replace the empty loading return with:
  return (
    <div className="mx-5 my-2">
      {/* Header shimmer */}
      <div className="flex items-center flex-wrap justify-between mb-4">
        <div className="h-8 w-32 bg-muted animate-pulse rounded-md"></div>
        <div className="flex gap-4 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="h-10 w-full sm:w-64 bg-muted animate-pulse rounded-md"></div>
          <div className="h-10 w-24 bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>

      {/* Grid shimmer */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="p-4 border rounded-md bg-card">
            <div className="flex items-center justify-between">
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-muted animate-pulse rounded-md"></div>
                <div className="h-8 w-8 bg-muted animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowAlert({ city }: { city: City }) {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.cityOperations);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleShowDialog = () => {
    setShowDeleteDialog(true);
  };
  const confirmDeleteCity = () => {
    dispatch(deleteCity({ city: city }));
  };
  const cancelDeleteCity = () => {
    setShowDeleteDialog(false);
  };
  return (
    <AlertDialog open={showDeleteDialog}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={handleShowDialog}>
          <LuTrash2 className="text-red-500" size={18} />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <MdWarning className="text-red-600" />
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the city,
            and you won't be able to filter customers using this city {"-"}
            <span className="font-semibold"> {city.name}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {status === "deleting" ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <>
              <AlertDialogCancel onClick={cancelDeleteCity}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteCity}>
                Continue
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
const formSchema = z.object({
  cityName: z.string().min(2).max(30),
});

function AddNewCity() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add City</Button>
      </DialogTrigger>
      <ManageCityDialog />
    </Dialog>
  );
}

function UpdateCity({ city }: { city: City }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MdEditSquare size={18} />
          <span className="sr-only">Edit {city.name}</span>
        </Button>
      </DialogTrigger>
      <ManageCityDialog city={city} />
    </Dialog>
  );
}

function ManageCityDialog({ city }: { city?: City }) {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.cityOperations);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cityName: city?.name || "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { cityName } = values;
    const capitalize = (): string => {
      return cityName.charAt(0).toUpperCase() + cityName.slice(1);
    };
    // ✅ This will be type-safe and validated.
    if (city) {
      dispatch(updateCity({ oldCity: city, name: capitalize().trim() }));
    } else {
      dispatch(createCity({ name: capitalize().trim() }));
    }
  }
  return (
    <DialogContent className="sm:max-w-md">
      {status === "created" || status === "updated" ? (
        <SuccessNotification
          text="The city has been created successfully."
          onClose={() => {
            dispatch(resetCityState());
            form.reset();
          }}
        />
      ) : status === "failed" ? (
        <ErrorNotification
          text="An error occurred while creating the city."
          onClose={() => {
            dispatch(resetCityState());
            form.reset();
          }}
        />
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>{!city ? "Add New City" : "Update City"}</DialogTitle>
            <DialogDescription>
              {!city
                ? "Create a new city by filling out the form below."
                : "Update the city details by filling out the form below."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cityName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter City Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      {!city
                        ? "Enter the name of the city."
                        : "Update the city name."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                {status === "creating" || status === "updating" ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="px-3">
                    <span className="sr-only">Submit</span> Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </>
      )}
    </DialogContent>
  );
}
