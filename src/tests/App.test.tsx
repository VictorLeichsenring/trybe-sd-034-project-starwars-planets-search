import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';

import mockApiPlanets from './data';



describe('testando a aplição', () => {

  test('teste se a função foi chamada ', async () => {
    const fetchRevolvedValue = { 
      ok:true,
      status: 200,
      json: async () => mockApiPlanets,} as Response;

  vi.spyOn(global, 'fetch').mockResolvedValue(fetchRevolvedValue);

   await act ( async () => {

     render(<App/>);
   })

   expect(await screen.findByText('Yavin IV')).toBeInTheDocument();
  //  expect(await screen.findByText('24')).toBeInTheDocument();
   expect(await screen.findByText('4818')).toBeInTheDocument();
   expect(await screen.findByText('10200')).toBeInTheDocument();
   expect(await screen.findByText('temperate, tropical')).toBeInTheDocument();
  //  expect(await screen.findByText('1 standard')).toBeInTheDocument();
   expect(await screen.findByText('jungle, rainforests')).toBeInTheDocument();
  //  expect(await screen.findByText('8')).toBeInTheDocument();
   expect(await screen.findByText('1000')).toBeInTheDocument();
   expect(await screen.findByText( 'https://swapi-trybe.herokuapp.com/api/films/1/')).toBeInTheDocument();
   expect(await screen.findByText('2014-12-10T11:37:19.144000Z')).toBeInTheDocument();
   expect(await screen.findByText('2014-12-20T20:58:18.421000Z')).toBeInTheDocument();
   expect(await screen.findByText('https://swapi-trybe.herokuapp.com/api/planets/3/')).toBeInTheDocument();

  });

  test('teste se a função foi chamada ', async () => {
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

  test('teste se a função foi chamada ', async () => {
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


  test('teste se a função foi chamada ', async () => {
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

})