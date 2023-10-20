import { useContext } from 'react';
import { PlanetsContextPropsType } from '../types';
import { PlanetsContext } from '../context/PlanetsContext';

const usePlanets = (): PlanetsContextPropsType => {
  const context = useContext(PlanetsContext);
  if (!context) {
    throw new Error('usePlanets must be used within a PlanetsProvider');
  }
  return context;
};

export default usePlanets;
