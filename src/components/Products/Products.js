import React, {Component} from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../../store/actions/products';




const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(productName, price ) {
  return { productName, price };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

class Products extends Component {

  componentDidMount() {
    this.props.fetchProducts();
  }

  render () {
    // const classes = useStyles();
    const {
      isLoading,
      error,
      products
    } = this.props;



    return (
      <>
      <Paper >
        <Table >
          <TableHead>
            <TableRow>
              <StyledTableCell >Product Name</StyledTableCell>
              <StyledTableCell >Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {products.map(product => (
              <StyledTableRow key={product.id}>
                <StyledTableCell component="th" scope="row">{product.name}</StyledTableCell>
                <StyledTableCell >{product.price}</StyledTableCell>
              </StyledTableRow>
            ))}

          </TableBody>
        </Table>
      </Paper>


        </>
    );
  }

}

const mapStateToProps =  state => {
  return {
    products: state.product.products,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchProducts
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products);