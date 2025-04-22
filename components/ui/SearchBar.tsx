"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar as CalendarComponent } from "./calendar";
import { Calendar, Search, Users } from "lucide-react";
import { Input } from "./input";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  function submitQuery() {
    const query = {
      cityOrHotel: searchQuery,
      checkInDate,
      checkOutDate,
      numberOfAdults,
      numberOfChildren,
    };
    console.log(query);
  }

  return (
    <div className="py-6 rounded-lg mb-8 w-full">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search hotels by city or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 "
          />
        </div>

        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal flex gap-2 w-[140px]"
              >
                <Calendar className="h-4 w-4" />
                <span>
                  {checkInDate ? checkInDate.toLocaleDateString() : "Check-in"}
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

        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal flex gap-2 w-[140px]"
              >
                <Calendar className="h-4 w-4" />
                <span>
                  {checkOutDate
                    ? checkOutDate.toLocaleDateString()
                    : "Check-out"}
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
              className="justify-start text-left font-normal flex gap-2 w-[140px]"
            >
              <Users className="h-4 w-4" /> {numberOfAdults}{" "}
              {numberOfAdults === 1 ? "Adult" : "Adults"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex justify-evenly items-center">
            Adults
            <Button onClick={() => setNumberOfAdults((prev) => prev + 1)}>
              +
            </Button>
            <span>{numberOfAdults}</span>
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
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal flex gap-2 w-[140px]"
            >
              <Users className="h-4 w-4" /> {numberOfChildren} Children
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex justify-evenly items-center">
            Children
            <Button onClick={() => setNumberOfChildren((prev) => prev + 1)}>
              +
            </Button>
            <span>{numberOfChildren}</span>
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
          </PopoverContent>
        </Popover>

        <Button
          variant="default"
          className="md:col-span-5 mt-2 md:mt-4"
          onClick={() => submitQuery()}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
