import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { Handshake } from "lucide-react";

type Props = {
  name: string;
  city: string;
  dailyRate: number;
  hasMemberRate: boolean;
  image: string;
};

function HotelCard({ name, city, dailyRate, hasMemberRate, image }: Props) {
  const hotelRate = hasMemberRate
    ? Math.round(dailyRate - dailyRate * 0.1)
    : Math.round(dailyRate);
  return (
    <div className="hotel-card border-2 border-gray-300 bg-lighter-background flex gap-x-8 rounded-md p-4">
      <Image
        width={350}
        height={350}
        src={image}
        alt={name}
        className="rounded-md border-2 border-gray-300"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold">{name}</h3>
        <p className="text-lg">{city}</p>
      </div>
      <div className="flex flex-col justify-between ml-auto border-l-2 rounded-l-3xl p-4 pl-8">
        <div className="flex items-end gap-2">
          {hasMemberRate ? (
            <div>
              <div className="flex items-center gap-2">
                <Handshake className="text-orange-500" />
                <p className="text-xl font-fraunces font-bold text-orange-500">
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

        <Button className="bg-blue-500 p-8 !text-lg" size="lg">
          Find your room
        </Button>
      </div>
    </div>
  );
}

export default HotelCard;
