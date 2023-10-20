import React from 'react';
import usePlanets from '../hooks/usePlanets';
import { PlanetType } from '../types';

function Table(): JSX.Element {
  const { planets, nameFilter, numericFilter } = usePlanets();

  const columnToPropertyMap: Record<string, keyof PlanetType> = {
    population: 'population',
    orbital_period: 'orbital_period',
    diameter: 'diameter',
    rotation_period: 'rotation_period',
    surface_water: 'surface_water',
  };

  const applyNumericFilters = (planet: PlanetType): boolean => {
    return numericFilter.every((filter) => {
      const columnKey = columnToPropertyMap[filter.column];
      const planetValue = parseFloat(planet[columnKey] as string);

      switch (filter.comparison) {
        case 'greater_than':
          return planetValue > filter.value;
        case 'less_than':
          return planetValue < filter.value;
        case 'equal_to':
          return planetValue === filter.value;
        default:
          return true;
      }
    });
  };

  const applyTextFilter = (planet: PlanetType): boolean => {
    return planet.name.toLowerCase().includes(nameFilter.toLowerCase());
  };

  const filteredPlanets = planets.filter((planet) => {
    return applyTextFilter(planet) && applyNumericFilters(planet);
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet: PlanetType) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                {planet.films.map((url) => (
                  <div className="film-url" key={ url }>{url}</div>
                ))}
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
