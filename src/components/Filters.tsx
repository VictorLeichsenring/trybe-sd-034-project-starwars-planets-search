import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

function Filters(): JSX.Element {
  const { nameFilter, setNameFilter } = useContext(PlanetsContext);

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
