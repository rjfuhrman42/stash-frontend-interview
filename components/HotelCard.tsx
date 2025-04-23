import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Handshake } from "lucide-react";
import Link from "next/link";

export type Hotel = {
  name: string;
  city: string;
  dailyRate: number;
  hasMemberRate: boolean;
  id: number;
  image: string;
};

function HotelCard({ name, city, dailyRate, hasMemberRate, id, image }: Hotel) {
  const hotelRate = hasMemberRate
    ? Math.round(dailyRate - dailyRate * 0.1)
    : Math.round(dailyRate);

  return (
    <div className="border-2 border-gray-300 bg-lighter-background flex flex-col gap-8 rounded-md p-4 md:flex-row">
      <div className="relative h-[250px] w-full md:w-1/4">
        <Image
          fill
          src={image}
          alt={name}
          className="rounded-md border-2 border-gray-300 object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold">{name}</h3>
        <p className="text-lg">{city}</p>
      </div>
      <div className="flex flex-col justify-between md:ml-auto md:border-l-2 gap-2 rounded-l-3xl py-4 md:pl-8">
        <div className="flex items-end gap-2">
          {hasMemberRate ? (
            <div>
              <div className="flex items-center gap-2">
                <Handshake className="text-orange-600" />
                <p className="text-xl font-fraunces font-bold text-orange-600">
                  Member&apos;s rate
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="line-through">${Math.round(dailyRate)}</p>
                <p className="text-2xl font-bold">${hotelRate}</p>
                <span>per night</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">${hotelRate}</p>
              <span>per night</span>
            </div>
          )}
        </div>

        <Button className="bg-blue-600 !font-bold !text-lg" size="lg" asChild>
          <Link className="p-8" href={`/hotels/${id.toString()}`}>
            Find your room
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HotelCard;
