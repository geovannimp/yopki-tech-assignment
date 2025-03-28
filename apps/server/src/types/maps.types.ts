export type GoogleMapsSearchResult =
  | {
      search_metadata: GoogleMapsSearchMetadata;
      search_parameters: GoogleMapsSearchParameters;
      search_information: GoogleMapsSearchInformation;
      local_results: GoogleMapsSearchLocalResult[];
      serpapi_pagination: SerpapiPagination;
    }
  | {
      search_metadata: GoogleMapsSearchMetadata;
      search_parameters: GoogleMapsSearchParameters;
      search_information: GoogleMapsSearchInformation;
      place_results: GoogleMapsSearchLocalResult;
      serpapi_pagination: SerpapiPagination;
    };

export interface GoogleMapsSearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_maps_url: string;
  raw_html_file: string;
  total_time_taken: number;
}

export interface GoogleMapsSearchParameters {
  engine: string;
  type: string;
  q: string;
  ll: string;
  google_domain: string;
  hl: string;
}

export interface GoogleMapsSearchInformation {
  local_results_state: string;
  query_displayed: string;
}

export interface GoogleMapsSearchLocalResult {
  position: number;
  title: string;
  place_id: string;
  data_id: string;
  data_cid: string;
  reviews_link: string;
  photos_link: string;
  gps_coordinates: GpsCoordinates;
  place_id_search: string;
  provider_id: string;
  rating: number;
  reviews: number;
  price: string;
  type: string;
  types: string[];
  type_id: string;
  type_ids: string[];
  address: string;
  open_state: string;
  hours: string;
  operating_hours: OperatingHours;
  phone: string;
  website: string;
  description: string;
  service_options: ServiceOptions;
  order_online: string;
  thumbnail: string;
  reserve_a_table?: string;
}

export interface GpsCoordinates {
  latitude: number;
  longitude: number;
}

export interface OperatingHours {
  friday: string;
  saturday: string;
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
}

export interface ServiceOptions {
  dine_in: boolean;
  takeout?: boolean;
  no_contact_delivery?: boolean;
  delivery?: boolean;
  curbside_pickup?: boolean;
}

export interface SerpapiPagination {
  next: string;
}
