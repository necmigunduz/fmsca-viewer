import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { companyInfoNames, usdotInfoNames, operatingAuthInfoNames } from './data/columnNames';
import { useStyles } from './styles/tableStyles';
import { loadDataFromExcel } from './utils/loadData';

function App() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('excel/data.xlsx');
        const file = await response.blob();
        const { paginatedData, totalRows } = await loadDataFromExcel(file, page * rowsPerPage, rowsPerPage, filters);
        setData(paginatedData);
        setTotalRows(totalRows);
      } catch (error) {
        console.error('Error loading data: ', error);
      }
    };

    fetchData();
  }, [page, rowsPerPage, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(0);
  };

  const handleChangePage = (__event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Table>
          <TableHead className={styles.tableHead}>
            <TableRow className={styles.subtitleRow}>
              <TableCell colSpan={usdotInfoNames.length} align="center" className={styles.usdotInfo}>USDOT INFORMATION</TableCell>
              <TableCell colSpan={operatingAuthInfoNames.length} align="center" className={styles.operatingAuthInfo}>OPERATING AUTHORITY INFORMATION</TableCell>
              <TableCell colSpan={companyInfoNames.length} align="center" className={styles.companyInfo}>COMPANY INFORMATION</TableCell>
            </TableRow>
            <TableRow>
              {usdotInfoNames.map(column => (
                <TableCell key={column}>
                  <TextField
                    name={column}
                    label={column.split('_').map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ')}
                    value={filters[column] || ''}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
              ))}
              {operatingAuthInfoNames.map(column => (
                <TableCell key={column}>
                  <TextField
                    name={column}
                    label={column.split('_').map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ')}
                    value={filters[column] || ''}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
              ))}
              {companyInfoNames.map(column => (
                <TableCell key={column}>
                  <TextField
                    name={column}
                    label={column.split('_').map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ')}
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
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {usdotInfoNames.map(column => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
                {operatingAuthInfoNames.map(column => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
                {companyInfoNames.map(column => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default App;
