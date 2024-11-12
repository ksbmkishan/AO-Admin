import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, TextField, InputAdornment } from "@mui/material";
import { Color } from "../../assets/colors";
import logo from "../../assets/images/logo.png";
import { api_url } from "../../utils/api-routes";
import login_background from "../../assets/images/login_background.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validation = () => {
    let valid = true;
    if (userEmail.length == 0) valid = false;
    if (password.length == 0) valid = false;
    return valid;
  };

  const handleLogin = async () => {
    console.log({ userEmail, password })
    if (validation()) {
      try {
        const { data } = await axios.post(api_url + `admin/adminLogin`, { username: userEmail, password })

        console.log('data', data);
        if (data) {
          Swal.fire({ icon: "success", title: "Login Successful", showConfirmButton: false, timer: 2000, });
          localStorage.setItem("userDetails", userEmail);
          navigate("/");
        }
      } catch (error) {
        console.log("Server Error :: ", error)
        Swal.fire({ icon: "error", title: "Server Error", text: "Invalid username or password", showConfirmButton: false, timer: 2000, });
      }

    } else {
      Swal.fire({ icon: "error", title: "Validation Error", text: "Please Fill Both Field", showConfirmButton: false, timer: 2000, })
    }
  };

  return (
    <div style={{ backgroundImage: `url(${login_background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
      <div style={{ padding: "2rem 2rem 2rem 2rem", maxWidth: "30rem", borderRadius: 20, backgroundColor: "white" }}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} style={{ width: "100px", height: "100px" }} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  label="Username" variant='outlined' fullWidth
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} style={{ position: "relative" }}>
                <TextField label="Password" variant='outlined' fullWidth
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputAdornment position='end' style={{ position: "absolute", right: "20px", top: "65%" }}>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div style={{ backgroundColor: Color.primary, color: Color.white, padding: "10px 15px", borderRadius: '5px', textAlign: 'center', fontSize: '20px', cursor: 'pointer' }} onClick={handleLogin}>Login</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Login;
