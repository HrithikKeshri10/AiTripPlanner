import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  const days = Object.entries(trip?.tripData?.itinerary || {}).sort((a, b) => {
    const dayNumA = parseInt(a[0].replace(/\D/g, ""));
    const dayNumB = parseInt(b[0].replace(/\D/g, ""));
    return dayNumA - dayNumB;
  });
  return (
    <>
      <div>
        <h2 className="font-bold text-lg">Places To Visit</h2>
        <div>
          {days.map(([day, places]) => (
            <div key={day} className="mt-5">
              <h2 className="font-medium text-lg">{day}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {places.map((place) => (
                  <div key={place.placeName} className="my-3">
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlacesToVisit;
