import * as React from "react";
import TextField from '@mui/material/TextField';
import "../css/login.css"
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
import { useHistory } from 'react-router-dom'
import Fundokeep from './Fundokeep'

export const Login = () => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  let history = useHistory();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setuserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const data = { email: username, password: password }
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

    setuserError(false);
    setPasswordError(false);
    

    if (!validEmail.test(username)) setuserError(true);
    if (!validPassword.test(password)) setPasswordError(true);

    loginusers(data);
    alert("Succefully Login");
    history.push('/Fundokeep');
   
    
  };
  return (
    <main>
      <div className="login-outline-div" >
        <div className="login-container-for-all-data">
          <div className="title-div">
            <span className="logins-title-span">FundoNotes</span>
            <h6 className="logins-heading"> 

              <span className="logins-heading-span"> Sign in</span>
          
           </h6>
            <div className="form-div">
              <Box className="logins-username-box" component="form" sx={{ '& > :not(style)': { m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  className="logins-username"
                  label="Email"
                  id="Email"
                  size="small"
                  fullWidth
                  helperText={
                    userError
                      ? "Invalid email"
                      : "You can use letters,numbers & periods"
                  }
              
                  onChange={(e) => setusername(e.target.value)}
              

                />
              </Box>

              <Box className="passwordholder-box-login" component="form" sx={{ '& > :not(style)': { m: 1, width: '28ch' }, }}
                noValidate
                autoComplete="off"
              >
                <FormControl sx={{ m: 1, width: '20ch', height: '10ch' }} variant="outlined">
                  <InputLabel className="inputlabel" htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput className="outputlabel-login"
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

              </Box>
              <div>
                </div>
              <div className="link-signin">
                  <Link to="/forgot">forgot password</Link>
                </div>
              <div className="login-button">
                <Button onClick={handleSubmit} variant="contained">Login</Button>
              </div>
            </div>

          </div>
         
        </div>
      </div>
    </main>
  );
}
