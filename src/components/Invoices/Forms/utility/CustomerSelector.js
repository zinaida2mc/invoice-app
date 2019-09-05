import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { getCustomers } from "../../../../store/customers/actions";
import { getCustomersArray } from "../../../../store/customers/selectors";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { styles } from './styles';



const CustomerSelector = ({getCustomers, field}) => {
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const customers = useSelector(state => getCustomersArray(state))


  return (
    <FormControl style={styles.formControl}>
      <InputLabel htmlFor={field.name}>Select Name</InputLabel>
      <Select
        {...field}
        id={field.name}
        margin="dense"
        style={styles.selectEmpty}
      >
        {
          customers.map(customer => (
            <MenuItem key={customer._id} value={customer._id}>{customer.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCustomers
  }, dispatch);

export default connect(null, mapDispatchToProps)(CustomerSelector);