import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import "./App.css";
import { Chart } from "./components/chart";
import { TablePopulation } from "./components/table_population";
import { start, Individual } from "./genetic_algorithm";
import type { AllPopulations } from "./genetic_algorithm/algorithm";
import { getPopulationAdaptability, settings } from "./config";

const generateData = (population: Individual[], populationNumber: number) => ({
  populationNumber,
  adaptability: getPopulationAdaptability(population),
});

const getPopulationData = (
  allPopulations: AllPopulations,
  populationNumber: number
) => {
  const population = allPopulations[populationNumber];
  if (population) {
    return population.map((individual: Individual, id) => ({
      id: String(id),
      n: individual.adaptability,
      k: 2,
    }));
  }
  return undefined;
};

const StartButton = styled(Button)`
  margin-bottom: 10px;
`;

const App = () => {
  const [allPopulations, setAllPopulations] = useState<AllPopulations>([]);
  const handleClick = () => {
    setAllPopulations(start(settings));
  };

  useEffect(() => {
    setAllPopulations(start(settings));
  }, []);

  const rowsData0 = getPopulationData(allPopulations, 0);
  const rowsData2 = getPopulationData(allPopulations, 2);
  const rowsDataLast = getPopulationData(
    allPopulations,
    allPopulations.length - 1
  );

  let data = allPopulations.map(generateData);

  return (
    <div className="App">
      <StartButton onClick={handleClick}>Перезапуск</StartButton>
      <Chart paddingRight={4} data={data} />
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
