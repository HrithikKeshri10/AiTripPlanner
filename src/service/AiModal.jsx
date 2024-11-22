import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'I cannot directly access and display images or real-time pricing for hotels.  Hotel prices fluctuate constantly.  Also, I don\'t have access to a comprehensive image database.  Therefore, I\'ll provide the JSON structure with placeholders where image URLs and pricing would go. You\'ll need to use a search engine (like Google) and booking sites (like Expedia, Booking.com, Kayak) to find the current pricing, images, and ratings.\n\n```json\n{\n  "trip": {\n    "location": "Las Vegas, NV",\n    "duration": "3 Days",\n    "budget": "Cheap",\n    "travelers": "Couple"\n  },\n  "hotels": [\n    {\n      "hotelName": "Hotel Name 1",\n      "hotelAddress": "Address 1, Las Vegas, NV",\n      "price": { "range": "$$$", "note": "Check booking sites for current prices" },\n      "hotelImageUrl": "URL_PLACEHOLDER_1", \n      "geoCoordinates": { "lat": 36.1699, "lng": -115.1398 },\n      "rating": 3.5,\n      "description": "Description of Hotel 1"\n    },\n    {\n      "hotelName": "Hotel Name 2",\n      "hotelAddress": "Address 2, Las Vegas, NV",\n      "price": { "range": "$$", "note": "Check booking sites for current prices" },\n      "hotelImageUrl": "URL_PLACEHOLDER_2", \n      "geoCoordinates": { "lat": 36.1711, "lng": -115.1404 },\n      "rating": 4.0,\n      "description": "Description of Hotel 2"\n    },\n    {\n      "hotelName": "Hotel Name 3",\n      "hotelAddress": "Address 3, Las Vegas, NV",\n      "price": { "range": "$", "note": "Check booking sites for current prices" },\n      "hotelImageUrl": "URL_PLACEHOLDER_3", \n      "geoCoordinates": { "lat": 36.1699, "lng": -115.1398 },\n      "rating": 3.0,\n      "description": "Description of Hotel 3"\n    }\n\n\n  ],\n  "itinerary": {\n    "day1": [\n      {\n        "placeName": "Strip Walk",\n        "placeDetails": "Walk the Las Vegas Strip, see the sights",\n        "placeImageUrl": "URL_PLACEHOLDER_4",\n        "geoCoordinates": { "lat": 36.1146, "lng": -115.1728 },\n        "ticketPricing": "Free",\n        "travelTime": "Variable, depends on how far you walk"\n      },\n      {\n        "placeName": "Free Fountain Show at Bellagio",\n        "placeDetails": "Enjoy the Bellagio Fountains",\n        "placeImageUrl": "URL_PLACEHOLDER_5",\n        "geoCoordinates": { "lat": 36.1137, "lng": -115.1740 },\n        "ticketPricing": "Free",\n        "travelTime": "Short walk from previous location"\n      },\n      {\n        "placeName": "In-N-Out Burger (Cheap Eats)",\n        "placeDetails": "A classic cheap and delicious burger joint",\n        "placeImageUrl": "URL_PLACEHOLDER_6",\n        "geoCoordinates": { "lat": 36.1308, "lng": -115.1702},\n        "ticketPricing": "$10-15 (estimated)",\n        "travelTime": "Short drive or longer walk"\n      }\n    ],\n    "day2": [\n      {\n        "placeName": "Fremont Street Experience",\n        "placeDetails": "Downtown Las Vegas, vibrant atmosphere, Viva Vision light show",\n        "placeImageUrl": "URL_PLACEHOLDER_7",\n        "geoCoordinates": { "lat": 36.1699, "lng": -115.1408 },\n        "ticketPricing": "Free (Viva Vision is free to watch)",\n        "travelTime": "20-30 min drive from the Strip"\n      },\n      {\n        "placeName": "Neon Museum",\n        "placeDetails": "Explore vintage Vegas signs",\n        "placeImageUrl": "URL_PLACEHOLDER_8",\n        "geoCoordinates": { "lat": 36.1747, "lng": -115.1382 },\n        "ticketPricing": "$20-30 (estimated)",\n        "travelTime": "Short walk or taxi ride from Fremont Street"\n      },\n      {\n        "placeName": "Eat at a cheap buffet (check coupons)",\n        "placeDetails": "Many casinos offer buffets, find deals online",\n        "placeImageUrl": "URL_PLACEHOLDER_9",\n        "geoCoordinates": { "lat": 36.1137, "lng": -115.1740 },\n        "ticketPricing": "$15-25 (estimated, check for deals)",\n        "travelTime": "Variable, depends on location"\n      }      \n    ],\n    "day3": [\n      {\n        "placeName": "Red Rock Canyon National Conservation Area (Day trip)",\n        "placeDetails": "Hike or drive through scenic desert landscape",\n        "placeImageUrl": "URL_PLACEHOLDER_10",\n        "geoCoordinates": { "lat": 36.2040, "lng": -115.8127 },\n        "ticketPricing": "$15 per vehicle (estimated, check NPS website)",\n        "travelTime": "30-45 min drive"\n      },\n      {\n        "placeName": "Seven Magic Mountains (Art Installation)",\n        "placeDetails": "Colorful rock art installation south of Las Vegas",\n        "placeImageUrl": "URL_PLACEHOLDER_11",\n        "geoCoordinates": { "lat": 36.0137, "lng": -114.9968},\n        "ticketPricing": "Free (park nearby)",\n        "travelTime": "30-45min drive south of city"\n      }\n    ]\n  }\n}\n```\n\n**Remember to:**\n\n* **Replace the URL placeholders** with actual image URLs from Google Images or other sources.\n* **Check current hotel prices and ratings** on booking websites.\n* **Verify ticket prices** for attractions on their official websites.\n* **Factor in transportation costs** (Uber/Lyft/taxis or bus).  Las Vegas is spread out, so plan your transportation accordingly.\n* **Consider the time of year** when planning your visit. Summer can be extremely hot in Las Vegas.\n\nThis JSON provides a framework.  You will need to fill in the missing details to create a personalized and accurate itinerary.\n',
        },
      ],
    },
  ],
});
