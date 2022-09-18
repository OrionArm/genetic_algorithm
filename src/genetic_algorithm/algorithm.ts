import type { Settings } from "./index";
import { populate, lifeCycle, Individual } from "./utils";
export type AllPopulations = Array<Individual[]>;

let generation = 1;
function algorithm(
  settings: Settings,
  allPopulations: AllPopulations
): AllPopulations {
  const latPopulation = allPopulations[allPopulations.length - 1];
  const nextPopulation = lifeCycle(settings)(latPopulation || []);
  ++generation;
  console.log("generation", generation);
  allPopulations.push(nextPopulation);
  if (
    settings.populationFitness(nextPopulation) ||
    generation >= settings.maxGeneration
  ) {
    return allPopulations;
  } else {
    return algorithm(settings, allPopulations);
  }
}

export function start(settings: Settings) {
  const allPopulations: AllPopulations = [];
  allPopulations.push(populate(settings));
  return algorithm(settings, allPopulations);
}
