import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { connect } from "react-redux";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../assets/styles";
import Swal from "sweetalert2";
import * as Actions from '../../redux/actions/dashboardActions'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GroupIcon from '@mui/icons-material/Group';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import '../../assets/styles/header.css';
import { Dialog, DialogContent, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Color } from "../../assets/colors";

const Header = ({ dispatch, isSidebarOpen }) => {
  const [userToggle, setUserToggle] = useState(false);
  const navigate = useNavigate();

  //! Change Password 
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => { setModalOpen(true) };
  const handleModalClose = () => { setModalOpen(false) };
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //! Anchor 
  const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => { setAnchorEl(null) };

  //! Handle Logout 
  const handleLogout = async () => {
    Swal.fire({ title: `Are you sure ?`, text: 'You want to logout', icon: "warning", showCancelButton: true, confirmButtonColor: Colors.primaryLight, cancelButtonColor: Colors.grayDark, confirmButtonText: "Logout", }).then((result) => {
      if (result.isConfirmed) {
        try {
          setData("");
          localStorage.clear();
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  useEffect(() => {
    try {
      const userData = localStorage.getItem("userDetails");
      setData(userData);
      if (!userData) { navigate("/login") }
    } catch (e) {
      console.log(e);
    }
  }, [data, userToggle]);

  useEffect(() => {
    let previousWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth > 900) {
        // console.log('Window is getting larger');
        dispatch(Actions.setIsSidebarOpne(true));
      } else if (window.innerWidth < 900) {
        dispatch(Actions.setIsSidebarOpne(false));
        // console.log('Window is getting smaller');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="header_wrapper">
          <div>
            <div onClick={() => dispatch(Actions.setIsSidebarOpne(!isSidebarOpen))} className="bars" style={{ backgroundColor: Color.primary, cursor: "pointer" }}>
              <FaBars className="bars_main" />
            </div>
          </div>

          <div>
            <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} style={{ border: '1px solid #F0F0F8', textTransform: 'lowercase', display: 'flex', color: Color.primary }}    >
              <GroupIcon style={{ marginRight: '0.3rem', }} />Admin
            </Button>

            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }} >
              <div style={{ display: 'flex', flexDirection: "column", gap: "10px" }}    >
                <MenuItem onClick={() => handleModalOpen()}>Change Password</MenuItem>

                <div onClick={handleLogout} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, color: 'white', }}>
                  <MenuItem  >
                    <VpnKeyIcon style={{ height: '1rem' }} />
                    Logout
                  </MenuItem>
                </div>
              </div>
            </Menu>
          </div>
        </div>
      </header>

      <Dialog open={modalOpen}>
        <DialogContent>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: "20px", fontWeight: "500" }}>Change Password</div>
                <div style={{ backgroundColor: Colors.primaryDark, color: "#fff", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }} onClick={handleModalClose}>Close</div>
              </Grid>

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

              <Grid item lg={12} sm={12} md={12} xs={12}>
                <div className="loginButton"  >
                  Submit
                </div>
              </Grid>
            </Grid>
          </Grid>

        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  isSidebarOpen: state.dashboard.isSidebarOpen
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Header);
