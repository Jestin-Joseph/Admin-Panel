import React, { useState} from 'react'
import { Box, FormControl, MenuItem, InputLabel, Select } from '@mui/material'

import OverviewChart from './overviewChart'
import Header from './Header'

const Overview = () => {
  const [view, setView] = useState('units')
  return (
    <Box sx={{padding: '1rem 1rem'}}>
        <Header title='OVERALL STATS' subtitle='Overview of general revenue and profit' />
        <Box height='73vh'>
          <FormControl sx={{ mt: '0.5rem'}} >
            <InputLabel>View</InputLabel>
            <Select value={view} label='View' onChange={(e) => setView(e.target.value)}>
              <MenuItem value='sales'>Sales</MenuItem>
              <MenuItem value='units'>Units</MenuItem>
            </Select>
          </FormControl>
          <OverviewChart view={view} />
        </Box>
    </Box>
  )
}

export default Overview