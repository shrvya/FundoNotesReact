import React, {useEffect,useState } from "react";
import Appbar from "../components/Appbar";
import Note from "../components/Note";
import Sidebar from "../components/Sidebar";
import {notes} from '../service/noteretrive';
import {Redirect} from "react-router-dom"
import { useDispatch } from "react-redux";
import { setNotes } from "../action/filter";
import DeleteNote from "../components/DeleteNote";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const Trash = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchitem();
  }, []);
  const fetchitem = () => {
   
    notes()
      .then((res) => {
        dispatch(setNotes(res));
      })
      .catch((err) => {
        console.log(err);
        <Redirect to="Login" />
      });
  };
  const [open, setOpen] = React.useState(false);
  const [title,setTitle]=React.useState("Keep");
 
  const [darkmode,setdarkmode]=useState("false")
  const dark= createTheme({
    palette: {
      mode: darkmode ? 'dark' : 'light',
    },
  })
  
  const handledark=()=>{
   setdarkmode(!darkmode);
  }
  const handleDrawerOpen = () => {
    setOpen((prevState) => {
      return !prevState;
    });
  };
  
  const handleDrawer = () => {
    (open)?setOpen(false):setOpen(true)
  };
const handleClick=(title)=>{
  setTitle(title) 
}
const handleTitle = (title) => {
  setTitle(title)
}
// const handleDrawerOpen = () => {
//   setOpen((prevState) => {
//     return !prevState;
//   });
// };
    return (
      <ThemeProvider theme={dark}>
    <div>
     
     <Appbar handleDrawerOpen={handleDrawerOpen} title={title}   />
         <Sidebar open={open} handleTitle={handleTitle} handleDrawerOpen={handleDrawerOpen} />
         <br/><br/><br/><br/>
         <Box component="main" sx={{ flexGrow: 5, p: 3, margin: "5% auto" }}>
         <DeleteNote />
      </Box>

       
    
     
        
    </div>
    </ThemeProvider>
        )
}
export default Trash;