import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Table from "../../components/Table";

import { Record } from "../../types/record";
import { PaginatedData } from "../../types/common";
import { Order } from "../../components/Table/TableHead";
import { deleteRecord } from "../../api/records";
import useGetRecords from "../../hooks/useGetRecords";
import useGetOperations from "../../hooks/useGetOperations";

export type RecordTable = Partial<Record> & { type: string };

interface HeadCell {
  disablePadding: boolean;
  id: keyof RecordTable;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Id",
  },
  {
    id: "operation_id",
    numeric: false,
    disablePadding: false,
    label: "Operation",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "user_balance",
    numeric: true,
    disablePadding: false,
    label: "Remaining balance",
  },
  {
    id: "operation_response",
    numeric: false,
    disablePadding: false,
    label: "Result",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
];

const Records = () => {
  const { data: operations = [], isLoading: isOperationsLoading } =
    useGetOperations();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof RecordTable>("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [recordToDelete, setRecordToDelete] = React.useState<string>("");
  const {
    data = {} as PaginatedData<Record>,
    isLoading,
    refetch,
  } = useGetRecords({
    per_page: rowsPerPage.toString(),
    page: (page + 1).toString(),
    sort_by: orderBy,
    sort_order: order,
  });

  const isDataLoading = isLoading || isOperationsLoading;
  const rows = React.useMemo(() => {
    if (isDataLoading) return [];
    return data.records.map((record: Record) => ({
      ...record,
      type: operations.find((x) => x.id === record.operation_id)?.type,
    }));
  }, [data, operations, isDataLoading]);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof RecordTable
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => setRecordToDelete("");

  const handleConfirm = async () => {
    try {
      await deleteRecord(recordToDelete);
      await refetch();
      setRecordToDelete("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {isDataLoading ? (
            "Loading"
          ) : (
            <>
              <TextField label="Filter by amount" fullWidth />
              <Table
                headCells={headCells}
                title="Records"
                rows={rows}
                order={order}
                orderBy={orderBy}
                total={data.total ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onButtonClick={setRecordToDelete}
                handleRequestSort={handleRequestSort}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </Box>
      <Dialog open={!!recordToDelete} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting record with id: {recordToDelete} wont refund the credits
            used.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Records;
