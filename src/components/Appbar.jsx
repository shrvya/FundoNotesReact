import * as React from 'react';
import '../css/appbar.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Logo from '../asset/Logo.png'
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import RefreshIcon from '@mui/icons-material/Refresh';
import Badge from '@mui/material/Badge';
import ViewStreamSharpIcon from '@mui/icons-material/ViewStreamSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
 
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
  
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#ebe8e8',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Appbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const menuItems = [
    { 
      text: 'Notes', 
      icon: <LightbulbOutlinedIcon/>, 
      path: '/' 
    },
    { 
      text: 'Remainders', 
      icon: < NotificationsNoneOutlinedIcon />, 
      path: '/create' 
    },
    { 
      text: 'Edit labels', 
      icon: <CreateOutlinedIcon />, 
      path: '/create' 
    },
    { 
      text: 'Archieve', 
      icon: < ArchiveOutlinedIcon/>, 
      path: '/login' 
    },
    { 
      text: 'Trash', 
      icon: <DeleteIcon />, 
      path: '/create' 
    },
  ];
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}style={{ background: "#ffffff" }}>
        <Toolbar>
          <IconButton 
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
               color: "#4d4c4c" 
            }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="FundooNotes" src={Logo} variant="square" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            &nbsp;
            <span className="fundooNotesDash">FundooNotes</span>
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#4d4c4c" }} />
            </SearchIconWrapper>
            <StyledInputBase
              style={{ maxWidth: 800, color: "#6e6a6a" }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              color="secondary"
              margin="dense"
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit">
              <Badge>
                <RefreshIcon sx={{ color: "#4d4c4c" }} />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge>
                <ViewStreamSharpIcon sx={{ color: "#4d4c4c" }} />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge>
                <SettingsSharpIcon sx={{ color: "#4d4c4c" }} />
              </Badge>
            </IconButton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ fontSize: 40, color: "#4d4c4c" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>  {renderMobileMenu}
      {renderMenu}
    
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
       

        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
             // onClick={() => history.push(item.path)}
              //className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
        
      </Drawer>
   </Box>
    
  );
}