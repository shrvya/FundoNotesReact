import {
    Grid,
    Card,
    Typography,
    Button,
    Box
} from "@mui/material";
import "../css/delete.css"
import React from "react";
import {useSelector} from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import {useDispatch} from "react-redux";
import {updateNote, deleteNote} from "../action/filter";
import {update, Delete} from "../service/noteretrive";

const DeleteNote = () => {
    const dispatch = useDispatch();
    const handleRestore = (item) => {
        const data = {
            title: item.title,
            content: item.content,
            isTrash: false,
            color:item.color
        };
        update(data, item._id).then((res) => {
            dispatch(updateNote(res))
        }).catch((err) => console.log(err.message));
    }
    const handleDelete = (item) => {
        Delete(item._id).then((res) => {
            dispatch(deleteNote(item._id))
        }).catch((err) => {
            console.log(err)
        })
    }
    const notes = useSelector((state) => state.allNotes.filteredNotes);
    const emptyTrash = () => {
        notes.map((item) => {
            if (item.isTrash === true) {
                handleDelete(item)
            }
        })
    }
    return (
        <Box sx={{ margin:"5% auto " ,width:"80%"}}  >
        <div>
             <div className="trash-text-out">
                <div className="trash-text">
            <span className="infoSpan">Notes in trash are deleted after 7 days</span>
            <Button variant="text"
                onClick={
                    () => {
                        emptyTrash()
                    }
            }>Empty trash</Button></div></div>
            <Grid container
                spacing={4}>
                {
                notes.map((item) => {
                    if (item.isTrash === true) {
                        return (
                            <Grid item
                                xs={4}  sm={6} md={3}
                                key={
                                    item._id
                            }>
                                <Card className="notesCard">
                                    <Typography variant="h5">
                                        {
                                        item.title
                                    }</Typography>
                                    <Typography sx={
                                            {mb: 1.5}
                                        }
                                        color="text.secondary">
                                        {
                                        item.content
                                    } </Typography>
                                    <DeleteForeverIcon fontSize="small"
                                        onClick={
                                            () => {
                                                console.log(item);
                                                handleDelete(item)
                                            }
                                        }/>
                                    <RestoreFromTrashIcon fontSize="small"
                                        onClick={
                                            () => {
                                                handleRestore(item)
                                            }
                                        }/>

                                </Card>
                        </Grid>
                        );
                    }
                })
            } </Grid>
        </div>
        </Box>
    );
};
export default DeleteNote;