import { Color } from "../colors";

export const DataTableCustomStyles = {
    cells: {
        style: {
            textAlign: "center",
            color: Color.datatableFontColor, whiteSpace: "nowrap",
            fontFamily: 'Philosopher',
            width: "150px",
            fontSize: "15px"
        },
    },
    rows: {
        style: {
            minHeight: '65px',
            backgroundColor: "#fff",
            fontFamily: 'Philosopher'
        },
    },
    headRow: {
        style: {
            whiteSpace: 'nowrap',
            fontSize: "15.5px",
            fontWeight: "500", color: Color.white,
            backgroundColor: Color.primary,
            fontFamily: 'Philosopher'
        }
    }
};