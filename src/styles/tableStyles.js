import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    filterContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        marginBottom: 2,
    },
    filterInput: {
        flex: '1 0 200px',
    },
    evenRow: {
        backgroundColor: 'lightgrey',
    },
    oddRow: {
        backgroundColor: 'lightblue',
    },
    tableColumn: {
        padding: 1,
    },
}));
