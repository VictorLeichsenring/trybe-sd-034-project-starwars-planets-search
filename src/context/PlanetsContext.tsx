import React, { createContext, useState } from 'react';
import { PlanetType,
  PlanetsContextPropsType,
  PlanetsProviderPropsType,
  NumericFilterTypes } from '../types';

export const PlanetsContext = createContext<
PlanetsContextPropsType | undefined>(undefined);

function PlanetsProvider({ children = null }: PlanetsProviderPropsType): JSX.Element {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [numericFilter, setNumericFilter] = useState<NumericFilterTypes[]>([]);
  const [sort, setSort] = useState<
  { column: string; sort: 'ASC' | 'DESC' }>({ column: 'population', sort: 'ASC' });

  const contextValue = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    numericFilter,
    setNumericFilter,
    sort,
    setSort,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

export { PlanetsProvider };
