import { FC } from "react";
import {
  TableRow,
  TableCell,
  TableSortLabel,
  TableHead as MUITableHead,
} from "@mui/material";
import { RecordTable } from "../../../pages/Records";

export type Order = "asc" | "desc";

interface TableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof RecordTable
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headCells: any[]; //TODO: use proper generics.
}

const TableHead: FC<TableHeadProps> = (props) => {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler =
    (property: keyof RecordTable) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <MUITableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox"></TableCell>
      </TableRow>
    </MUITableHead>
  );
};

export default TableHead;
