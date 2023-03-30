import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Products from './components/Products'
import ReviseProduct from "components/addProduct";
import Dashboard from './components/dashboard'
import Layout from "./components/layout";
import Customers from './components/customers'
import Transactios from './components/transactions'
import Geography from './components/geography'
import Overview from "components/overview";
import DailyReport from "components/dailyReport";
import Monthly from "components/monthlyReport"
import Breakdown from "components/breakdown"
import Admins from "components/admins";


function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>

            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to='/dashboard' replace />} />
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/products' element={<Products />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/transactions' element={<Transactios />} />
              <Route path='/geography' element={<Geography />} />
              <Route path='/overview' element={<Overview />} />
              <Route path='/daily' element={<DailyReport/>} />
              <Route path='/monthly' element={<Monthly />} />
              <Route path='/breakdown' element={<Breakdown />} />
              <Route path='/admin' element={<Admins />} />
              <Route path='/product-revise' element={<ReviseProduct />} />
              
            </Route>

          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
