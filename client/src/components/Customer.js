import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell><img src={this.props.image} alt="profile" /></TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.email}</TableCell>
        <TableCell>{this.props.password}</TableCell>
        <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></TableCell>
      </TableRow>
    );
  }
}

export default Customer;