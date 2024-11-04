import { makeStyles } from "@mui/styles";
import login_background from "../images/login_background.jpg";

export const Colors = {
  primaryDark: "#F15F4B",
  primaryLight: "#F15F4B",
  white: "#fff",
  whiteDark: "#F5F5F5",
  grayLight: "#ECEAEA",
  gray: "#A3A3A3",
  grayDark: "#666666",
  black: "#090A0A",
  greenLight: "#46BC67",
  greenDark: "#34A853",
  greenDark2: "#0A882D",
  green_parrot: "#5DC709",
  red: "#FF0000",
  red_a: "#eb2f06",
  blueFacebook: "#1877F2",
  skyblue: "#46A6FF",
  bodyColor: "#EDF2F5",
  splash_background: "#FFEDCA",
  light_Pink: "#f7e7d7",
  dark_Pink: "#EFD0B0",
  darkBlue: "#1B1B45",
};

export const useStyles = makeStyles({
  loginBox: {
    padding: "2rem 2rem 2rem 2rem",
    maxWidth: "30rem",
    borderRadius: 20,
    backgroundColor: "white",
  },
  loginheadingContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  login: {
    fontSize: "1.2rem",
    marginTop: 10,
  },

  loginheading: {
    fontSize: "2rem",
    fontFamily: "Philosopher",
  },

  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    padding: 20,
    color: "#000",
  },
  box: {
    width: "100%",
    height: "auto",
    padding: 10,
    background: "#fff",
    boxShadow: "0px 0px 5px lightgrey",
    borderRadius: 15,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  heading: {
    fontSize: "2rem",
    fontFamily: "Philosopher",
  },
  addButton: {
    padding: "5px 10px",
    backgroundColor: Colors.primaryDark,
    borderRadius: 10,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    fontFamily: "Philosopher",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  addButtontext: {
    marginLeft: 5,
  },
  submitbutton: {
    background: Colors.primaryLight,
    width: "100%",
    padding: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    color: Colors.white,
    fontFamily: "Philosopher",
    fontSize: "1rem",
    cursor: "pointer",
  },
  denyButton: {
    background: Colors.bodyColor,
    width: "100%",
    padding: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    color: Colors.black,
    fontFamily: "Philosopher",
    fontSize: "1rem",
    cursor: "pointer",
  },
  addNewButton: {
    background: "blue",
    padding: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    color: Colors.white,
    fontFamily: "Philosopher",
    fontSize: "1rem",
    cursor: "pointer",
  },
  closeButton: {
    color: Colors.primaryDark,
    cursor: "pointer",
    padding: 5,
    "&:hover": {
      backgroundColor: Colors.grayLight,
      borderRadius: 10,
    },
  },

  // fileInputLabel: {
  //   border: "1px solid #ccc",
  //   padding: "10px",
  //   cursor: "pointer",
  //   display: "inline-block",
  //   width: "100%"
  // },

  uploadContainer: {
    display: "flex",
    alignItems: "center",
  },
  uploadImageButton: {
    background: Colors.dark_Pink,
    // width: "100%",
    padding: "0.5rem 1rem",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    color: Colors.black,
    fontFamily: "Philosopher",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  errorstyles: {
    color: "#d32f2f",
    fontSize: "0.8rem",
    fontFamily: "arial",
    lineHeight: 1.66,
    letterSpacing: "0.03333rem",
    textAlign: "left",
    marginTop: "3px",
    marginRight: "14px",
    marginBottom: 0,
    marginLeft: "14px",
  },
  chips: {
    margin: "2px",
  },
  checkbox: {
    color: '#333',
    fontSize: "10px",
    fontFamily: "Philosopher",
  }
  ,
  // Material Table Styling
  tableHead: {
    fontWeight: "500", fontSize: "1.5rem", color: "black", fontFamily: "Roboto"
  },
  tableBody: {
    fontSize: "1rem", color: "rgba(0, 0, 0, 0.6)", whiteSpace: "nowrap", boxShadow: "none"
  },
  tableAction: {
    color: Colors.white,
    textAlign: "center",
    padding: "5px 7px",
    fontSize: "1.2rem",
    fontFamily: "Philospher",
    borderRadius: 5,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2px"
  },
  hidePlaceholder: {
    '& input::-webkit-input-placeholder': { // Chrome/Opera/Safari
      color: 'transparent',
    },
  },


  veribgred: {
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "Philospher",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "red"
  }
});

export const propStyles = {
  tableStyles: {
    // sorting: false,
    // search: true,
    // searchFieldAlignment: "right",
    // filtering: true,
    // paging: true,
    // pageSize: 5,
    // paginationType: "stepped",
    // showFirstLastPageButtons: true,
    // paginationPosition: "bottom",
    // exportButton: false,
    // exportAllData: false,
    // exportFileName: "Category data",
    // addRowPosition: "first",
    // actionsColumnIndex: -1,
    // selection: false,
    // showSelectAllCheckbox: false,
    // headerStyle: { fontSize: "1.2rem", fontWeight: 600, whiteSpace: "nowrap" },
    // tableLayout: "auto",

    sorting: true,
    search: true,
    actionsColumnIndex: -1,
    exportButton: true, exportAllData: true,
    exportFileName: "Sale Summary data",
    searchFieldAlignment: "right",
    filtering: false,
    paging: true,
    pageSize: 5,
    paginationType: "stepped",

    showFirstLastPageButtons: true,
    paginationPosition: "bottom",
    addRowPosition: "first",
    selection: false,
    showSelectAllCheckbox: false,

    headerStyle: {
      whiteSpace: 'nowrap', fontSize: "1rem", fontWeight: "600"
    }
  },
};

export const dataTableCustomStyles = {
  cells: {
    style: {
      fontSize: '12px',
      // padding: "10px 0",
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.6)", whiteSpace: "nowrap",
    },
  },
  rows: {
    style: {
      minHeight: '72px', // override the row height,
      fontFamily: "Philosopher",
    },
  },
  headRow: {
    style: {
      whiteSpace: 'nowrap',
      fontSize: "0.8rem",
      fontWeight: "600", color: "#000",
      fontFamily: "Roboto",
    }
  }
};