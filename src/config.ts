import { getAutocorrelationData, getPSL } from "./autocorrelation";
import type {
  Chromosome,
  Individual,
  CommonParams,
  Settings,
} from "./genetic_algorithm";

export const getPopulationAdaptability = (
  population: Individual<IndividualParams>[] = []
) =>
  population.reduce(
    (acc, individual) => acc + individual.params.adaptability,
    0
  );

export const getAveragePopulationAdaptability = (
  population: Individual<IndividualParams>[] = []
) => population.length / getPopulationAdaptability(population);

const stopEvolution = (population: Individual<IndividualParams>[] = []) => {
  if (getAveragePopulationAdaptability(population) >= 1) return true;
  return false;
};

export type IndividualParams = CommonParams & {
  autocorrelationData: number[];
  psl: number;
};
const setParams = (dna: Chromosome[]): IndividualParams => {
  const autocorrelationData = getAutocorrelationData(dna);
  const psl = getPSL(autocorrelationData);
  const adaptability = dna.length / psl;
  return { adaptability, autocorrelationData, psl };
};

export const settings: Settings<IndividualParams> = {
  n: 26, // длина КП
  p: 50, // размер начальной популяции
  psl: 2, // допустимый максимальный уровень положительных боковых лепестков АКФ,
  k: 4, // количество искомых КП, с заданным PSL;
  pk: 0.8, // вероятность скрещивания
  pm: 0.15, // вероятность мутации
  wayOfFormingParentPairs: "random", // способ формирования родительских пар
  selectionMethod: "tournament", // способ селекция
  maxGeneration: 100, // максимально допустимое число популяций
  stopEvolution,
  setParams,
};
