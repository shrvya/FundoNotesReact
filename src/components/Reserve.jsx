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