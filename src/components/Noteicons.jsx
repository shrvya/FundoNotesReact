// import {
//     Grid,
//     Card,
//     Typography,
//     Button,
//     IconButton
// } from "@mui/material";
// import React from "react";
// import '../css/notes.css'
// import {useSelector} from "react-redux";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {update} from "../service/noteRetrieve";
// import {useDispatch} from "react-redux";
// import {updateNote} from "../actions/notesActions";
// import Snackbar from "@material-ui/core/Snackbar";
// import CloseIcon from "@material-ui/icons/Close";
// import PaletteIcon from '@mui/icons-material/Palette';
// import Popover from '@mui/material/Popover';
// import Brightness1Icon from '@mui/icons-material/Brightness1';
// import colorPaletteClassName from "./ColorPalette";
// const Note = ({value}) => {
//     const [open, setOpen] = React.useState(false);
//     const [title, setTitle] = React.useState("")
//     const [content, setContent] = React.useState("")
//     const [noteId, setNoteId] = React.useState("")
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [color,setColor]=React.useState("White")
//     const dispatch = useDispatch();
//     const [openSnackbar,setOpenSnackbar] = React.useState(false)
//     const data = {
//         title: title,
//         content: content,
//         isTrash:false,
//         color:color
//     };
//     const handleClickOpen = (item) => {
//         setTitle(item.title);
//         setContent(item.content);
//         setNoteId(item._id)
//         setOpen(true);
//         setColor(item.color)

//     };
//     const handleClose = () => {
//         setOpen(false);
//     };
//     const handleUpdate = () => {
//         update(data, noteId).then((res) => {
//             dispatch(updateNote(res))
//         }).catch((err) => console.log(err.message));
//         handleClose()
//     }
 
//     const handleDelete=(item)=>{
//         const dataDelete = {
//             title: item.title,
//             content: item.content,
//             isTrash:true,
//             color:item.color
//         };
//         update(dataDelete, item._id).then((res) => {
//             dispatch(updateNote(res))
//             setOpenSnackbar(true)
//         }).catch((err) => console.log(err.message));
//     }
//     const handleToClose = (event, reason) => {
//         if ("clickaway" === reason) return;
//         setOpenSnackbar(false);
//       };
//       const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//       };
    
//       const handlePClose = () => {
//         setAnchorEl(null);
//       };
//       const openA = Boolean(anchorEl);
//       const id = openA ? 'simple-popover' : undefined;
//     const notes = useSelector((state) => state.allNotes.searchNotes);
//     const listView = useSelector((state) => state.allNotes.listView);
//     return((notes.length > 0) ? (
//         <div>
//             <Grid container
//                 spacing={4} justifyContent={listView ? "center" : null}>
//                 {
//                 notes.map((item) => {
//                     if (item.isTrash === false) {
//                         return (
//                             <Grid item
//                             xs={12} md={listView ? 8 : 3}
//                                 key={
//                                     item._id
//                             }>
//                                 <Card className="notesCard"
//                                style={{background:item.color}}    >
//                                     <Typography variant="h5" onClick={
//                                         () => {
//                                             handleClickOpen(item)
//                                         }
//                                 }>
//                                         {
//                                         item.title
//                                     }</Typography>
//                                     <Typography sx={
//                                             {mb: 1.5}
//                                         }
//                                         color="text.secondary" onClick={
//                                             () => {
//                                                 handleClickOpen(item)
//                                             }
//                                     }>
//                                         {
//                                         item.content
//                                     } </Typography>
//                                      <IconButton onClick={handleClick}>
//                 <PaletteIcon/></IconButton>
//                 <Popover id={id}
//         open={openA}
//         anchorEl={anchorEl}
//         onClose={handlePClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}> <Grid container sx={{ p: 1 }}>
//           {colorPaletteClassName.map((colorItem,index)=>{
//           return(
//             <Grid item xs={12} sm={6} md={3} sx={{width:"11px"}} key={index}>
//               <IconButton  onClick={()=>{setColor(colorItem.colorCode);
//                 setTitle(item.title);
//                 setContent(item.content);
//                 setNoteId(item._id)
//                 handleUpdate()
//                }}>
//           <Brightness1Icon style={{ color: colorItem.colorCode }} /></IconButton></Grid>)})} </Grid>
//       </Popover>
//                                     <DeleteIcon onClick={()=>{handleDelete(item)}}/>
//                                 </Card>
//                             </Grid>
//                         );
//                     }
//                 })
//             } </Grid>
//             <div    >
//                 <Dialog fullWidth maxWidth="sm"
//                     open={open}
//                     onClose={handleClose}
//                     hideBackdrop
                   
//                 >
//                     <DialogContent  style={{background:color}}>
//                         <input className="title" type="text"
//                             value={title}
//                             onChange={
//                                 e => setTitle(e.target.value)
//                             }
//                             name="title"
//                             placeholder="Title"/>
//                         <textarea className="text-area"
//                             value={content}
//                             onChange={
//                                 e => setContent(e.target.value)
//                             }
//                             name="content"
//                             placeholder="Take a note..."/>
//                     </DialogContent>
//                     <DialogActions  style={{background:color}}>
//                         <Button onClick={handleClose}>close</Button>
//                         <Button onClick={handleUpdate}>Submit</Button>
//                     </DialogActions>
//                 </Dialog>
//             </div>
//             <Snackbar
//         anchorOrigin={{
//           horizontal: "right",
//           vertical: "bottom",
//         }}
//         open={openSnackbar}
//         autoHideDuration={5000}
//         message="Note moved to trash"
//         onClose={handleToClose} 
//         action={
//               <CloseIcon fontSize="small"  onClick={handleToClose}/>
//         }
//       />
//         </div>
//     ) : (
//         <span>No matching results.</span>
//     ));
// };
// export default Note;