import { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import useGetOperations from "../../hooks/useGetOperations";
import type { Operation } from "../../types/operation";
import { calculate } from "../../api/records";

const disableButton = (
  operation: Operation | undefined,
  first_amount: string,
  second_amount: string
) => {
  if (!operation) return true;
  switch (operation.type) {
    case "addition":
    case "subtraction":
    case "multiplication":
    case "division":
      if (!first_amount || !second_amount) return true;
      break;
    case "square_root":
      if (!first_amount) return true;
      break;
    case "random_string":
      return false;
  }
  return false;
};
const Home = () => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [firstAmount, setFirstAmount] = useState("");
  const [secondAmount, setSecondAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: operations = [], isLoading, error } = useGetOperations();
  const hasError = submitError || error;

  const selectedOperation = operation
    ? operations.find((x) => x.id == +operation)
    : undefined;

  const handleClick = async () => {
    try {
      setIsSubmitting(true);
      setResult(null);
      const data = await calculate({
        operation_id: operation,
        first_input: +firstAmount,
        second_input: +secondAmount,
      });
      setResult(data.result);
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      }
      console.error("Errror!!", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box
      display="flex"
      gap={2}
      border="solid 1px black"
      borderRadius="2rem"
      flexDirection="column"
      padding={10}
    >
      <Typography variant="h4">New operation</Typography>
      <TextField
        required
        id="operation"
        label="Operation"
        select
        value={operation}
        onChange={(e) => {
          setOperation(e.target.value);
          setResult(null);
        }}
        disabled={isLoading}
        sx={{ textAlign: "left" }}
      >
        {operations.map((operation: Operation) => (
          <MenuItem key={operation.id} value={operation.id}>
            {operation.type}
          </MenuItem>
        ))}
      </TextField>
      {selectedOperation && selectedOperation.type !== "random_string" && (
        <>
          <TextField
            value={firstAmount}
            onChange={(e) => setFirstAmount(e.target.value)}
            required
            id="amount"
            data-testid="amount"
            label="First Amount"
            data-test
            type="number"
          />
          {selectedOperation && selectedOperation.type !== "square_root" && (
            <TextField
              value={secondAmount}
              onChange={(e) => setSecondAmount(e.target.value)}
              required
              id="secondAmount"
              data-testid="secondAmount"
              label="Second Amount"
              type="number"
            />
          )}
        </>
      )}
      {!!hasError && (
        <Typography color="red">
          {error ? error.message : submitError}
        </Typography>
      )}
      {!!result && <Typography>Result:{result} </Typography>}

      <Button
        disabled={
          disableButton(selectedOperation, firstAmount, secondAmount) ||
          isSubmitting
        }
        variant="contained"
        onClick={handleClick}
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>
    </Box>
  );
};

export default Home;
