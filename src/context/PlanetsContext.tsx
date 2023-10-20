import { createContext, useState } from 'react';
import { PlanetType,
  PlanetsContextPropsType,
  PlanetsProviderPropsType,
  NumericFilterTypes } from '../types';

export const PlanetsContext = createContext<PlanetsContextPropsType | undefined>(
  undefined,
);

function PlanetsProvider({ children = null }: PlanetsProviderPropsType): JSX.Element {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [numericFilter, setNumericFilter] = useState<NumericFilterTypes[]>([]);

  const contextValue = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    numericFilter,
    setNumericFilter,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

export { PlanetsProvider };
