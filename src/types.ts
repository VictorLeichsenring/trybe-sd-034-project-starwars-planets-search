export type PlanetType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type PlanetsContextPropsType = {
  planets: PlanetType[];
  setPlanets: React.Dispatch<React.SetStateAction<PlanetType[]>>;
  nameFilter: string;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
};

export type PlanetsProviderPropsType = {
  children: React.ReactNode;
};
