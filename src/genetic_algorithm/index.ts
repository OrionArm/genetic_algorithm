import type { Chromosome, Individual, CommonParams } from "./utils";
export type Settings<T extends CommonParams = CommonParams> = {
  n: number; // длина КП
  p: number; // размер начальной популяции
  psl: number; // допустимый максимальный уровень положительных боковых лепестков АКФ
  k: number; // количество искомых КП, с заданным PSL;
  pk: number; // вероятность скрещивания
  pm: number; // вероятность мутации
  wayOfFormingParentPairs: string; // способ формирования родительских пар
  selectionMethod: string; // способ селекция
  maxGeneration: number; // максимально допустимое число популяций
  stopEvolution: (population: Individual[]) => boolean;
  setParams: (dna: Chromosome[]) => T;
};

export { start } from "./algorithm";
export * from "./utils";
