import type { Chromosome, Individual } from "./utils";
export type Settings = {
  n: number; // длина КП
  p: number;  // размер начальной популяции
  psl: number; // допустимый максимальный уровень положительных боковых лепестков АКФ
  k: number; // количество искомых КП, с заданным PSL;
  pk: number; // вероятность скрещивания
  pm: number; // вероятность мутации
  wayOfFormingParentPairs: string; // способ формирования родительских пар
  selectionMethod: string; // способ селекция
  populationFitness: (population: Individual[])=> number;
  individualFitness: (dna: Chromosome[])=> number;
  maxGeneration: number;
};

export {start} from './algorithm';
export * from './utils';
