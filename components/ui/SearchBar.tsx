"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar as CalendarComponent } from "./calendar";
import { Calendar, Search, Users } from "lucide-react";
import { Input } from "./input";

import { useRouter, useSearchParams } from "next/navigation";
import { format, parse } from "date-fns";

type Props = {
  searchURL?: string;
};

function SearchBar({ searchURL = "hotels" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state by checking the query parameters in the current URL
  // Search bar component on a different page will persist state by using the query parameters
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(() => {
    const date = searchParams.get("checkIn");
    return date ? parse(date, "yyyy-MM-dd", new Date()) : undefined;
  });
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() => {
    const date = searchParams.get("checkOut");
    return date ? parse(date, "yyyy-MM-dd", new Date()) : undefined;
  });
  const [numberOfAdults, setNumberOfAdults] = useState(() => {
    const adults = searchParams.get("adults");
    return adults ? parseInt(adults) : 1;
  });
  const [numberOfChildren, setNumberOfChildren] = useState(() => {
    const children = searchParams.get("children");
    return children ? parseInt(children) : 0;
  });

  function submitQuery() {
    if (!destination || destination === "") {
      return;
    }

    const params = new URLSearchParams();
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
              disabled={(date) => date < new Date()}
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
              disabled={(date) => date < (checkInDate || new Date())}
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
        className="hover:!cursor-pointer bg-blue-500 h-14 w-full md:w-1/12"
        onClick={() => submitQuery()}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
