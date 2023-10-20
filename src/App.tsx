import React from 'react';
import './App.css';
import { PlanetsProvider } from './context/PlanetsContext';
import PlanetFetch from './components/Planetfetch';
import Table from './components/Table';
import Filters from './components/Filters'; // Importe o componente Filters
import NumericFilter from './components/NumericFilter';

function App() {
  return (
    <PlanetsProvider>
      <PlanetFetch />
      <Filters />
      <NumericFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
