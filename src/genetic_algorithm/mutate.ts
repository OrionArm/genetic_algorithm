import { curry } from "lodash/fp";
import type { Settings } from "./index";
import { Chromosome, Individual, selectRandomNumber } from "./utils";

const mutateDNA = (dna: Chromosome[]) => {
  const mutablePart = 4;
  const mutatedDNA = [...dna];
  const numberMutatedChromosomes = Math.floor(dna.length / mutablePart) || 1;
  Array.from(Array(numberMutatedChromosomes).keys()).forEach(() => {
    const index = selectRandomNumber(dna.length);
    mutatedDNA[index] = mutatedDNA[index] ? -1 : 1;
  });

  return mutatedDNA;
};

const mutateIndividual = (
  settings: Settings,
  individual: Individual
): Individual => {
  const dna = mutateDNA(individual.dna);
  const params = settings.setParams(dna);
  return { dna, params };
};

export const mutatePopulation = curry(
  (settings: Settings, population: Individual[]) =>
    population.map((individual) => {
      if (Math.random() > settings.pm) return individual;
      return mutateIndividual(settings, individual);
    })
);
