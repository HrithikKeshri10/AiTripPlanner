import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  return (
    <>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" + place.placeName
        }
        target="_blank"
      >
        <div className="border rounded-xl p-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
          <img
            src={photoUrl ? photoUrl : "/placeholder.jpeg"}
            className="w-[130px] h-[130px] rounded-xl object-cover"
          />
          <div>
            <h2 className="font-bold text-lg">{place.placeName}</h2>
            <p className="text-sm text-gray-400">{place.placeDetails}</p>
            <p className="mt-2">🕙 {place.travelTime}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PlaceCardItem;
