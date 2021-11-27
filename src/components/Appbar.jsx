import React, { useState, useEffect ,  useRef } from "react";
import { styled } from "@mui/material/styles";
import Logo from "../asset/Logo.png";
import {
  Toolbar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
import { useDetectOutsideClick } from '../pages/useDetectOutsideClick';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFilter } from "../action/filter";
import { Menu } from "../pages/Menu";
import Popover from '@mui/material/Popover';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  spacing: 2,
  backgroundColor: "white",
}));

const Appbar = ({ handleDrawerOpen, title,}) => {
  const [search, setSearch] = useState("");
  const myNotes = useSelector((state) => state.allNotes.notes);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
 
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClickSetting = () => setIsActive(!isActive);

const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSetClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleSetClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "set-popover" : undefined;
  useEffect(() => {
    dispatch(setFilter(
        myNotes.filter((item) => {
          return item.title.toLowerCase().includes(search.toLowerCase());
        })
      )
    );
  }, [search, myNotes]);
  function refreshPage() {
    window.location.reload(false);
  }
  const [mode, setMode] = React.useState('light');
 
  return (
    <AppBar position="fixed" style={{background:mode}} >
      <Toolbar style={{ color: "rgba(0, 0, 0, 0.54)" }}>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: "30px",
          }}
        >
          <MenuIcon />
        </IconButton>
        <img src={Logo} alt="" style={{ width: "2em", height: "2.5em" }} />
        <Typography
          variant="h6"
          noWrap
          style={{ fontWeight: "bold", marginLeft: "10px" }}
          component="div"
        >
          {title}
        </Typography>
        <TextField
          placeholder="Search…"
          style={{ width: "50%", margin: "auto", backgroundColor: "#F5F5F5" }}
          variant="outlined"
          size="small"
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: { height: "44px" },
          }}
        />
        <RefreshOutlinedIcon 
        fontSize="medium" 
        style={{ marginLeft: "15px" }}
        onClick={refreshPage}
         />
        <SplitscreenOutlinedIcon
          fontSize="medium"
          style={{ marginLeft: "15px" }}
        />
       
        <SettingsOutlinedIcon
        aria-describedby={id}
          fontSize="medium"
          onClick={handleSetClick}
          style={{ marginLeft: "15px" }}
         
        />
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleSetClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <Typography sx={{ paddingLeft:2}}>Settings</Typography>
       
        <Typography sx={{ paddingLeft:2 }}>Enable Dark theme</Typography> 
        <Typography sx={{ paddingLeft:2 }}>Send Feedback</Typography> 
        <Typography sx={{ paddingLeft:2 }}>Help</Typography>
        <Typography sx={{ paddingLeft:2 }}>App Downloads</Typography>
        <Typography sx={{ paddingLeft:2 }}>Keyboard Shortcuts</Typography>
      </Popover>
      
        
        
        <div className="appbar-div">
          
          <AccountCircleIcon fontSize="large" />
        </div>
        
      </Toolbar>
      
     
    </AppBar>
    
  );
};

export default Appbar;