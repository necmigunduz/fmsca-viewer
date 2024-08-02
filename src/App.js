import React, { useEffect, useState, useCallback } from 'react';
import { AutoSizer, Column, Table as VirtualizedTable } from 'react-virtualized';
import { TablePagination, TextField, CircularProgress } from '@mui/material';
import 'react-virtualized/styles.css'; // only needs to be imported once
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
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('excel/data2.xlsx');
      const file = await response.blob();
      const { paginatedData, totalRows } = await loadDataFromExcel(file, page * rowsPerPage, rowsPerPage, filters);
      setData(paginatedData);
      setTotalRows(totalRows);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data: ', error);
      setLoading(false);
    }
  }, [page, rowsPerPage, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      <div className={styles.filterContainer}>
        {usdotInfoNames.concat(operatingAuthInfoNames, companyInfoNames).map(column => (
          <TextField
            key={column}
            name={column}
            label={column.split('_').map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ')}
            value={filters[column] || ''}
            onChange={handleFilterChange}
            variant="outlined"
            size="small"
            className={styles.filterInput}
            fullWidth
          />
        ))}
      </div>
      {loading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress />
          <span>Data is loading!</span>
        </div>
      ) : (
        <>
          <AutoSizer disableHeight>
            {({ width }) => (
              <VirtualizedTable
                width={width}
                height={400}
                headerHeight={40}
                rowHeight={30}
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                rowClassName={({ index }) => (index % 2 === 0 ? styles.evenRow : styles.oddRow)}
              >
                {usdotInfoNames.map(column => (
                  <Column
                    key={column}
                    label={column.split('_').map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ')}
                    dataKey={column}
                    width={width / (usdotInfoNames.length + operatingAuthInfoNames.length + companyInfoNames.length)}
                    className={styles.tableColumn}
                  />
                ))}
                {operatingAuthInfoNames.map(column => (
                  <Column
                    key={column}
                    label={column.split('_').map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ')}
                    dataKey={column}
                    width={width / (usdotInfoNames.length + operatingAuthInfoNames.length + companyInfoNames.length)}
                    className={styles.tableColumn}
                  />
                ))}
                {companyInfoNames.map(column => (
                  <Column
                    key={column}
                    label={column.split('_').map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ')}
                    dataKey={column}
                    width={width / (usdotInfoNames.length + operatingAuthInfoNames.length + companyInfoNames.length)}
                    className={styles.tableColumn}
                  />
                ))}
              </VirtualizedTable>
            )}
          </AutoSizer>
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
      )}
    </>
  );
}

export default App;
