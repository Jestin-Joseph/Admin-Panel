import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./flexBetween";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch, transactionsInput, setTransactionsInput, setTransactionSearch }) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search with User ID"
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

       
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;


// import React from "react";
// import { Search } from "@mui/icons-material";
// import { IconButton, TextField, InputAdornment } from "@mui/material";
// import {
//   GridToolbarDensitySelector,
//   GridToolbarContainer,
//   GridToolbarExport,
//   GridToolbarColumnsButton,
// } from "@mui/x-data-grid";
// import FlexBetween from "./flexBetween";

// const DataGridCustomToolbar = ({ searchInputID, setSearchInputID, setSearchID }) => {
//   return (
//     <GridToolbarContainer>
//       <FlexBetween width="100%">
//         <FlexBetween>
//           <GridToolbarColumnsButton />
//           <GridToolbarDensitySelector />
//           <GridToolbarExport />
//         </FlexBetween>
//         <TextField
//           label="Search with User ID"
//           sx={{ mb: "0.5rem", width: "15rem" }}
//           onChange={(e) => setSearchInputID(e.target.value)}
//           value={searchInputID}
//           variant="standard"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={() => {
//                     setSearchID(searchInputID);
//                     setSearchInputID("");
//                   }}
//                 >
                
                
                
//                   <Search />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
        

//       </FlexBetween>
      
//     </GridToolbarContainer>
//   );
// };

// export default DataGridCustomToolbar;