export interface GoogleFlightsResponse {
  search_metadata: GoogleFlightsSearchMetadata;
  search_parameters: GoogleFlightsSearchParameters;
  best_flights: GoogleFlightsFlightDetail[];
  other_flights: GoogleFlightsFlightDetail[];
  price_insights: GoogleFlightsPriceInsights;
  airports: GoogleFlightsAirportGroup[];
}

interface GoogleFlightsSearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_flights_url: string;
  raw_html_file: string;
  prettify_html_file: string;
  total_time_taken: number;
}

interface GoogleFlightsSearchParameters {
  engine: string;
  hl: string;
  departure_id: string;
  arrival_id: string;
  outbound_date: string;
  return_date: string;
  currency: string;
}

interface GoogleFlightsFlightDetail {
  flights: GoogleFlightsFlight[];
  layovers: GoogleFlightsLayover[];
  total_duration: number;
  carbon_emissions: GoogleFlightsFlightCarbonEmissions;
  price: number;
  type: string;
  airline_logo: string;
  departure_token: string;
}

interface GoogleFlightsFlight {
  departure_airport: GoogleFlightsFlightDepartureAirport;
  arrival_airport: GoogleFlightsFlightArrivalAirport;
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  legroom: string;
  extensions: string[];
  ticket_also_sold_by?: string[];
  overnight?: boolean;
  often_delayed_by_over_30_min?: boolean;
}

interface GoogleFlightsFlightDepartureAirport {
  name: string;
  id: string;
  time: string;
}

interface GoogleFlightsFlightArrivalAirport {
  name: string;
  id: string;
  time: string;
}

interface GoogleFlightsLayover {
  duration: number;
  name: string;
  id: string;
  overnight?: boolean;
}

interface GoogleFlightsFlightCarbonEmissions {
  this_flight: number;
  typical_for_this_route: number;
  difference_percent: number;
}

interface GoogleFlightsPriceInsights {
  lowest_price: number;
  price_level: string;
  typical_price_range: number[];
  price_history: number[][];
}

interface GoogleFlightsAirportGroup {
  departure: GoogleFlightsAirportDeparture[];
  arrival: GoogleFlightsAirportArrival[];
}

interface GoogleFlightsAirport {
  name: string;
  id: string;
}

interface GoogleFlightsAirportDeparture {
  airport: GoogleFlightsAirport;
  city: string;
  country: string;
  country_code: string;
  image: string;
  thumbnail: string;
}

interface GoogleFlightsAirportArrival {
  airport: GoogleFlightsAirport;
  city: string;
  country: string;
  country_code: string;
  image: string;
  thumbnail: string;
}
