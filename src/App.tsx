import React from 'react';
import './App.css';
import { PlanetsProvider } from './context/PlanetsContext';
import PlanetFetch from './components/Planetfetch';
import Table from './components/Table';
import Filters from './components/Filters'; // Importe o componente Filters

function App() {
  return (
    <PlanetsProvider>
      <PlanetFetch />
      <Filters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
