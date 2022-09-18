import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";

import "./App.css";
import { Chart } from "./chart";
import { TablePopulation } from "./components/table_population";
import { Settings, start, Chromosome, Individual } from "./genetic_algorithm";
import type { AllPopulations } from "./genetic_algorithm/algorithm";

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

const getPopulationData = (
  allPopulations: AllPopulations,
  populationNumber: number
) => {
  const population = allPopulations[populationNumber];
  if (population) {
    return population.map((individual: Individual, id) => ({
      id: String(id),
      n: individual.fitness,
      k: 2,
    }));
  }
  return undefined;
};

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

const StartButton = styled(Button)`
  margin-bottom: 10px;
`;

const App = () => {
  const [allPopulations, setAllPopulations] = useState<AllPopulations>([]);
  const handleClick = () => {
    setAllPopulations(start(settings));
    console.log("population", allPopulations);
  };

  const rowsData0 = getPopulationData(allPopulations, 0);
  const rowsData2 = getPopulationData(allPopulations, 0);
  const rowsDataLast = getPopulationData(
    allPopulations,
    allPopulations.length - 1
  );

  return (
    <div className="App">
      <Chart paddingRight={4} data={data} />
      <StartButton onClick={handleClick}>Пуск</StartButton>
      <Grid container spacing={1} columns={24}>
        <Grid xs={8}>
          {rowsData0 && (
            <TablePopulation rows={rowsData0} title="1 популяция" />
          )}
        </Grid>
        <Grid xs={8}>
          {rowsData2 && (
            <TablePopulation rows={rowsData2} title="3 популяция" />
          )}
        </Grid>
        <Grid xs={8}>
          {rowsDataLast && (
            <TablePopulation rows={rowsDataLast} title="Последняя популяция" />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
