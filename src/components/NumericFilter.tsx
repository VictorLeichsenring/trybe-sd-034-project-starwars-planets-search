import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import { PlanetsContextPropsType } from '../types';

function NumericFilter(): JSX.Element {
  const { setNumericFilter } = useContext(PlanetsContext) as PlanetsContextPropsType;

  const handleFilter = () => {
    const column = (document.getElementById('column-filter') as HTMLSelectElement).value;
    const comparison = (
      document.getElementById('comparison-filter') as HTMLSelectElement).value;
    const inputElement = document.getElementById('value-filter') as HTMLInputElement;
    const value = parseInt(inputElement.value, 10);

    const newFilter = { column, comparison, value };
    setNumericFilter([newFilter]);
  };

  return (
    <div>
      <select data-testid="column-filter" id="column-filter">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select data-testid="comparison-filter" id="comparison-filter">
        <option value="greater_than">maior que</option>
        <option value="less_than">menor que</option>
        <option value="equal_to">igual a</option>
      </select>

      <input type="number" data-testid="value-filter" id="value-filter" />

      <button data-testid="button-filter" onClick={ handleFilter }>
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilter;
