import React, {useState,Fragment} from 'react'
import { create } from '../service/noteretrive';
import { Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewNote } from '../action/filter';
import addnote from "../css/addnote.css"
import ImageIcon from '@mui/icons-material/Image';
function AddNotes() {
  const [titleFieldVisible, setTitleFieldVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file,setFile]=useState('')
  const showTitleField = () => {
      setTitleFieldVisible(true)
  }
  const hideTitleField = () => {
      setTitleFieldVisible(false)
  }
  const dispatch = useDispatch();

  const data = {
      title: title,
      content: content
  };
  const handleSubmit = e => {
    //   e.preventDefault()
    //   create(data).then((res)=>{ if (res.data.status === 200) {
    //       dispatch(addNewNote(res.data.message))
    //     } else {
    //       console.log(res);
    //     }}).catch((err) => console.log(err.message));
    //   setTitle("");
    //   setContent("");
    //   hideTitleField();
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
 
      formData.append('profileImg', file)
      e.preventDefault()
      create(formData).then((res)=>{ if (res.data.status === 200) {
          dispatch(addNewNote(res.data.message))
        } else {
          console.log(res);
        }}).catch((err) => console.log(err.message));
      setTitle("");
      setContent("");
      
      setFile("")
      hideTitleField();
  }

  return (
      <div>
          <div className="create-form">
              {
              titleFieldVisible && (
                  <div className="backdrop"
                      onClick={
                          hideTitleField
                      }/>
              )
          }

              <form className="create-note">
                  {
                  titleFieldVisible && (
                      <input className="title" type="text"
                          value={title}
                          onChange={
                              e => setTitle(e.target.value)
                          }
                          onFocus={showTitleField}
                          name="title"
                          placeholder="Title"/>
                  )
                      }

                  <textarea className="text-area"
                      value={content}
                      onChange={
                          e => setContent(e.target.value)
                      }
                      onFocus={showTitleField}
                      name="content"
                      placeholder="Take a note..."/>
                 <div className="create-form">{  
               titleFieldVisible && ( 
                  <div>
                  <Grid>
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
                  }}
                >
                  Close
                </Button>
                    {/* <button className="Button"
                     variant="text" onClick={handleSubmit}>close</button>
                    <span className="CloseButton"
                     onClick={handleSubmit}>close</span> */}
                  </Grid>
                </div>
               )}</div>
               
              </form>

          </div>
      </div>
  )
}
export default AddNotes;