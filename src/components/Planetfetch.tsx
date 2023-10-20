import { useEffect } from 'react';
import usePlanets from '../hooks/usePlanets';

function PlanetFetch(): JSX.Element | null {
  const { setPlanets } = usePlanets();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const data = await response.json();

        const cleanedData = data.results.map((planet: any) => {
          const { residents, ...rest } = planet;
          return rest;
        });

        setPlanets(cleanedData);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchData();
  }, [setPlanets]);

  return null;
}

export default PlanetFetch;
