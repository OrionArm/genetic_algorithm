import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import type { Chromosome } from "../genetic_algorithm";

type RowData = {
  id: string;
  dna: Chromosome[];
  psl: number;
};
type Props = {
  rows: RowData[];
  title: string;
};
export const TablePopulation = ({ rows = [], title }: Props) => (
  <>
    <Typography variant="h5" component="h3">
      {title}
    </Typography>
    <Table sx={{ minWidth: 450, maxWidth: 450 }} size="small" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Номер особи</TableCell>
          <TableCell align="right">КП</TableCell>
          <TableCell align="right">Значение PSL</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th">{row.id}</TableCell>
            <TableCell align="right">
              {row.dna.map((chromosome) => chromosome)}
            </TableCell>
            <TableCell align="right">{row.psl}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);
