import Image from "next/image";
import hotelsData from "../../../data.json";
import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";
import SearchBar from "@/components/SearchBar";

/**
    Hotel Microsite Page
 */

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Search for a hotel with a matching id
  // If none found, render "no results found" message
  const hotel = hotelsData.find((hotel) => hotel.id.toString() === id);

  if (hotel) {
    const hotelRate = hotel?.has_member_rate
      ? Math.round(hotel.daily_rate - hotel.daily_rate * 0.1)
      : Math.round(hotel.daily_rate);

    return (
      <div className="items-center justify-items-center min-h-screen py-8 font-[family-name:var(--font-geist-sans)] bg-white">
        <main className="flex flex-col sm:items-start max-w-7xl container">
          <SearchBar searchURL="/hotels" />
          <div className="w-full p-4 border-b-2">
            <h2 className="font-bold">{hotel.name}</h2>
            <p className="text-2xl">{hotel.city}</p>
          </div>

          <div className="flex flex-col w-full justify-between gap-4 flex-1 p-4 sm:flex-row">
            <Image
              height={600}
              width={600}
              alt={hotel.name}
              src={hotel.image}
            />

            <div className="flex justify-between  flex-col gap-4">
              <div className="flex items-end gap-2">
                {hotel.has_member_rate ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <Handshake className="text-orange-500" />
                      <p className="text-2xl font-fraunces font-bold text-orange-500">
                        Member&apos;s rate
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="line-through">
                        ${Math.round(hotel.daily_rate)}
                      </p>
                      <p className="text-3xl font-bold">${hotelRate}</p>
                      <span className="text-xl">per night</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">${hotelRate}</p>
                    <span>per night</span>
                  </div>
                )}
              </div>

              <Button
                className="bg-orange-600 p-8 !font-bold !text-lg"
                size="lg"
              >
                See rooms
              </Button>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <h3 className="text-4xl">Lorem ipsum</h3>
            <p className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </main>
      </div>
    );
  } else
    return (
      <div className="items-center justify-items-center min-h-screen pb-20 p-4 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col sm:items-start max-w-7xl container gap-8">
          <div className="flex flex-col gap-4 w-full">
            Whoops! Looks like theres no hotel with that id!
          </div>
        </main>
      </div>
    );
}
