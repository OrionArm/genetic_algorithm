import type { Settings } from "./index";
import { populate, lifeCycle, Individual } from "./utils";
export type AllPopulations = Array<Individual[]>;

let generation = 0;
function algorithm(
  settings: Settings,
  allPopulations: AllPopulations
): AllPopulations {
  const latPopulation = allPopulations[allPopulations.length - 1];
  const nextPopulation = lifeCycle(settings)(latPopulation || []);
  ++generation;

  if (
    settings.stopEvolution(nextPopulation) ||
    generation >= settings.maxGeneration
  ) {
    generation = 0;
    return allPopulations;
  } else {
    allPopulations.push(nextPopulation);

    return algorithm(settings, allPopulations);
  }
}

export function start(settings: Settings) {
  const allPopulations: AllPopulations = [populate(settings)];
  return algorithm(settings, allPopulations);
}
