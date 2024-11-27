import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import illustration_empty from "../images/illustration-empty.svg";
import calculator_icon from "../images/icon-calculator.svg";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PMT from "../utils/pmt.js";

type Props = {
  _amount: number;
  _terms: number;
  _rate: number;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberWithThousandsSeparator = React.forwardRef<
  NumericFormatProps,
  CustomProps
>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
            name: "",
          },
        });
      }}
      thousandSeparator
    />
  );
});

const MainPage: React.FC<Props> = ({ _amount, _terms, _rate }) => {
  const DESCRIPTION_EMPTY =
    "Complete the form and click 'calculate repayments' to see what your monthly repayments would be.";
  const RESULT_TEXT =
    "Your results are shown below based on the information you provided. To adjust the results, edit the form and click 'calculate repayments' again.";

  const [amount, setAmount] = React.useState(_amount);
  const [terms, setTerms] = React.useState(_terms);
  const [rate, setRate] = React.useState(_rate);
  const [repayment, setRepayment] = React.useState(0);
  const [totalRepayment, setTotalRepayment] = React.useState(repayment * terms);

  const calculateRepayment = () => {
    if (amount > 0 && terms > 0 && rate > 0) {
      let repayment = -PMT(rate / 100 / 12, terms * 12, amount, 0, 0);
      setRepayment(repayment);
      setTotalRepayment(repayment * terms * 12);
    }
  };

  return (
    <Box className="flex min-w-screen min-h-screen bg-secondary-light justify-center items-center">
      <Box className="flex flex-col md:flex-row items-stretch w-max h-max lg:h-3/4 md:w-[90%] lg:w-3/4 md:rounded-2xl bg-white">
        <FormControl className="flex justify-center w-full min-h-full py-2 bg-transparent">
          <Stack spacing={3} className="w-full p-6 md:p-8 lg:p-10">
            <Box>
              <Typography variant="h6" className="text-secondary font-bold">
                Mortgage Calculator
              </Typography>
              <Link href="/" className="font-normal text-sm text-slate-500">
                Clear All
              </Link>
            </Box>
            <TextField
              id="mortgage-amount"
              label="Mortgage Amount"
              slotProps={{
                input: {
                  inputComponent: NumberWithThousandsSeparator as any,
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                  inputProps: {
                    className: "px-2",
                  },
                },
              }}
              defaultValue={amount}
              value={amount}
              onChange={(event) => setAmount(parseFloat(event.target.value))}
            />
            <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
              <TextField
                id="Mortgage Term"
                label="Mortgage Term"
                slotProps={{
                  htmlInput: {
                    type: "number",
                  },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">years</InputAdornment>
                    ),
                  },
                }}
                defaultValue={terms}
                value={terms}
                onChange={(event) => setTerms(parseInt(event.target.value))}
              />
              <TextField
                id="Interest Rate"
                label="Interest Rate"
                slotProps={{
                  htmlInput: {
                    type: "number",
                  },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  },
                }}
                defaultValue={rate}
                value={rate}
                onChange={(event) => setRate(parseFloat(event.target.value))}
              />
            </Stack>
            <Box className="flex flex-col space-y-1 text-slate-700">
              <FormLabel id="mortgage-type-radio-buttons-group-label">
                Mortgage Type
              </FormLabel>
              <RadioGroup
                defaultValue="repayment"
                name="mortgage-type"
                className="flex flex-col space-y-2"
              >
                <Box className="border px-3 py-1">
                  <FormControlLabel
                    value="repayment"
                    control={<Radio />}
                    label="Repayment"
                    className="h-full w-full"
                  />
                </Box>
                <Box className="border px-3 py-1">
                  <FormControlLabel
                    value="interest-only"
                    control={<Radio />}
                    label="Interest Only"
                    className="h-full w-full"
                  />
                </Box>
              </RadioGroup>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <Box
                  component="img"
                  src={calculator_icon}
                  alt="calculator icon"
                  className="w-6 h-6"
                />
              }
              onClick={calculateRepayment}
            >
              Calculate Repayments
            </Button>
          </Stack>
        </FormControl>
        <Box className="w-full min-h-full bg-secondary md:rounded-r-2xl md:rounded-bl-[4rem]">
          <Box className="w-fit h-full p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center">
            {repayment > 0 ? (
              <Stack
                spacing={{
                  xs: 2,
                  md: 3,
                  lg: 4,
                }}
                direction="column"
              >
                <Stack spacing={1}>
                  <Typography variant="h6" className="text-white font-bold">
                    Your results
                  </Typography>
                  <Typography variant="body2" className="text-secondary-light">
                    {RESULT_TEXT}
                  </Typography>
                </Stack>
                <Card
                  className="w-full p-4 bg-secondary-dark border-t-4 border-t-primary"
                  elevation={5}
                >
                  <Stack
                    spacing={1}
                    direction="column"
                    divider={<Divider className="bg-secondary-light" />}
                  >
                    <Stack spacing={1} className="p-4">
                      <Typography
                        variant="body2"
                        className="text-secondary-light font-semibold"
                      >
                        Your monthly repayments
                      </Typography>
                      <Typography
                        variant="h4"
                        className="text-primary font-bold"
                      >
                        Rp{repayment.toLocaleString()}
                      </Typography>
                    </Stack>
                    <Stack spacing={1} className="p-4">
                      <Typography
                        variant="body2"
                        className="text-secondary-light font-semibold"
                      >
                        Total you'll repay over the term
                      </Typography>
                      <Typography variant="h6" className="text-white">
                        Rp{totalRepayment.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Stack>
            ) : (
              <>
                <Box
                  component="img"
                  src={illustration_empty}
                  alt="graph"
                  className="w-full h-52 bg-transparent p-2"
                />
                <Stack
                  spacing={1}
                  className="flex flex-col items-center text-center text-white"
                >
                  <Typography variant="h6" className="font-bold">
                    Results shown here
                  </Typography>
                  <Typography variant="body2">{DESCRIPTION_EMPTY}</Typography>
                </Stack>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
