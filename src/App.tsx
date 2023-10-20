import React from 'react';
import './App.css';
import { PlanetsProvider } from './context/PlanetsContext';
import PlanetFetch from './components/Planetfetch';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <PlanetFetch />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
