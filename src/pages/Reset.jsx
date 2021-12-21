import * as React from "react";
import TextField from '@mui/material/TextField';
import "../css/reset.css"
import { useState } from "react";
import Button from '@mui/material/Button';
import image from "../asset/fundo.png"
import Box from "@mui/material/Box";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {resetusers } from "../service/urls";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { validEmail, validPassword } from './validation';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {  useParams } from "react-router-dom";
export const Reset = () => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setPasswordConfirmError] = useState(false);
  const {token}=useParams();
  const data = {  password: password }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError(false);
     setPasswordConfirmError(false);
    if (!validPassword.test(password)) setPasswordError(true);
    if (password !== confirmPassword) {
        setPasswordConfirmError(true);
      
      }

      if (password === confirmPassword) {
        alert("Succefully reset password")
        resetusers(token,data);
      }
    
    
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showconfirmPassword: !values.showconfirmPassword,
      
    });
  }
  return (
    <main>
      <div className="reset-outline-div" >
        <div className="reset-container-for-all-data">
          <div className="reset-title-div">
            <span className="reset-title-span">FundoNotes</span>
            <h5 className="reset-heading">

              <span className="reset-heading-span"> Reset pin</span>
            </h5>
            <div className="form-div">
              <Box className="username-box" component="form" sx={{ '& > :not(style)': { m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="off"
              >
               
              </Box>

              <Box className="passwordholder-box-login" component="form" sx={{ '& > :not(style)': { m: 1, width: '28ch' }, }}
                noValidate
                autoComplete="off"
              >
                <FormControl sx={{ m: 1, width: '20ch', height: '10ch' }} variant="outlined">
                  <InputLabel className="reset-inputlabel" htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput className="outputlabel-reset"
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                  
                    onChange={(e) => {
                      setPassword(e.target.value);

                    }}
                    error={passwordError}
                    helperText={
                      passwordError ? "Invalid password" : "Use 8 or more characters with a mix of letters, numbers & symbols"
                    }

                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl className="password" sx={{ m: 1, width: '20ch', height: '10ch' }} variant="outlined">
                    <InputLabel className="reset-confirm-inputlabel" htmlFor="outlined-adornment-password">Confirm</InputLabel>
                    <OutlinedInput className="outputlabel-reset"
                      id="outlined-adornment-confirm-password"
                      type={values.showconfirmPassword ? 'text' : 'confirmpassword'}
                   
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showconfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      type={values.showPassword ? "text" : "password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={confirmPasswordError}
                      helperText={confirmPasswordError ? "Password doesnt match" : " "}
                      label="Confirm"
                    />
                  </FormControl>



              </Box>
              
              <div className="reset-button">
                <Button onClick={handleSubmit} variant="contained">Reset</Button>
              </div>
            </div>

          </div>
         
        </div>
      </div>
    </main>
  );
}
