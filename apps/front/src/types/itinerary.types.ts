export type ItineraryResult =
  | {
      success: true;
      data: ItineraryData;
    }
  | {
      success: false;
      error: string;
    };

export interface ItineraryData {
  itinerary: Itinerary;
}

export interface Itinerary {
  travelDays: number;
  origin: string;
  destination: string;
  flight: Flight;
  activities: Activity[];
  travelers: number;
}

export interface Flight {
  flights: Flight2[];
  totalDuration: number;
  price: number;
}

export interface Flight2 {
  departureAirportName: string;
  departureAirportId: string;
  departureTime: string;
  arrivalAirportName: string;
  arrivalAirportId: string;
  arrivalTime: string;
  duration: number;
}

export interface Activity {
  name: string;
  address: string;
  rating?: number;
  reviews?: number;
  image: string;
  links: Links;
  description?: string;
}

export interface Links {
  website?: string;
  phone?: string;
}
