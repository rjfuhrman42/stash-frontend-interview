"use client";
import SearchBar from "@/components/ui/SearchBar";
import Link from "next/link";
import hotelsData from "../../data.json";
import { useSearchParams } from "next/navigation";

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
      <header className="container">
        <Link href="/">back to index page!</Link>
        <h1 className="text-4xl pb-24 pt-4">
          The best hotels are independent hotels.
        </h1>
      </header>
      <main className="flex flex-col sm:items-start container gap-8">
        <SearchBar />
        <div>
          {filteredHotels.map((hotel) => {
            return <p key={hotel.id}>{hotel.name}</p>;
          })}
        </div>
      </main>
    </div>
  );
}
