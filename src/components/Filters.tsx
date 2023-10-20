import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import { PlanetsContextPropsType } from '../types';

function Filters(): JSX.Element {
  const contextValue = useContext(PlanetsContext) as PlanetsContextPropsType;
  const { nameFilter, setNameFilter } = contextValue;

  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setNameFilter) {
      setNameFilter(event.target.value);
    }
  };

  return (
    <div className="filters">
      <label htmlFor="name-filter">Filter by Name:</label>
      <input
        id="name-filter"
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ handleNameFilterChange }
      />
    </div>
  );
}

export default Filters;
