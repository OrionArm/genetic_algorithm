import type { Chromosome, Individual, Settings } from "./genetic_algorithm";

export const getPopulationAdaptability = (population: Individual[] = []) =>
  population.reduce((acc, individual) => acc + individual.adaptability, 1);

const stopEvolution = (population: Individual[] = []) => {
  const averageAdaptability =
    getPopulationAdaptability(population) / population.length;
  if (averageAdaptability > 1) return true;
  return false;
};
const individualAdaptability = (dna: Chromosome[]): number =>
  dna.reduce<number>((acc, chromosome) => acc + chromosome, 1);

export const settings: Settings = {
  n: 26, // длина КП
  p: 50, // размер начальной популяции
  psl: 2, // допустимый максимальный уровень положительных боковых лепестков АКФ,
  k: 4, // количество искомых КП, с заданным PSL;
  pk: 0.8, // вероятность скрещивания
  pm: 0.15, // вероятность мутации
  wayOfFormingParentPairs: "random", // способ формирования родительских пар
  selectionMethod: "tournament", // способ селекция
  stopEvolution,
  individualAdaptability,
  maxGeneration: 50,
};
