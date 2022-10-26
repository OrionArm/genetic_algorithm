import { curry } from "lodash/fp";
import type { Settings } from "./index";
import type { Individual } from "./utils";

export const reductionPopulation = curry(
  (_settings: Settings, population: Individual[]) => {
    // console.log("reduction", data);
    const sortedPopulation = population.sort(
      (individual1, individual2) =>
        individual1.params.adaptability - individual2.params.adaptability
    );

    return sortedPopulation;
  }
);
