import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import {
  Avatar, Box, Button, Container, Grid, IconButton, List, ListItem, ListItemIcon,
  ListItemText, TextField, Typography, Toolbar, Drawer, CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import TemplateIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { BASE_URL } from '../api';
import '../styles/userProfile.css';
import { clearEducation } from '../redux/educationSlice';
import { clearProjects } from '../redux/projectSlice';
import { clearExperience } from '../redux/experienceSlice';
import { clearExtraDetails } from '../redux/extraDetailsSlice';
import { clearProfile } from '../redux/profileSlice';

export default function UserProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/user/update/${currentUser._id}`, formData, {
        headers: {
          authorization: currentUser.token,
        },
      });
      toast.success("Profile Updated Successfully!", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      formData.password = '';
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get-user/${currentUser._id}`, {
        headers: {
          authorization: currentUser.token,
        },
      });
      setFormData({
        username: response.data.username,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const handleLogout = async () => {
    dispatch(logoutUser());
    toast.success("Logout Successful!", {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(logoutUser());
    dispatch(clearProfile());
    dispatch(clearEducation());
    dispatch(clearProjects());
    dispatch(clearExperience());
    dispatch(clearExtraDetails());
  };

  const sidebarLinks = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Edit Resume', path: '/profile', icon: <EditIcon /> },
    // { text: 'Templates', path: '/templates', icon: <TemplateIcon /> },
    // { text: 'Logout', path: '', icon: <LogoutIcon />, action: handleLogout },
  ];

  // Remove responsive: always show sidebar, never show Drawer
  return (
    <Container component="main" maxWidth="lg">
      <Toolbar />
      <Grid container spacing={3}>
        <Grid item xs={12}  md={3}>
          <Box className="sidebar">
            <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
              Menu
            </Typography>
            <Box className="sidebar-links">
              {sidebarLinks.map((link, index) => (
                <Link
                  key={index}
                  className="sidebar-link"
                  to={link.path}
                  onClick={link.text === 'Logout' ? link.action : null}
                >
                  <ListItem button>
                    <ListItemIcon sx={{ color: '#FF6F00' }}>
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItem>
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Avatar src={currentUser?.avatar} alt="user" sx={styles.avatar} />
            <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
              Hello {formData.username}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                onChange={handleChange}
                value={formData.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                disabled
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#FF6F00",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#FF6F00",
                  },
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Update"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const styles = {
  avatar: {
    width: '100px',
    height: '100px',
    marginBottom: '15px',
  },
};