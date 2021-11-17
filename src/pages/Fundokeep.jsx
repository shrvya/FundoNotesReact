import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamSharpIcon from '@mui/icons-material/ViewStreamSharp';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import Logo from "../asset/Logo.png"
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import service from '../service/noteretrive';
import Note from '../components/Note';
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
const drawerWidth = 170;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f1f3f4',
    '&:hover': {
        backgroundColor: 'white',
    },
    border: ' 1px solid #f1f3f4',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
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
            width: '80ch',
        },
    },
}));
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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

export function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [note, setNote] = useState([]);
    useEffect(() => {
        fetchitem();
    }, []);
    const fetchitem = () => {

        service.notes().then((res) => {

            //   console.log(res.data[0].title);
            setNote(res);
        })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* changed color */}
            <AppBar className="app-bar" open={open} color="" >
                <Toolbar>
                    <IconButton className="menu-icon"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"

                        sx={{
                            marginRight: '2px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={Logo} />

                    <Typography className="g-keep" variant="h6" noWrap component="div" paddingRight='' >
                        Keep
                    </Typography>



                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <span className="appbar-icons"  >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            sx={{
                                marginLeft: 'auto',
                                paddingLeft: '120px'
                            }}>
                            <RefreshIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            sx={{
                                marginLeft: 'auto',
                            }}>
                            <ViewStreamSharpIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            sx={{
                                marginLeft: 'auto',
                            }}>
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </span>

                    <Avatar sx={{ bgcolor: deepPurple[500], marginLeft: 'auto' }
                    }>ss</Avatar>



                </Toolbar>
                {/* add icons here ----------------------*/}

            </AppBar>


            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Notes', 'Remainders', 'Editlabels', 'Archieve', 'Trash'].map((text, index) => (

                        <ListItem button key={text}>
                            <ListItemIcon>

                                {index % 5 === 0 ? < LightbulbOutlinedIcon /> : index % 4 === 0 ? <DeleteTwoToneIcon /> : index % 3 === 1 ? <NotificationsNoneOutlinedIcon /> : index % 3 === 0 ? <ArchiveOutlinedIcon /> : <CreateOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                
                    <Note notes={note} />
               
            </Box>
        </Box>
    );
}
