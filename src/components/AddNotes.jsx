import React, {useState} from 'react'
import { create } from '../service/noteretrive';
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewNote } from '../action/filter';
import addnote from "../css/addnote.css"
function AddNotes() {
  const [titleFieldVisible, setTitleFieldVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
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
      e.preventDefault()
      create(data).then((res)=>{ if (res.data.status === 200) {
          dispatch(addNewNote(res.data.message))
        } else {
          console.log(res);
        }}).catch((err) => console.log(err.message));
      setTitle("");
      setContent("");
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
                    <button className="Button" variant="text" onClick={handleSubmit}>Submit</button>
                    <span className="CloseButton" onClick={handleSubmit}>close</span>
                  </Grid>
                </div>
               )}</div>
              </form>

          </div>
      </div>
  )
}
export default AddNotes;