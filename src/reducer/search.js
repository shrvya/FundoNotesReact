const initialState = {
    notes: [],
    filteredNotes:[],
    trash:[],
    listView: false,
  };
export default function SearchReducer(state = initialState, action) {

    switch (action.type) {
        case "NOFILTER_NOTES" :
        return {
            ...state,
             notes: action.payload
        }
        case "LIST_VIEW":
      return { ...state, 
        listView: !state.listView };
        case "FILTER_NOTES" :
        return {
            ...state,
             filteredNotes: action.payload
        }
        case "ADD_NEW_NOTE":
        return{
          ...state,
          notes: [
            ...state.notes,
            action.payload
        ]
        }
        case "UPDATE_NOTE":
          let newNote = [...state.notes];
          
          let index=state.notes.findIndex(note=>note._id===action.payload.data._id)
         newNote[index]=action.payload.data
         
      return {...state,notes:newNote}
      //=========
      case "DELETE_NOTE":
        return {
            ...state,
            notes: state.notes.filter(item => item._id !== action.payload)
        };

      default : return state

  
  }
}