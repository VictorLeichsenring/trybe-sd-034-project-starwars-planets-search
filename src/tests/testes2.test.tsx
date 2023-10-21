import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import mockApiPlanets from './data';
import { PlanetsProvider } from '../context/PlanetsContext';
import Table from '../components/Table';



describe('testando a aplição', () => {

  // test('teste se a função foi chamada ', async () => {
  //   const fetchRevolvedValue = { 
  //     ok:true,
  //     status: 200,
  //     json: async () => mockApiPlanets,} as Response;

  // vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);

  //  await act ( async () => {

  //    render(<App/>);
  //  })

  //  expect(await screen.findByText('Yavin IV')).toBeInTheDocument();
  //  expect(await screen.findByText('4818')).toBeInTheDocument();
  //  expect(await screen.findByText('10200')).toBeInTheDocument();
  //  expect(await screen.findByText('temperate, tropical')).toBeInTheDocument();
  //  expect(await screen.findByText('jungle, rainforests')).toBeInTheDocument();
  //  expect(await screen.findByText('1000')).toBeInTheDocument();
  //  expect(await screen.findByText( 'https://swapi-trybe.herokuapp.com/api/films/1/')).toBeInTheDocument();
  //  expect(await screen.findByText('2014-12-10T11:37:19.144000Z')).toBeInTheDocument();
  //  expect(await screen.findByText('2014-12-20T20:58:18.421000Z')).toBeInTheDocument();
  //  expect(await screen.findByText('https://swapi-trybe.herokuapp.com/api/planets/3/')).toBeInTheDocument();

  // });

  test('teste se a função foi chamada e se o retorno de planetas é 1 ', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);
   await act ( async () => {

    render(<App/>);
  })

   const inputs = screen.getByTestId("name-filter");
   let PlanetName = await  screen.findAllByTestId('planet-name');

   expect( PlanetName.length).toBe(10);
   await userEvent.type(inputs,'Tat')

   PlanetName = await  screen.findAllByTestId('planet-name');
   expect( PlanetName.length).toBe(1);

  });

  test('teste se a função foi chamada e se o retorno de planetas é 8 ', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);
   await act ( async () => {

    render(<App/>);
  })

  const bottonFilter = screen.getByTestId("button-filter");
  await userEvent.click(bottonFilter);
  let PlanetNam = await  screen.findAllByTestId('planet-name');
  expect( PlanetNam.length).toBe(8);
  });


  test('teste se a função foi chamada e se o retorno de planetas é 7 ', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);
   await act ( async () => {

    render(<App/>);
  })

  const inputColumn = screen.getByTestId("column-filter");
  const inputComparison = screen.getByTestId("comparison-filter");
  const inputNumber= screen.getByTestId("value-filter");
  const buttonFilter = screen.getByTestId('button-filter')

  await userEvent.selectOptions(inputColumn,'diameter');
  await userEvent.selectOptions(inputComparison,'maior que');
  await userEvent.type(inputNumber,'9000');
  await userEvent.click(buttonFilter);
  let PlanetNam = await  screen.findAllByTestId('planet-name');
  expect( PlanetNam.length).toBe(7);
  });
//==========================================================//
  test('teste se a função foi chamada do button Ordenar ascendente', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);
   await act ( async () => {

    render(<App/>);
  })

  const inputColumnOrdenar = screen.getByTestId("column-sort");
  const inputAsc = screen.getByTestId("column-sort-input-asc");
  const buttonOrdenar = screen.getByTestId('column-sort-button')

  await userEvent.selectOptions(inputColumnOrdenar,'population');

  await userEvent.click(inputAsc);
  await userEvent.click(buttonOrdenar);
  let PlanetNam = await  screen.findAllByTestId('planet-name');
  expect( PlanetNam.length).toBe(10);
  });


  test('teste se a função foi chamada do button Ordenar descendente', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);
   await act ( async () => {

    render(<App/>);
  })

  const inputColumnOrdenar = screen.getByTestId("column-sort");
  const inputDesc = screen.getByTestId("column-sort-input-desc");
  const buttonOrdenar = screen.getByTestId('column-sort-button')

  await userEvent.selectOptions(inputColumnOrdenar,'diameter');

  await userEvent.click(inputColumnOrdenar);
  await userEvent.click(inputDesc);
  await userEvent.click(buttonOrdenar);
  let PlanetNam = await  screen.findAllByTestId('planet-name');
  expect( PlanetNam.length).toBe(10);
  });
  //=================================================================//

  test('teste se a função resetPage', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);
   await act ( async () => {

    render(<App/>);
  })

  const inputColumnOrdenar = screen.getByTestId("column-sort");
  const inputDesc = screen.getByTestId("column-sort-input-desc");
  const buttonOrdenar = screen.getByTestId('column-sort-button')

  await userEvent.selectOptions(inputColumnOrdenar,'diameter');


  await userEvent.click(inputColumnOrdenar);
  await userEvent.click(inputDesc);
  await userEvent.click(buttonOrdenar);
  let PlanetNam = await  screen.findAllByTestId('planet-name');
  expect( PlanetNam.length).toBe(10);

  const buttonReset = screen.getByTestId('button-remove-filters');
  await userEvent.click(buttonReset);
  expect( PlanetNam.length).toBe(10);
  });

  test('teste se é maior que population ', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);
   await act ( async () => {

    render(<App/>);
  })

  const inputColumnOrdenar = screen.getByTestId("comparison-filter");
  await userEvent.selectOptions(inputColumnOrdenar,'maior que');
  await userEvent.click(inputColumnOrdenar);

  const buttonColumn = screen.getByTestId('column-filter');
  await userEvent.selectOptions(buttonColumn,'population');
  await userEvent.click(buttonColumn);

  const inputNumber = screen.getByTestId('value-filter');
  await userEvent.type(inputNumber, '0');

   const buttonFiltro = screen.getByTestId('button-filter')
  await userEvent.click(buttonFiltro);


  let PlanetNam = await  screen.findAllByTestId('planet-name');
  expect( PlanetNam.length).toBe(8);
  });

  test('teste se é menor que population ', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);
   await act ( async () => {

    render(<App/>);
  })

  const inputColumnOrdenar = screen.getByTestId("comparison-filter");
  await userEvent.selectOptions(inputColumnOrdenar,'menor que');

  const buttonColumn = screen.getByTestId('column-filter');
  await userEvent.selectOptions(buttonColumn,'diameter');
  await userEvent.click(buttonColumn);

  const inputText = screen.getByTestId('value-filter');
  await userEvent.type(inputText, '10000');

   const buttonFiltro = screen.getByTestId('button-filter')
  await userEvent.click(buttonFiltro);



  let PlanetNam = await  screen.findAllByTestId('planet-name');
  expect( PlanetNam.length).toBe(3);
  });

  test('teste se é igual a ', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);
   await act ( async () => {

    render(<App/>);
  })

  const inputColumnOrdenar = screen.getByTestId("comparison-filter");
  await userEvent.selectOptions(inputColumnOrdenar,'igual a');

  const buttonColumn = screen.getByTestId('column-filter');
  await userEvent.selectOptions(buttonColumn,'rotation_period');
  await userEvent.click(buttonColumn);

  const inputText = screen.getByTestId('value-filter');
  await userEvent.type(inputText, '23');

   const buttonFiltro = screen.getByTestId('button-filter')
  await userEvent.click(buttonFiltro);


  let PlanetNam = await  screen.findAllByTestId('planet-name');
  expect( PlanetNam.length).toBe(3);
});

test('testando a o asc', () => {

  render(
    <PlanetsProvider>
       <App />
     </PlanetsProvider>
  );

  expect(screen.getByTestId('column-sort')).toBeTruthy();
  expect(Table).toBeTruthy();

})



})