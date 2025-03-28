export type Flight = {
  flights: {
    departureAirportName: string;
    departureAirportId: string;
    departureTime: string;
    arrivalAirportName: string;
    arrivalAirportId: string;
    arrivalTime: string;
    duration: number;
  }[];
  totalDuration: number;
  price: number;
};

export type Activity = {
  name: string;
  address: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  links: {
    website?: string;
    phone?: string;
  };
};

export type Itinerary = {
  travelDays: number;
  origin: string;
  destination: string;
  flight: Flight;
  activities: Activity[];
  travelers: number;
};
