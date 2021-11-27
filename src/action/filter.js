export const setFilter=(notes)=>{
    return{
     type:"FILTER_NOTES",
     payload: notes,
    }
}
export const setNotes=(notes)=>{
    return{
     type:"NOFILTER_NOTES",
     payload: notes,
    }
}
export const addNewNote = (note) => {
    return {
      type: "ADD_NEW_NOTE",
      payload: note,
    };
  };
  export const updateNote = (notes) => {
    return {
      type: "UPDATE_NOTE",
      payload: notes
      
    };
}

export const deleteNote = (noteId) => {
  return {
    type: "DELETE_NOTE",
    payload: noteId
  };
};