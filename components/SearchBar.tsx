"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Calendar, Search, Users } from "lucide-react";
import { Input } from "./ui/input";

import { useRouter } from "next/navigation";
import { addDays, format, parse } from "date-fns";
import useLocalStorage from "@/app/hooks/useLocalStorage";

type Props = {
  searchURL?: string;
};

type SearchData = {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfAdults: string;
  numberOfChildren: string;
};

function SearchBar({ searchURL = "hotels" }: Props) {
  const router = useRouter();

  const [searchData, setSearchData] = useLocalStorage<SearchData | string>(
    "searchData",
    ""
  );

  useEffect(() => {
    // In this useEffect hook,
    // 1. wait until the searchData is retrieved from local storage
    // 2. Initialize each state with values from local storage, if they exist
    // This allows the search bar data to persists across pages (and sessions)

    if (typeof searchData !== "string") {
      const {
        destination,
        checkInDate,
        checkOutDate,
        numberOfAdults,
        numberOfChildren,
      } = searchData;

      setDestination(destination);
      setCheckInDate(
        checkInDate ? parse(checkInDate, "yyyy-MM-dd", new Date()) : undefined
      );
      setCheckOutDate(
        checkOutDate ? parse(checkOutDate, "yyyy-MM-dd", new Date()) : undefined
      );
      setNumberOfAdults(parseInt(numberOfAdults));
      setNumberOfChildren(parseInt(numberOfChildren) ?? 0);
    }
  }, [searchData]);

  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  function submitQuery() {
    // If no destination is provided, don't submit the query
    // This would (ideally) also be handled by the form
    if (!destination || destination === "") {
      return;
    }

    const params = new URLSearchParams();

    // Construct a query parameters string
    // This will be used by the results page to find the right hotels

    params.set("destination", destination);

    if (checkInDate) {
      params.set("checkIn", format(checkInDate, "yyyy-MM-dd"));
    }
    if (checkOutDate) {
      params.set("checkOut", format(checkOutDate, "yyyy-MM-dd"));
    }
    if (numberOfAdults) {
      params.set("adults", numberOfAdults.toString());
    }
    if (numberOfChildren) {
      params.set("children", numberOfChildren.toString());
    }

    // Update the local storage
    setSearchData({
      destination,
      checkInDate: checkInDate ? format(checkInDate, "yyyy-MM-dd") : "",
      checkOutDate: checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : "",
      numberOfAdults: numberOfAdults ? numberOfAdults.toString() : "1",
      numberOfChildren: numberOfChildren ? numberOfChildren.toString() : "0",
    });

    // Navigate to the provided search URL, include the query parameters
    router.push(`${searchURL}?${params}`);
  }

  return (
    <div className="flex flex-col items-center bg-orange-500 p-1 gap-1 rounded-lg mb-8 w-full min-h-16 md:flex-row">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search hotels by city or name..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="h-14 pl-10 bg-white"
        />
      </div>
      <div className="flex items-center w-full md:w-[140px]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-14 justify-start text-left font-normal flex gap-2 w-full"
            >
              <Calendar className="h-4 w-4" />
              <span>
                {checkInDate ? format(checkInDate, "MMM do") : "Check-in"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkInDate}
              onSelect={setCheckInDate}
              initialFocus
              disabled={(date) => {
                const atLeastOneDayBeforeCheckOut =
                  checkOutDate && date > addDays(checkOutDate, -1);

                if (date < new Date() || atLeastOneDayBeforeCheckOut) {
                  return true;
                }
                return false;
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center space-x-2 w-full md:w-[140px]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-14 justify-start text-left font-normal flex gap-2 w-full"
            >
              <Calendar className="h-4 w-4" />
              <span>
                {checkOutDate ? format(checkOutDate, "MMM do") : "Check-out"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkOutDate}
              onSelect={setCheckOutDate}
              initialFocus
              disabled={(date) => {
                const atLeastOneDayAfterCheckIn =
                  checkInDate && date < addDays(checkInDate, 1);

                if (date < new Date() || atLeastOneDayAfterCheckIn) {
                  return true;
                }
                return false;
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-14 justify-start text-left font-normal flex gap-2 w-full md:w-max"
          >
            <Users className="h-4 w-4" /> {numberOfAdults}{" "}
            {numberOfAdults === 1 ? "Adult" : "Adults"}
            <Users className="h-4 w-4" /> {numberOfChildren} Children
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-y-2 justify-start items-start">
          <div className="flex items-center w-full">
            Adults
            <div className="flex items-center ml-auto gap-4">
              <Button onClick={() => setNumberOfAdults((prev) => prev + 1)}>
                +
              </Button>
              <span className="w-4 text-center">{numberOfAdults}</span>
              <Button
                onClick={() =>
                  setNumberOfAdults((prev) => {
                    if (prev <= 1) return prev;
                    return prev - 1;
                  })
                }
              >
                -
              </Button>
            </div>
          </div>
          <div className="flex items-center w-full">
            Children
            <div className="flex items-center ml-auto gap-4">
              <Button onClick={() => setNumberOfChildren((prev) => prev + 1)}>
                +
              </Button>
              <span className="w-4 text-center">{numberOfChildren}</span>
              <Button
                onClick={() =>
                  setNumberOfChildren((prev) => {
                    if (prev === 0) return prev;
                    return prev - 1;
                  })
                }
              >
                -
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="default"
        className="hover:!cursor-pointer !font-bold bg-blue-600 h-14 w-full md:w-1/12"
        onClick={() => submitQuery()}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
