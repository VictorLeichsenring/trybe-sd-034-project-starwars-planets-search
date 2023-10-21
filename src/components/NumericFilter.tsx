import React, { useContext, useState, useEffect } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import { PlanetsContextPropsType, NumericFilterTypes, PlanetType } from '../types';

function NumericFilter(): JSX.Element {
  const { planets,
    setPlanets,
    numericFilter,
    setNumericFilter,
    sort,
    setSort } = useContext(PlanetsContext) as PlanetsContextPropsType;

  const [selectedFilters, setSelectedFilters] = useState<NumericFilterTypes[]>([]);
  const [inputValue, setInputValue] = useState<string>('0'); // Inicializa com '0'
  const [availableColumns, setAvailableColumns] = useState<string[]>([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    // Remove colunas já usadas nos filtros da lista de opções
    const usedColumns = numericFilter.map((filter) => filter.column);
    const remainingColumns = availableColumns
      .filter((column) => !usedColumns.includes(column));
    setAvailableColumns(remainingColumns);
  }, [numericFilter]);

  const handleApplyFilters = () => {
    const column = (document.getElementById('column-filter') as HTMLSelectElement).value;
    const comparison = (document.getElementById('comparison-filter') as HTMLSelectElement)
      .value;
    const value = parseInt(inputValue, 10); // Usa o estado inputValue

    const newFilter = { column, comparison, value };

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

  const handleRemoveAllFilters = () => {
    setNumericFilter([]);
    setSelectedFilters([]);
  };

  const comparePlanets: (
    planetA: PlanetType,
    planetB: PlanetType
  ) => number = (planetA, planetB) => {
    const columnKey = sort.column as keyof PlanetType;

    const valueA = getValueForComparison(planetA[columnKey]);
    const valueB = getValueForComparison(planetB[columnKey]);

    if (valueA === -Infinity && valueB === -Infinity) return 0; // Both are "unknown"
    if (valueA === -Infinity) return 1; // A is "unknown", so it should appear last
    if (valueB === -Infinity) return -1; // B is "unknown", so it should appear last

    return sort.sort === 'ASC' ? valueA - valueB : valueB - valueA;
  };

  const getValueForComparison = (value: string | string[]): number => {
    if (Array.isArray(value)) {
      return -Infinity;
    }

    const parsedValue = parseFloat(value);
    return Number.isNaN(parsedValue) || value === 'unknown' ? -Infinity : parsedValue;
  };

  const handleSort = () => {
    if (sort.column && sort.sort) {
      const sortedPlanets = [...planets].sort(comparePlanets);
      setPlanets(sortedPlanets);
    }
  };

  const handleSortColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort((prevSort: any) => ({ ...prevSort, column: e.target.value }));
  };

  const handleSortTypeChange = (value: 'ASC' | 'DESC') => {
    setSort((prevSort: any) => ({ ...prevSort, sort: value }));
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        value={ sort.column }
        onChange={ handleSortColumnChange }
      >
        <option value="">Selecionar Coluna</option>
        <option value="name">Name</option>
        <option value="rotation_period">Rotation Period</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="diameter">Diameter</option>
        <option value="climate">Climate</option>
        <option value="gravity">Gravity</option>
        <option value="terrain">Terrain</option>
        <option value="surface_water">Surface Water</option>
        <option value="population">Population</option>
        <option value="films">Films</option>
        <option value="created">Created</option>
        <option value="edited">Edited</option>
        <option value="url">URL</option>
      </select>

      <label>
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          checked={ sort.sort === 'ASC' }
          onChange={ () => handleSortTypeChange('ASC') }
        />
        Ascendente
      </label>

      <label>
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          checked={ sort.sort === 'DESC' }
          onChange={ () => handleSortTypeChange('DESC') }
        />
        Descendente
      </label>

      <button data-testid="column-sort-button" onClick={ handleSort }>
        Ordenar
      </button>

      <select data-testid="column-filter" id="column-filter">
        {availableColumns.map((column) => (
          <option key={ column } value={ column }>
            {column}
          </option>
        ))}
      </select>

      <select data-testid="comparison-filter" id="comparison-filter">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        id="value-filter"
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) } // Atualiza o estado inputValue
      />

      <button data-testid="button-filter" onClick={ handleApplyFilters }>
        Filtrar
      </button>

      <button data-testid="button-remove-filters" onClick={ handleRemoveAllFilters }>
        Remover todas as filtragens
      </button>

      {selectedFilters.length > 0 && (
        <div className="selected-filters">
          <p>Filtros Aplicados:</p>
          <ul>
            {selectedFilters.map((filter, index) => (
              <li key={ index } data-testid="filter">
                {filter.column}
                {' '}
                {filter.comparison}
                {' '}
                {filter.value}
                <button
                  onClick={ () => handleRemoveFilter(index) }
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NumericFilter;
