import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia
} from "@mui/material";
import React, { Fragment } from "react";
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
import { styled } from '@mui/material/styles';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Popup from "reactjs-popup";
import Palette from "./Pallete";
import Brightness1Icon from '@mui/icons-material/Brightness1'
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';
import GridViewIcon from "@mui/icons-material/GridView";
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
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
const Input = styled('input')({
  display: 'none',
});
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [noteId, setNoteId] = React.useState("")
  const [color,setColor]=React.useState("White")
  const dispatch = useDispatch();
  const data = {
      title: title,
      content: content,
      isTrash:false,
      color:color,
      
  };
  const handleClick = (event,item) => {
    setTitle(item.title);
    setContent(item.content);
    setColor(item.color)
    setNoteId(item._id)
  };
  const handleImage=(itemf)=>{
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('color', color)
    formData.append('profileImg', itemf)
    update(formData, noteId).then((res) => {
        dispatch(updateNote(res))
    }).catch((err) => console.log(err.message));
}
  const handleClickOpen = (item) => {
    
      setTitle(item.title);
      setContent(item.content);
      setNoteId(item._id)
      setOpen(true);
      setColor(item.color)
  };

  const handleClose = () => {
      setOpen(false);
  };


  const handleUpdate = () => {
    
      update(data, noteId).then((res) => {
        
          dispatch(updateNote(res))
         
      }).catch((err) => console.log(err));
      handleClose()
  }
  const handlePopClick = (event) => {
    
    setAnchorEl(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };
  const handleDelete=(item)=>{
    const dataDelete = {
        title: item.title,
        content: item.content,
        isTrash:true,
        color:item.color
    };
    update(dataDelete, item._id).then((res) => {
      console.log(res);
        dispatch(updateNote(res))
    }).catch((err) => console.log(err.message));
}

const popopen = Boolean(anchorEl);
  const id = popopen ? 'simple-popover' : undefined;
  const notes = useSelector((state) => state.allNotes.filteredNotes);
  const listView = useSelector((state) => state.allNotes.listView);
  return((notes.length > 0) ? (
    <Box sx={{ margin:"5% auto " ,width:"80%"}}  >
          <Grid container
              spacing={4} justifyContent={listView ? "center" : null}>
              {
              notes.map((item,index) => {
                if (item.isTrash === false) {
                  return (
                      <Grid item
                       xs={12} md={listView ? 8 : 3}
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
                      
                          style={{background:item.color}} 
                          
                             
                          >
                                  {(item.profileImg !== undefined ) ? (
                    <CardMedia
                      component="img"
                      image={`http://localhost:4000/images/${item.profileImg}`}
                      alt="dish"style={{  maxwidth: 238,
                        maxHeight: 238 }}
                    />
                  ) : null}
                               
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

                              
                              
                  {hover[index] ? (
                   <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <IconButton size="small">
                    < AddAlertOutlinedIcon />
                  </IconButton>
                  <IconButton size="small">
                    <PersonAddAltIcon />
                  </IconButton>
                  <IconButton size="small" onClick={handlePopClick}>
                    <PaletteOutlinedIcon   />
                  </IconButton>
                  <Popover
         id={id}
         open={popopen}
         anchorEl={anchorEl}
         onClose={handlePopClose}
         anchorOrigin={{
           vertical: 'bottom',
           horizontal: 'left',
         }}>
            <Grid container sx={{ p: 1 }}>
          {Palette.map((colorItem,index)=>{
            
          return(
            <Grid item xs={12} sm={3} md={3} sx={{width:"11px"}} key={index}>
              <IconButton  onClick={()=>{setColor(colorItem.colorName);
              
                setTitle(item.title);
                setContent(item.content);
                setNoteId(item._id)
                handleUpdate()
               }}>
          <Brightness1Icon style={{ color: colorItem.colorCode }} />
          </IconButton>
          </Grid>)})}
           </Grid>
      </Popover>
      <Fragment>
      <label htmlFor="icon-button-file" >
      <Input accept="image/*" id="icon-button-file" type="file"  onChange={(e)=>{     
           handleImage(e.target.files[0]) }}
           id="icon-button-file"
           style={{ display: 'none', }}
            />
                  <IconButton size="small" color="secondary" 
                  aria-label="upload picture"
                   component="span"
                   onClick={(e)=>{handleClick(e,item);}} >
                    <PanoramaOutlinedIcon color="action" />
                  </IconButton>
                  </label>
      </Fragment>
     
                  <IconButton size="small" >
                    < ArchiveOutlinedIcon  />
                  </IconButton>
                  <IconButton size="small"
                  
                  onClick={()=>{
                    console.log(item);
                    handleDelete(item)}}
                  
                  >
                    < DeleteOutlineOutlinedIcon 
                  
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
                 
                  hideBackdrop
              >

                  <DialogContent  style={{background:color}}>
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
                  <DialogActions style={{background:color}}s>
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
