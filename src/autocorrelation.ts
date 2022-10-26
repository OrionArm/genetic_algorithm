import type { Chromosome } from "./genetic_algorithm";

type Value = Chromosome | 0;
type RowValue = Value[];
type DataTable = Record<string, RowValue>;

const addNullToTail = (dna: Chromosome[], nullCount: number): RowValue => {
  const result: RowValue = [...dna];
  Array.from(Array(nullCount)).forEach(() => {
    result.push(0);
  });
  return result;
};

const fillDataTable = (tableRow: RowValue, nullCount: number) => {
  const dataTable: DataTable = {};
  Array.from(Array(nullCount + 1)).forEach((_, index) => {
    const base = [...tableRow];
    const arr = Array(index).fill(0);
    base.splice(0, 0, ...arr);
    base.splice(base.length - arr.length, arr.length);
    dataTable[index] = base;
  });
  return dataTable;
};

const calculateSum = (
  dataTable: DataTable,
  initialGen: Chromosome[]
): number[] => {
  const result: number[] = [];
  if (dataTable[0]) {
    dataTable[0].forEach((_, colIndex) => {
      let mySum = 0;
      Object.keys(dataTable).forEach((frameNumber) => {
        const chromosome = initialGen[Number(frameNumber)] || 0;
        const row = dataTable[frameNumber] || [];
        const colValue = row[colIndex] || 0;
        mySum = colValue * chromosome + mySum;
        result.push(mySum);
      });
    });
  }

  return result;
};
// Значения АКФ
const getAutocorrelationData = (dna: Chromosome[] = []) => {
  const reversedList = [...dna].reverse();
  const neededLen = dna.length * 2 - 1;
  const neededNullsCount = neededLen - dna.length;
  const firstRow = addNullToTail(reversedList, neededNullsCount);
  const dataTable = fillDataTable(firstRow, neededNullsCount);

  return calculateSum(dataTable, dna);
};

// Максимальный уровень боковых лепестков
const getPSL = (autocorrelationData: number[] = []) => {
  const [_first, second] = autocorrelationData.sort().reverse();
  return second;
};

export const calculatePSL = (dna: Chromosome[] = []) => {
  const autocorrelationData = getAutocorrelationData(dna);
  return getPSL(autocorrelationData);
};
