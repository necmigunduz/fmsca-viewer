import './App.css';
import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Paper, Box } from '@mui/material';
import { companyInfoNames, usdotInfoNames, operatingAuthInfoNames } from './data/columnNames';
import { useStyles } from './styles/tableStyles';

function App() {
  const styles = useStyles();
  // eslint-disable-next-line 
  const [data] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Table>
      <TableHead className={styles.tableHead}>
        <TableRow className={styles.subtitleRow}>
          <TableCell colSpan={8} align="center" className={styles.usdotInfo}>USDOT INFORMATION</TableCell>
        </TableRow>
        <TableRow>
          {usdotInfoNames.map(column => (
            <TableCell key={column}>
              <TextField
                name={column}
                label={column.replace('_', ' ')}
                value={filters[column] || ''}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </TableCell>
          ))}
        </TableRow>
        <TableRow className={styles.subtitleRow}>
          <TableCell colSpan={2} align="center" className={styles.operatingAuthInfo}>OPERATING AUTHORITY INFORMATION</TableCell>
        </TableRow>
        <TableRow>
          {operatingAuthInfoNames.map(column => (
            <TableCell key={column}>
              <TextField
                name={column}
                label={column.replace('_', ' ')}
                value={filters[column] || ''}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </TableCell>
          ))}
        </TableRow>
        <TableRow className={styles.subtitleRow}>
          <TableCell colSpan={7} align="center" className={styles.companyInfo}>COMPANY INFORMATION</TableCell>
        </TableRow>
        <TableRow>
          {companyInfoNames.map(column => (
            <TableCell key={column}>
              <TextField
                name={column}
                label={column.replace('_', ' ')}
                value={filters[column] || ''}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </Table>
  );
}

export default App;
