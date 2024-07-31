import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    tableHead: {
        '& th': {
            minWidth: 200,
        }
    },
    subtitleRow: {
        fontWeight: 'bold',
    },
    usdotInfo: {
        backgroundColor: '#e0f7fa',
    },
    operatingAuthInfo: {
        backgroundColor: '#ffecb3',
    },
    companyInfo: {
        backgroundColor: '#c8e6c9',
    }
});