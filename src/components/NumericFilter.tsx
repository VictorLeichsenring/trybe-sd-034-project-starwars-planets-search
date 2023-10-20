import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import { PlanetsContextPropsType, NumericFilterTypes } from '../types';

function NumericFilter(): JSX.Element {
  const { setNumericFilter,
    numericFilter } = useContext(PlanetsContext) as PlanetsContextPropsType;
  const [selectedFilters, setSelectedFilters] = useState<NumericFilterTypes[]>([]);

  const handleApplyFilters = () => {
    const column = (document.getElementById('column-filter') as HTMLSelectElement).value;
    const comparison = (document.getElementById('comparison-filter') as HTMLSelectElement)
      .value;
    const inputElement = document.getElementById('value-filter') as HTMLInputElement;
    const value = parseInt(inputElement.value, 10);

    const newFilter = { column, comparison, value };

    // Verificar se o filtro já existe na lista
    const isFilterDuplicate = selectedFilters.some(
      (filter) => filter.column === newFilter.column
        && filter.comparison === newFilter.comparison
        && filter.value === newFilter.value,
    );

    if (!isFilterDuplicate) {
      setNumericFilter([...numericFilter, newFilter]);
      setSelectedFilters([...selectedFilters, newFilter]);
    }
  };

  const handleRemoveFilter = (index: number) => {
    const updatedFilters = [...numericFilter];
    updatedFilters.splice(index, 1);
    setNumericFilter(updatedFilters);
    setSelectedFilters(selectedFilters.filter((_, i) => i !== index));
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

      <input type="number" data-testid="value-filter" id="value-filter" min={ 1 } />

      <button data-testid="button-filter" onClick={ handleApplyFilters }>
        Filtrar
      </button>

      {selectedFilters.length > 0 && (
        <div className="selected-filters">
          <p>Filtros Aplicados:</p>
          <ul>
            {selectedFilters.map((filter, index) => (
              <li key={ index }>
                {filter.column}
                {' '}
                {filter.comparison}
                {' '}
                {filter.value}
                <button onClick={ () => handleRemoveFilter(index) }>Remover</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NumericFilter;
