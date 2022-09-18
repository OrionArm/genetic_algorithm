import { pipe, curry } from "lodash/fp";
import { mutatePopulation } from "./mutate";
import { reductionPopulation } from "./reduction";
import { crossoverPopulation } from "./crossover";
import type { Settings } from "./index";

export const selectRandomNumber = (
  length: number,
  exclude?: number
): number => {
  const number = Math.floor(Math.random() * length);
  if (number === exclude) return selectRandomNumber(length, exclude);

  return number;
};

const createArray = <T extends () => any>(length: number, fn: T) =>
  Array.from(new Array(length), fn);

export type Chromosome = 1 | -1;
// создать хромосому
const generateChromosome = (): Chromosome =>
  Math.floor(Math.random() * 2) ? 1 : -1;
// создать ДНК особь
const createIndividualDNA = (n: number): Chromosome[] =>
  createArray(n, generateChromosome);

// сформировать особь
export type Individual = {
  dna: Chromosome[];
  fitness: number;
};
export const formIndividual = (
  settings: Settings,
  dna: Chromosome[]
): Individual => {
  const fitness = settings.individualAdaptability(dna);
  return { dna, fitness };
};
// создать особь
const createIndividual = (settings: Settings) => {
  const dna = createIndividualDNA(settings.n);
  return formIndividual(settings, dna);
};
// создать популяцию
export const populate = curry((settings: Settings) =>
  createArray(settings.p, () => createIndividual(settings))
);

export const lifeCycle = (settings: Settings) =>
  pipe(
    crossoverPopulation(settings),
    mutatePopulation(settings),
    reductionPopulation(settings)
  );
