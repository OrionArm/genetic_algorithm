import type { Settings } from "./index";
import { populate, lifeCycle, Individual, CommonParams } from "./utils";
export type AllPopulations<T extends CommonParams> = Array<Individual<T>[]>;

let generation = 0;
function algorithm<T extends CommonParams>(
  settings: Settings<T>,
  allPopulations: AllPopulations<T>
): AllPopulations<T> {
  const latPopulation = allPopulations[allPopulations.length - 1];
  const nextPopulation = lifeCycle<T>(settings)(
    latPopulation || []
  ) as Individual<T>[];
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

export function start<T extends CommonParams>(settings: Settings<T>) {
  const allPopulations: AllPopulations<T> = [populate(settings)];
  return algorithm(settings, allPopulations);
}
