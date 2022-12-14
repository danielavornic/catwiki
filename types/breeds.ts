export interface Breed {
  id: string;
  name: string;
  description?: string;
  image?: {
    url: string;
  };
  images?: string[];
  temperament: string;
  life_span: string;
  alt_names: string;
  wikipedia_url: string;
  origin: string;
  weight_imperial: string;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  reference_image_id?: string;
  suppress_tail?: number;
  short_legs?: number;
  hypoallergenic?: number;
  adaptability?: number;
  affection_level?: number;
  country_code: string;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
}

export interface BreedSearch {
  id: string;
  name: string;
  searches: number;
  img?: string;
  imgUrl?: string;
}
