import React from "react";

import "./App.css";
import { Chart } from "./chart";
import { Settings, start, Chromosome, Individual } from "./genetic_algorithm";

let data = [
  {
    category: "Research",
    value1: 1000,
    value2: 588,
  },
  {
    category: "Marketing",
    value1: 1200,
    value2: 1800,
  },
  {
    category: "Sales",
    value1: 850,
    value2: 1230,
  },
];

const populationFitness = (population: Individual[] = []) =>
  population.reduce((acc, individual) => acc + individual.dna.length, 1);

const individualFitness = (dna: Chromosome[]): number =>
  dna.reduce<number>((acc, chromosome) => acc + chromosome, 1);

const settings: Settings = {
  n: 26, // длина КП
  p: 50, // размер начальной популяции
  psl: 2, // допустимый максимальный уровень положительных боковых лепестков АКФ,
  k: 4, // количество искомых КП, с заданным PSL;
  pk: 0.8, // вероятность скрещивания
  pm: 0.15, // вероятность мутации
  wayOfFormingParentPairs: "random", // способ формирования родительских пар
  selectionMethod: "tournament", // способ селекция
  populationFitness,
  individualFitness,
  maxGeneration: 10,
};
const App = () => {
  const handleClick = () => {
    const AllPopulation = start(settings);
    console.log("population", AllPopulation);
  };
  return (
    <div className="App">
      <Chart paddingRight={4} data={data} />
      <button onClick={handleClick}>Пуск</button>
    </div>
  );
};

export default App;
