import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Teste da Aplicação',() => {
  test('Teste se está sendo renderizado o componente',()=>{
    render(<App />);
    const element = screen.getByText('Filter by Name:');
    expect(element).toBeInTheDocument();
  });
  test('Verifica se há um input com data-testid="name-filter"', () => {
    render(<App />);
    const inputElement = screen.getByTestId('name-filter');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.tagName).toBe('INPUT'); // Opcional: Para garantir que é um input
  });

  test('Verifica se há um select com data-testid="column-sort"', () => {
    render(<App />);
    const selectElement = screen.getByTestId('column-sort');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.tagName).toBe('SELECT'); // Garante que é um select
  });

  test('Verifica se há um botão com data-testid="column-sort-button"', () => {
    render(<App />);
    const buttonElement = screen.getByTestId('column-sort-button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
  });
  
})
