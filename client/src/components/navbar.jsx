import React, { useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } 
from '@mui/icons-material'
import FlexBetween from './flexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import { AppBar, IconButton, Toolbar, useTheme, InputBase, Button, Box , Menu, MenuItem, Typography} from '@mui/material'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Avatar from '@mui/material/Avatar';


const Navbar = ({user, isSideBarOpen, setIsSideBarOpen}) => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const [anchorElement, setAnchorElement] = useState(null)
    const isOpen = Boolean(anchorElement)
    const handleClick = (event) => setAnchorElement(event.currentTarget)
    const handleClose = () => setAnchorElement(null)

  return (
    <AppBar 
    sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none'
    }}>
    <Toolbar sx={{ justifyContent: 'space-between'}}>
        <FlexBetween>
            <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                <MenuIcon />
            </IconButton>
        
        {/* Left */}
        {/* <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius='9px'
            gap='3rem'
            p='0.1rem 1.5rem'
        >
            <InputBase placeholder='Search...' />
            <IconButton>
                <Search />
            </IconButton>
        </FlexBetween> */}
        </FlexBetween>

        {/* Right */}
        <FlexBetween gap='1.5rem'>
            <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlined sx={{ fontSize: '25px'}} />
                ) : (
                    <LightModeOutlined sx={{ fontSize: '25px'}} />
                )}
            </IconButton>
            <IconButton>
                <SettingsOutlined sx={{ fontSize: '25px'}} />
            </IconButton>
            <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              {/* <Box
                component="img"
                alt="profile"
                // src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              /> */}
              <Avatar sx={{ width: 30, height: 30 }}><SupervisorAccountIcon/></Avatar>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  Jhon
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  Admin
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorElement}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>

    </Toolbar>
    </AppBar>
  )
}

export default Navbar