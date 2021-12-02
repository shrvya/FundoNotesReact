// import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
// import React from "react";
// import  { useState } from "react";
// import '../css/card.css'
// import { useSelector } from "react-redux";
// import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
// import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
// import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
// import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
// import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
// import {  useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
// import { updateNote } from "../action/filter";

// function useComponentVisible(initialIsVisible) {
//   const [isComponentVisible, setIsComponentVisible] = useState(
//     initialIsVisible
//   );
//   const ref = useRef(null);

 
//   const handleClickOutside = event => {
//     if (ref.current && !ref.current.contains(event.target)) {
//       setIsComponentVisible(false);
//     }
//   };

//   useEffect(() => {
   
//     document.addEventListener("click", handleClickOutside, true);
//     return () => {
     
//       document.removeEventListener("click", handleClickOutside, true);
//     };
//   });

//   return { ref, isComponentVisible, setIsComponentVisible };
// }

// const Note = () => {
//   const {
//     ref,
//     isComponentVisible,
//     setIsComponentVisible
//   } = useComponentVisible(true);
//   const [icons, setshowicons] = useState(false);
//   const [click, showicons] = useState(false);
  
//   const handleShowIcon = () => {
//     showicons((prevState) => {
//       return !prevState;
//     });
//   };
  

//    const myNotes = useSelector((state) => state.allNotes.filteredNotes);
//   return (
//     //onclick 
//     <Box sx={{ margin:"5% auto " ,width:"80%"}} ref={ref} >
//       <Grid container spacing={4}>
//         {myNotes.map((item) => {
//           return (

//             <Grid item xs={12} sm={6} md={3} key={item._id} >
            
//                 <Card className="notesCard" >
//                 <CardContent 
//                  onMouseEnter={() => setshowicons(true)}   onMouseLeave={() => setshowicons(false)} >
//                   <Typography variant="h5">{item.title}</Typography>
//                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     {item.content}
//                   </Typography>
//                 </CardContent>
//                 {isComponentVisible &&(icons || click )? (<Grid container 
//                  direction="row"
//                  justifyContent="space-between">
//                 <AddAlertOutlinedIcon/>
//                 <PersonAddAltIcon/>
//                 <PaletteOutlinedIcon/>
//                 <PanoramaOutlinedIcon/>
//                 < ArchiveOutlinedIcon/>
//                 < MoreVertOutlinedIcon/>
//                  </Grid>):null}
                
//               </Card>
            
              
//             </Grid>
//           );//===


//         })}
//       </Grid>
      
//     </Box>
//   );
// };

// export default Note;

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions
} from "@mui/material";
import React from "react";
import '../css/card.css'
import {useSelector} from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {update} from '../service/noteretrive'
import {useDispatch} from "react-redux";
import {  useEffect, useRef , useState} from "react";
import { updateNote } from "../action/filter";
import Noteicons from "./Noteicons";
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

 
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
   
    document.addEventListener("click", handleClickOutside, true);
    return () => {
     
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

const Note = ({value}) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(true);
  const [icons, setshowicons] = useState(false);
  const [click, showicons] = useState(false);
  
  const handleShowIcon = () => {
    showicons((prevState) => {
      return !prevState;
    });
  };
  
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [noteId, setNoteId] = React.useState("")
  const dispatch = useDispatch();
  const data = {
      title: title,
      content: content,
      isTrash:false
  };
  const handleClickOpen = (item) => {
    
      setTitle(item.title);
      setContent(item.content);
      setNoteId(item._id)
      setOpen(true);

  };

  const handleClose = () => {
      setOpen(false);
  };


  const handleUpdate = () => {
    console.log(noteId);
      update(data, noteId).then((res) => {
        
          dispatch(updateNote(res))
          console.log(res);
      }).catch((err) => console.log(err.message));
      handleClose()
  }
  const handleDelete=(item)=>{
    const dataDelete = {
        title: item.title,
        content: item.content,
        isTrash:true
    };
    update(dataDelete, item._id).then((res) => {
        dispatch(updateNote(res))
    }).catch((err) => console.log(err.message));
}
  const notes = useSelector((state) => state.allNotes.filteredNotes);
  return((notes.length > 0) ? (
    <Box sx={{ margin:"5% auto " ,width:"80%"}}  >
          <Grid container
              spacing={4}>
              {
              notes.map((item,index) => {
                if (item.isTrash === false) {
                  return (
                      <Grid item
                       xs={4}//
                          key={
                              item._id
                      }>
                          <Card className="notesCard"
                         
                           onMouseEnter={() => {
                            setHover({ [index]: true });
                          }}
                          onMouseLeave={() => {
                            setHover({ [index]: false });
                          }}
                          
                          
                              // onClick={
                              //     () => {
                              //         handleClickOpen(item)
                              //     }}
                          >
                             <Typography variant="h5" onClick={
                                        () => {
                                            handleClickOpen(item)
                                        }
                                }>
                                        {
                                        item.title
                                    }</Typography>
                                     <Typography sx={
                                            {mb: 1.5}
                                        }
                                        color="text.secondary" onClick={
                                            () => {
                                                handleClickOpen(item)
                                            }
                                    }>
                                        {
                                        item.content
                                    } </Typography>

                              {/* <Typography variant="h6">
                                  {
                                  item.title
                              }</Typography>
                              <Typography sx={{mb: 1.5}}
                                  color="text.secondary">
                                  {
                                  item.content
                              } </Typography> */}
                  {hover[index] ? (
                   <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <IconButton size="small">
                    < AddAlertOutlinedIcon />
                  </IconButton>
                  <IconButton size="small">
                    <PersonAddAltIcon />
                  </IconButton>
                  <IconButton size="small" >
                    <PaletteOutlinedIcon  />
                  </IconButton>
                  <IconButton size="small" >
                    <PanoramaOutlinedIcon  />
                  </IconButton>
                  <IconButton size="small" >
                    < ArchiveOutlinedIcon  />
                  </IconButton>
                  <IconButton size="small"
                  
                  >
                    < DeleteOutlineOutlinedIcon 
                  onClick={()=>{handleDelete(item)}}
                    />
                  </IconButton>
                </div>
                 
                ) : (
                  <div style={{ height: "35px" }}></div>
                )}
            
                 </Card>

                      </Grid>

                  );
                }
              })
          } </Grid>
          <div>
              <Dialog fullWidth maxWidth="sm"
                  open={open}
                  onClose={handleClose}
                  // Allows other things to take focus
                  hideBackdrop
              >

                  <DialogContent>
                      <input className="title" type="text"
                          value={title}
                          onChange={
                              e => setTitle(e.target.value)
                          }
                          name="title"
                          placeholder="Title"/>
                      <textarea className="text-area"
                          value={content}
                          onChange={
                              e => setContent(e.target.value)
                          }
                          name="content"
                          placeholder="Take a note..."/>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={handleClose}>close</Button>
                      <Button onClick={handleUpdate}>Submit</Button>
                  </DialogActions>
              </Dialog>
          </div>
          </Box>
      
  ) : (
      <span>No matching results.</span>
     
  ));

};

export default Note;

//===========
// import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Logo from "../asset/Logo.png";
// import {
//   Toolbar,
//   Typography,
//   IconButton,
//   TextField,
//   InputAdornment,
//   Tooltip,
//   Button,
//   Popover,
// } from "@mui/material";
// import MuiAppBar from "@mui/material/AppBar";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
// import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
// import "../css/appbar.css";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import {setFilter } from "../action/filter";
// // import { listView } from "../actions/noteActions";
// import GridViewIcon from "@mui/icons-material/GridView";
// import { Redirect } from "react-router";

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   spacing: 2,
//   backgroundColor: "white",
// }));

// const Appbar = ({ handleDrawerOpen }) => {
//   const [search, setSearch] = useState("");
//   const myNotes = useSelector((state) => state.allNotes.notes);
//   const title = useSelector((state) => state.allNotes.title);
//   const dispatch = useDispatch();
//   const list = useSelector((state) => state.allNotes.listView);
//   const [logout, setLogout] = useState(false);
//   const handleSearch = (searchValue) => {
//     setSearch(searchValue);
//   };

//   useEffect(() => {
//     dispatch(
//       setFilter(
//         myNotes.filter((item) => {
//           return (
//             item.title.toLowerCase().includes(search.toLowerCase()) ||
//             item.content.toLowerCase().includes(search.toLowerCase())
//           );
//         })
//       )
//     );
//   }, [search, myNotes]);

  // const handleView = () => {
  //   dispatch(listView());
  // };

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handlePopClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setLogout(true);
//   };
//   return (
//     <AppBar position="fixed">
//       <Toolbar style={{ color: "rgba(0, 0, 0, 0.54)" }}>
//         <IconButton
//           aria-label="open drawer"
//           onClick={handleDrawerOpen}
//           edge="start"
//           sx={{
//             marginRight: "30px",
//           }}
//         >
//           <Tooltip title="Main Menu">
//             <MenuIcon />
//           </Tooltip>
//         </IconButton>
//         <img src={Logo} alt="" style={{ width: "2em", height: "2.5em" }} />
//         <Typography
//           variant="h6"
//           noWrap
//           style={{ fontWeight: "bold", marginLeft: "10px" }}
//           component="div"
//         >
//           {title}
//         </Typography>
//         <TextField
//           placeholder="Search…"
//           style={{ width: "50%", margin: "auto", backgroundColor: "#F5F5F5" }}
//           variant="outlined"
//           size="small"
//           onChange={(e) => handleSearch(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Tooltip title="Search">
//                   <IconButton>
//                     <SearchIcon />
//                   </IconButton>
//                 </Tooltip>
//               </InputAdornment>
//             ),
//             style: { height: "44px" },
//           }}
//         />
//         <Tooltip title="Refresh">
//           <RefreshOutlinedIcon
//             fontSize="medium"
//             style={{ marginLeft: "15px" }}
//           />
//         </Tooltip>
//         {!list ? (
//           <Tooltip title="List View">
//             <SplitscreenOutlinedIcon
//               fontSize="medium"
//               // onClick={handleView}
//               style={{ marginLeft: "15px" }}
//             />
//           </Tooltip>
//         ) : (
//           <Tooltip title="Grid View">
//             <GridViewIcon
//               fontSize="medium"
//               // onClick={handleView}
//               style={{ marginLeft: "15px" }}
//             />
//           </Tooltip>
//         )}
//         <Tooltip title="Settings">
//           <SettingsOutlinedIcon
//             fontSize="medium"
//             style={{ marginLeft: "15px" }}
//           />
//         </Tooltip>
//         <div className="appbar-div">
//           <Tooltip title="Account">
//             <IconButton onClick={handlePopClick}>
//               <AccountCircleIcon fontSize="large" />
//             </IconButton>
//           </Tooltip>
//           <Popover
//             open={open}
//             anchorEl={anchorEl}
//             onClose={handlePopClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "left",
//             }}
//           >
//             <Button onClick={handleLogout}>Logout</Button>
//           </Popover>
//         </div>
//       </Toolbar>
//       {logout ? <Redirect to="/login" /> : null}
//     </AppBar>
//   );
// };

// export default Appbar;

// import  React,{ useState, useEffect }  from 'react';
// import '../css/appbar.css'
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Avatar from '@mui/material/Avatar';
// import Logo from '../assets/keep.png'
// import Typography from '@mui/material/Typography';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import Badge from '@mui/material/Badge';
// import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
// import GridViewIcon from "@mui/icons-material/GridView";
// import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { styled} from '@mui/material/styles';
// import MuiAppBar from '@mui/material/AppBar';
// import {TextField,
// InputAdornment,
// } from "@mui/material";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { selectedNote,listView } from "../actions/notesActions";
// import {removeUserSession} from "../utils/Common"
// import {Redirect } from 'react-router-dom'
// const drawerWidth = 240;


// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
//   })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     ...(open && {
//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,
//     }),
//   }));
  




// export default function Appbar(props) {

//   const [search, setSearch] = useState("");
//   const  [signOut,setSignOut]=React.useState(false)
//   const notes = useSelector((state) => state.allNotes.notes);
//   const list = useSelector((state) => state.allNotes.listView);
//   const dispatch = useDispatch();
//   const handleSearch = (searchValue) => {
//     setSearch(searchValue);
//   };
//   useEffect(() => {
//     dispatch(
//       selectedNote(
//         notes.filter((item) => {
//           return (item.title.toLowerCase().includes(search.toLowerCase())||(item.content.toLowerCase().includes(search.toLowerCase())));
//         })
//       )
//     )
//     // eslint-disable-next-line
//    },[search,notes]);
//    const handleView = () => {
//     dispatch(listView());
//   };
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };
  
//   function refreshPage() {
//     window.location.reload(false);
//   }
  

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={()=>{removeUserSession();setSignOut(true)}}>Sign Out</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = 'primary-search-account-menu-mobile';
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Sign out</p>
//       </MenuItem>
//     </Menu>
//   );
 
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar position="fixed"style={{ background: "#ffffff" }}>
//         <Toolbar>
//           <IconButton 
//             color="inherit"
//             aria-label="open drawer"
//             onClick={props.handleDrawerOpen}
//             edge="start"
//             sx={{
//               padding: '12px',
//                color: "#4d4c4c" 
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Avatar alt="FundooNotes" src={Logo} variant="square" style={{ margin:"0px,0px,4px",padding:"0px,6px,0px,0px"}} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ display: { xs: "none", sm: "block" } }}
//           >
//             &nbsp;
//             <span   style={{color:"black",padding:"0px,30px,0px,0px"}}>{props.title}</span>
//           </Typography>
//           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <TextField
//           placeholder="Search…"
//           style={{ width: "50%",padding:"0px,10px,0px,0px"}}
//           variant="outlined"
//           size="small"
//           onChange={(e) => handleSearch(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//             style: { height: "44px",padding:"0px,10px,0px,0px" },
//           }}
//         />
//           <Box sx={{ flexGrow: 1 }} />
//           <Box sx={{ display: { xs: "none", md: "flex" } }}>
//             <IconButton size="large" color="inherit">
//               <Badge>
//                 <RefreshIcon onClick={refreshPage}sx={{ color: "#4d4c4c" }} />
//               </Badge>
//             </IconButton>
//             {!list ? (
//                <IconButton size="large" color="inherit"><Badge>
//           <SplitscreenOutlinedIcon
//             fontSize="medium"
//             onClick={handleView}
//             style={{ marginLeft: "15px", color: "#4d4c4c"}}
//           /> </Badge>
//           </IconButton>
//         ) : ( <IconButton size="large" color="inherit"><Badge>
//           <GridViewIcon
//             fontSize="medium"
//             onClick={handleView}
//             style={{ marginLeft: "15px",color: "#4d4c4c" }}
//           /> </Badge>
//           </IconButton>
//         )}
//             <IconButton size="large" color="inherit">
//               <Badge>
//                 <SettingsSharpIcon sx={{ color: "#4d4c4c" }} />
//               </Badge>
//             </IconButton>
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             <IconButton
//               size="large"
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={handleProfileMenuOpen}
//               color="inherit"
//             >
//               <AccountCircle sx={{ fontSize: 40, color: "#4d4c4c" }} />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>  {renderMobileMenu}
//       {renderMenu}
//       {signOut?<Redirect to="/"/>:null}
      
//    </Box>
    
//   );
// }

import React, { useState,Fragment } from "react";
import {create} from '../service/noteRetrieve'

import { useDispatch } from "react-redux";
import { addNewNote } from "../actions/notesActions";
import { Paper, InputBase, Button, Grid ,IconButton,CardMedia} from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import Popover from '@mui/material/Popover';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import colorPaletteClassName from "./ColorPalette";
import ImageIcon from '@mui/icons-material/Image';
const CreateNote = () => {
    const [titleFieldVisible, setTitleFieldVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file,setFile]=useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [color,setColor]=React.useState("White")
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const showTitleField = () => {
        setTitleFieldVisible(true)
    }
    const hideTitleField = () => {
        setTitleFieldVisible(false)
    }
    const dispatch = useDispatch();

   
    const handleSubmit = e => {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('color', color)
        formData.append('profileImg', file)
        e.preventDefault()
        create(formData).then((res)=>{ if (res.data.status === 200) {
            dispatch(addNewNote(res.data.message))
          } else {
            console.log(res);
          }}).catch((err) => console.log(err.message));
        setTitle("");
        setContent("");
        setColor("White")
        setFile("")
        hideTitleField();
    }
    
    const handleColor=(colorItem)=>{
      setColor(colorItem)
    }
    return (
      <div className="create-notes">
        <Paper className="add-note-container" elevation={5} style={{background:color}}>
       
        {((file !== "" )&&{titleFieldVisible}) ? (
                    <CardMedia
                      component="img"
                      image={URL.createObjectURL(file)}
                      alt="dish"
                     
                    />
                  ) : null}
          <InputBase
            type="text"
            placeholder={titleFieldVisible ? "Title" : "Take a note..."}
            fullWidth
            value={title}
            inputProps={{
              style: { height: "36px" },
            }}
            onFocus={() => showTitleField()}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleFieldVisible && (
            <Grid container>
              <Grid item xs={12}>
                <InputBase
                  type="text"
                  placeholder="Take a note..."
                  fullWidth
                  value={content}
                  multiline={true}
                  inputProps={{
                    style: { height: "36px" },
                  }}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} align="right">
                <IconButton onClick={handleClick}>
                <PaletteIcon/></IconButton>
                <Popover id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}> <Grid container sx={{ p: 1 }}>
          {colorPaletteClassName.map((colorItem,index)=>{
          return(
            <Grid item xs={12} sm={6} md={3} sx={{width:"11px"}} key={index}>
              <IconButton  onClick={()=>{handleColor(colorItem.colorCode)}}>
          <Brightness1Icon style={{ color: colorItem.colorCode }} /></IconButton></Grid>)})} </Grid>
      </Popover>
      <Fragment>
        <input
         
          accept="image/*"
          type="file"
          onChange={(e)=>{setFile( e.target.files[0] )}}
          id="icon-button-file"
          style={{ display: 'none', }}
        />
        <label htmlFor="icon-button-file">
          <Button
           
            component="span"
            size="large"
           
          >
            <ImageIcon color="action" />
          </Button>
        </label>
      </Fragment>
     
      
                            
                      
                <Button
                  style={{ color: "black", textTransform: "none" }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  style={{ color: "black", textTransform: "none" }}
                  onClick={()=>{hideTitleField(); setTitle("");
                  setContent("");
                  setFile("")
                  setColor("White")}}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          )}
        </Paper></div>
      );
}
export default CreateNote