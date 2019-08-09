import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(2),
  },
  root: {
    width: '75%',
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
    overflowX: 'auto',
  },
  rootRight: {
    width: '25%',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    overflowX: 'auto',
  },
  tableHeader: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  table: {
    minWidth: 500,
    // marginBottom: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  rootForm: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 1, 2),
  createRow('Paper (Case)', 10, 3),
  createRow('Waste Basket', 2, 2),
];

const Discount = 15;

const invoiceSubtotal = subtotal(rows);
const invoiceDiscount = (Discount * invoiceSubtotal) / 100;
const invoiceTotal = invoiceSubtotal - invoiceDiscount;

export default function InvoiceCreateMode() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    customerName: '',
    productName: ' ',
  });

  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Paper className={classes.wrapper}>
      <Typography variant="subtitle2" gutterBottom className={classes.tableHeader}>Invoice id</Typography>

      <form className={classes.rootForm} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="customer-name">Select Name</InputLabel>
          <Select
            value={values.customerName}
            onChange={handleChange}
            inputProps={{
              name: 'customerName',
              id: 'customer-name',
            }}
          >
            <MenuItem value={`Name Surname 1`}>Name Surname 1</MenuItem>
            <MenuItem value={`Name Surname 2`}>Name Surname 2</MenuItem>
            <MenuItem value={`Name Surname 3`}>Name Surname 3</MenuItem>
          </Select>
        </FormControl>
      </form>

      <div style={{display: "flex"}}>
        <Paper className={classes.root}>

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell align="right">Q-ty</TableCell>
                <TableCell align="right">Price ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

                <TableRow >
                  <TableCell>

                    <form className={classes.rootForm} autoComplete="off">
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="product-name">Add Product</InputLabel>
                        <Select
                          value={values.productName}
                          onChange={handleChange}
                          inputProps={{
                            name: 'productName',
                            id: 'product-name',
                          }}
                        >
                          <MenuItem value={`Name Surname 1`}>car</MenuItem>
                          <MenuItem value={`Name Surname 2`}>phone</MenuItem>
                          <MenuItem value={`Name Surname 3`}>water</MenuItem>
                        </Select>
                      </FormControl>
                    </form>

                  </TableCell>
                  <TableCell align="right"> q-ty</TableCell>
                  <TableCell align="right">
                    price
                    {/*{ccyFormat(row.price)}*/}
                  </TableCell>
                </TableRow>


              <TableRow>
                <TableCell  />
                <TableCell colSpan={1}>Total</TableCell>
                <TableCell align="right" >{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button variant="contained" color="secondary" className={classes.button}>Save Invoice</Button>
        </Paper>



        <Paper className={classes.rootRight}>
          <Typography variant="h6" align="center" gutterBottom className={classes.tableHeader}>Discount (%)</Typography>
          <Typography variant="h4" align="center" gutterBottom className={classes.tableHeader}>15</Typography>
        </Paper>
      </div>
    </Paper>
  );
}