
//Fundo458^&*
//fundoapptest@gmail.com

import * as React from "react";
import TextField from '@mui/material/TextField';
import "../css/forgot.css"
import { useState } from "react";
import Button from '@mui/material/Button';
import image from "../asset/fundo.png"
import Box from "@mui/material/Box";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { users, loginusers } from "../service/urls";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { validEmail, validPassword } from './validation';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { forgotusers } from "../service/urls";
export const Forgot = () => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const [username, setusername] = useState("");

  const [userError, setuserError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
  const data = { email: username }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    setuserError(false);
    // setPasswordError(false);
    // setPasswordConfirmError(false);

    if (!validEmail.test(username)) setuserError(true);
    // if (!validPassword.test(password)) setPasswordError(true);

    // loginusers(data)
    forgotusers(data)
   
  };
  return (
    <main>
      
        <div className="forgots-container-for-all-data">
         
            <span className="forgots-title-span">FundoNotes</span>
           <h6
            className="forgots-heading">
<span className="forgots-Headingspan"> Account Recovery</span>
            </h6>

              
            
            <div className="forgot-form-div">
              <Box className="forgots-username-box" component="form" sx={{ '& > :not(style)': { m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  className="forgots-username"
                  label="Email"
                  id="Email"
                  size="small"
                  required
                  fullWidth
                  helperText={
                    userError
                      ? "Invalid email"
                      : "Enter existing email"
                  }
                  // fullWidth
                  onChange={(e) => setusername(e.target.value)}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">@gmail.com</InputAdornment>
                //   ),
                // }}

                />
              </Box>            

              <div className="link-createaccount">
                  <p className="forgot-para">
                  <Link to="/Registration">create account</Link>
                  </p>
                  <div className="forgots-button">
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
              </div>
                </div>
             
            </div>

          
          {/* <div className="fundo-image-div">
            <img className="fundo-image" src={image} style={{ verticalAlign: 'middle' }} />
          </div> */}
        </div>
     
    </main>
  );
}
