import type { Settings } from "./index";
import { populate, lifeCycle, Individual } from "./utils";
type AllPopulation = { [generation:number]: Individual[] }
let generation = 1;
function algorithm(settings: Settings, population: Individual[]): AllPopulation  {
  const nextPopulation = lifeCycle(settings)(population);
  ++generation;
  const allPopulations = {}
  console.log("generation",
  generation);
  if (
    settings.populationFitness(nextPopulation) ||
    generation >= settings.maxGeneration
  ) {
    return ({...allPopulations, [generation]: nextPopulation});
  } else {
    return algorithm(settings, nextPopulation);
  }
}

export function start(settings: Settings) {
  return algorithm(settings, populate(settings));
}
