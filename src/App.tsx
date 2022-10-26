import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import "./App.css";
import { FitnessChart } from "./components/fitness_chart";
import { TablePopulation } from "./components/table_population";
import { start, Individual } from "./genetic_algorithm";
import type { AllPopulations } from "./genetic_algorithm/algorithm";
import {
  getAveragePopulationAdaptability,
  IndividualParams,
  settings,
} from "./config";
import { AKFChart } from "./components/akf_chart";

const generateData = (
  population: Individual<IndividualParams>[],
  populationNumber: number
) => ({
  populationNumber,
  adaptability: getAveragePopulationAdaptability(population),
});

const byBestPopulation = (
  population1: Individual<IndividualParams>[],
  population2: Individual<IndividualParams>[]
) =>
  getAveragePopulationAdaptability(population2) -
  getAveragePopulationAdaptability(population1);

const byBestIndividual = (
  population1: Individual<IndividualParams>,
  population2: Individual<IndividualParams>
) => population2.params.adaptability - population1.params.adaptability;

const getPopulationData = (
  allPopulations: AllPopulations<IndividualParams>,
  populationNumber: number
) => {
  const population = allPopulations[populationNumber];
  if (population) {
    return population.map((individual, id) => ({
      id: String(id),
      dna: individual.dna,
      psl: individual.params.psl,
    }));
  }
  return undefined;
};

const StartButton = styled(Button)`
  margin-bottom: 10px;
`;

const App = () => {
  const [allPopulations, setAllPopulations] = useState<
    AllPopulations<IndividualParams>
  >([]);
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

  const fitnessFromGenerationNumberData = allPopulations.map(generateData);
  const bestPopulationDataList = [...allPopulations].sort(byBestPopulation);
  const bestPopulation = bestPopulationDataList[0];
  const bestIndividualDataList =
    bestPopulation && [...bestPopulation].sort(byBestIndividual);
  const bestIndividual = bestIndividualDataList && bestIndividualDataList[0];
  const AKFChartData =
    bestIndividual &&
    bestIndividual.params.autocorrelationData.map((value, index) => ({
      value,
      index,
    }));

  return (
    <div className="App">
      <StartButton onClick={handleClick}>Перезапуск</StartButton>
      <FitnessChart paddingRight={4} data={fitnessFromGenerationNumberData} />
      {AKFChartData && <AKFChart paddingRight={4} data={AKFChartData} />}
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
