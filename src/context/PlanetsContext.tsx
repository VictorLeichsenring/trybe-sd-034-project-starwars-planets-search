import { createContext, useState } from 'react';
import { PlanetType, PlanetsContextPropsType, PlanetsProviderPropsType } from '../types';

export const PlanetsContext = createContext<PlanetsContextPropsType | undefined>(
  undefined,
);

function PlanetsProvider({ children = null }: PlanetsProviderPropsType): JSX.Element {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');

  return (
    <PlanetsContext.Provider value={ { planets, setPlanets, nameFilter, setNameFilter } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export { PlanetsProvider };
