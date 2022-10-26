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

export type CommonParams = {
  adaptability: number;
};
// сформировать особь
export type Individual<T extends CommonParams = CommonParams> = {
  dna: Chromosome[];
  params: T;
};
// создать хромосому
const generateChromosome = (): Chromosome =>
  Math.floor(Math.random() * 2) ? 1 : -1;

// создать ДНК особь
const createIndividualDNA = (n: number): Chromosome[] =>
  createArray(n, generateChromosome);

export const formIndividual = <T extends CommonParams>(
  settings: Settings<T>,
  dna: Chromosome[]
): Individual<T> => {
  const params = settings.setParams(dna);
  return { dna, params };
};
// создать особь
const createIndividual = <T extends CommonParams>(settings: Settings<T>) => {
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
