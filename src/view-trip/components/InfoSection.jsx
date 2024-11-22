import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
    trip && GetPlacePhoto();
  }, [trip]);

  return (
    <>
      <div>
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpeg"}
          className="h-[340px] w-full object-cover rounded-xl"
        />
        <div className="flex justify-between items-center">
          <div className="my-5 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">
              {trip?.userSelection?.location?.label}
            </h2>
            <div className="flex gap-5">
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
                📅&nbsp;&nbsp;
                {trip?.userSelection?.noOfDays} Days
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
                💰&nbsp;&nbsp;
                {trip?.userSelection?.budget} budget
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
                🥂 No. of traveller: {trip?.userSelection?.traveller} Person
              </h2>
            </div>
          </div>
          <Button>
            <IoIosSend />
          </Button>
        </div>
      </div>
    </>
  );
}

export default InfoSection;
