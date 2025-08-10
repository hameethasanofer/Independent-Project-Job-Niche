import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/profileSlice";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Profile = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.profileDetails);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateProfile({ [name]: value }));
  };

  const containerStyle = {
    marginTop: "0px",
    paddingTop: "0px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "var(--cardBg)",
    marginBottom: "0px"
    
    
  };

  return (
    <div style={containerStyle}  >
      <Card elevation={0} sx={{ boxShadow: "none", marginBottom: 4 }} >
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold" className="text-[#ff8c00] md:mb-[2rem]">
              Personal Details
            </Typography>
          }
          sx={{ paddingBottom: 0 }}
        />
      </Card>

      <CardContent sx={{ paddingTop: 0  }}>
        <Grid container spacing={6} >
          <Grid item xs={12} md={6}>
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              margin="dense"
              value={currentProfile.firstName}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="lastName"
              label="Last Name"
              fullWidth
              margin="dense"
              value={currentProfile.lastName}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="dense"
              value={currentProfile.email}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="mobile"
              label="Mobile"
              fullWidth
              margin="dense"
              value={currentProfile.mobile}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}md={6}>
            <TextField
              name="address"
              label="Address"
              fullWidth
              margin="dense"
              value={currentProfile.address}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="codeforces"
              label="Codeforces"
              fullWidth
              margin="dense"
              value={currentProfile.codeforces}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CodeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="linkedIn"
              label="LinkedIn"
              fullWidth
              margin="dense"
              value={currentProfile.linkedIn}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LinkedInIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="github"
              label="GitHub"
              fullWidth
              margin="dense"
              value={currentProfile.github}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <GitHubIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="codechef"
              label="CodeChef"
              fullWidth
              margin="dense"
              value={currentProfile.codechef}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CodeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="leetcode"
              label="LeetCode"
              fullWidth
              margin="dense"
              value={currentProfile.leetcode}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CodeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          
        </Grid>
      </CardContent>

      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "40px", marginTop: "10px" }}>
        <Link to="/education" style={linkStyle}>
          <h4 className="text-[#ff8c00]">Education Section</h4>
          <ArrowForwardIcon sx={{ color: '#FF6F00' }}/>
        </Link>
      </div>
    </div>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

export default Profile;
