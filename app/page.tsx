import Link from "next/link";
import hotelsData from "../data.json";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  /**
   * Groups hotel data by city.
   * @param {Array} hotels - Array of hotel objects from data.json
   * @returns {Object} Object with city names as keys and arrays of hotels as values
   */
  function groupHotelsByCity(hotels) {
    // Create an object to hold hotels grouped by city
    const groupedHotels = {};

    // Group hotels by city
    hotels.forEach((hotel) => {
      const { city } = hotel;

      // If this city doesn't exist in our grouping yet, initialize an array for it
      if (!groupedHotels[city]) {
        groupedHotels[city] = [];
      }

      // Add the hotel to its city's array
      groupedHotels[city].push(hotel);
    });

    // Get all city names and sort them alphabetically
    const sortedCities = Object.keys(groupedHotels).sort();

    // Create a new object with cities in alphabetical order
    const sortedGroupedHotels = {};
    sortedCities.forEach((city) => {
      sortedGroupedHotels[city] = groupedHotels[city];
    });

    return sortedGroupedHotels;
  }

  const hotelsByCity = groupHotelsByCity(hotelsData);

  return (
    <div className="items-center justify-items-center min-h-screen pb-20 p-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col sm:items-start max-w-7xl container gap-8">
        <SearchBar searchURL="hotels" />
        <ul className="grid auto-cols-min gap-4 md:grid-cols-3 lg:grid-cols-4 ">
          {Object.keys(hotelsByCity).map((city) => {
            return (
              <li key={city}>
                <h3 className="font-bold text-2xl">{city}</h3>
                <ul className="flex flex-col">
                  {hotelsByCity[city].map((hotel) => {
                    return (
                      <li key={hotel.id}>
                        <Link
                          href={`/hotels/${hotel.id}`}
                          className="text-blue-900 hover:underline"
                        >
                          {hotel.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
