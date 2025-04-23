"use client";
import SearchBar from "@/components/SearchBar";

import hotelsData from "../../data.json";
import { useSearchParams } from "next/navigation";
import HotelCard from "@/components/HotelCard";

export default function Hotels() {
  const searchParams = useSearchParams();
  const destinationQuery = searchParams.get("destination")?.toLowerCase();

  const filteredHotels = destinationQuery
    ? hotelsData.filter((hotel) => {
        const name = hotel.name.toLowerCase();
        const city = hotel.city.toLowerCase();
        if (
          name.includes(destinationQuery) ||
          city.includes(destinationQuery)
        ) {
          return hotel;
        }
      })
    : hotelsData;

  return (
    <div className="items-center justify-items-center min-h-screen pb-20 p-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col sm:items-start max-w-7xl container gap-8">
        <SearchBar />
        <div className="flex flex-col gap-4  w-full">
          {filteredHotels.map((hotel) => {
            const { name, city, id, has_member_rate, daily_rate, image } =
              hotel;
            return (
              <HotelCard
                key={id}
                name={name}
                city={city}
                hasMemberRate={has_member_rate}
                dailyRate={daily_rate}
                id={id}
                image={image}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
