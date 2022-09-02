import { curry } from "lodash/fp";
import type { Settings } from "./index";
import { selectRandomNumber, formIndividual, Individual } from "./utils";

const selectReadyToCrossover = (
  settings: Settings,
  population: Individual[]
) => {
  const notReadyToCrossover: Individual[] = [];
  const readyToCrossover: Individual[] = [];
  population.forEach((individual) => {
    if (Math.random() < settings.pm) {
      notReadyToCrossover.push(individual);
    } else {
      readyToCrossover.push(individual);
    }
  });
  const isNotEvenPairNumbers = readyToCrossover.length % 2;
  if (isNotEvenPairNumbers) {
    const last = readyToCrossover.pop();
    if (last) notReadyToCrossover.push(last);
  }
  return { readyToCrossover, notReadyToCrossover };
};

const collectPairList = (readyToCrossover: Individual[]) => {
  const crossoverPairList: Pair[] = [];
  while (readyToCrossover.length) {
    const father = readyToCrossover.pop();
    const motherIndex = selectRandomNumber(readyToCrossover.length);
    const mother = readyToCrossover.splice(motherIndex, 1)[0];
    if (father && mother) crossoverPairList.push([father, mother]);
  }

  return crossoverPairList;
};
type Pair = [Individual, Individual];
const crossoverPair =
  (settings: Settings) =>
  ([father, mother]: Pair) => {
    const gapIndex = selectRandomNumber(father.dna.length, 0);
    const fatherDNA1 = father.dna.slice(gapIndex, father.dna.length);
    const fatherDNA2 = father.dna.slice(0, gapIndex);
    const motherDNA1 = mother.dna.slice(gapIndex, mother.dna.length);
    const motherDNA2 = mother.dna.slice(0, gapIndex);
    const children1DNA = [...fatherDNA1, ...motherDNA2];
    const children2DNA = [...motherDNA1, ...fatherDNA2];
    const children1 = formIndividual(settings, children1DNA);
    const children2 = formIndividual(settings, children2DNA);

    return [children1, children2];
  };

export const crossoverPopulation = curry(
  (settings: Settings, population: Individual[]) => {
    const { readyToCrossover, notReadyToCrossover } = selectReadyToCrossover(
      settings,
      population
    );
    const crossoverPairList = collectPairList(readyToCrossover);
    const children = crossoverPairList.map(crossoverPair(settings)).flat();

    return [...notReadyToCrossover, ...children];
  }
);
