import React, { useState, useEffect ,useRef} from "react";
import { useDetectOutsideClick } from '../pages/useDetectOutsideClick';
import { Box } from "@mui/material";
import Note from "../components/Note";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { setNotes } from "../action/filter";
import AddNotes from "../components/AddNotes";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {notes} from '../service/noteretrive';


export function MiniDrawer() {

  const [open, setOpen] = useState(false);
  const [title,setTitle] = useState('Keep')
  const [click, showicons] = useState(false);
  const dispatch = useDispatch()
  
  const handleTitle = (title) => {
    setTitle(title)
  }

 
  useEffect(() => {
      fetchitem();
  }, []);
  const fetchitem = () => {
    notes().then((res) => {       
         
          dispatch(setNotes(res));
      })
          .catch((err) => {
              console.log(err);
          });
  };

  // const [darkmode,setdarkmode]=useState("false")
  // const dark= createTheme({
  //   palette: {
  //     mode: darkmode ? 'dark' : 'light',
  //   },
  // })
  
  // const handledark=()=>{
  //  setdarkmode(!darkmode);
  // }
  const handleDrawerOpen = () => {
    setOpen((prevState) => {
      return !prevState;
    });
  };
  
    return (
     
      <div className="fundodiv">
<Appbar handleDrawerOpen={handleDrawerOpen} title={title}  />
         <Sidebar open={open} handleTitle={handleTitle} handleDrawerOpen={handleDrawerOpen}  />
         <br/><br/><br/><br/>
         <AddNotes/>
         <Box component="main" sx={{ flexGrow: 1, p: 3, margin: "5% auto" }}>
          <Note  value={false}/>
        
      </Box>
        </div>
       
    );
}

