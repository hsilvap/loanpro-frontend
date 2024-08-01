/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import {
  Table as MUITable,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TablePagination,
  Toolbar,
  Typography,
} from "@mui/material";
import TableHead, { Order } from "./TableHead";
import { RecordTable } from "../../pages/Records";

interface TableProps {
  title: string;
  headCells: any[]; //TODO: use proper generics.
  rows: any[]; //TODO: use proper generics.
  order: Order;
  orderBy: string;
  total: number;
  rowsPerPage: number;
  page: number;
  onButtonClick: (val: string) => void;
  handleRequestSort: (
    _: React.MouseEvent<unknown>,
    property: keyof RecordTable //TODO: use proper generics.
  ) => void;
  handleChangePage: (_: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Table: FC<TableProps> = ({
  title,
  headCells,
  rows,
  order,
  orderBy,
  total = 0,
  rowsPerPage,
  page = 1,
  onButtonClick,
  handleRequestSort,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      </Toolbar>

      <TableContainer>
        <MUITable
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <TableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
          />

          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.user_balance}</TableCell>
                  <TableCell align="right">{row.operation_response}</TableCell>
                  <TableCell align="right">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(row.date))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onButtonClick(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </MUITable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Table;
