import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Menu,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import GradeIcon from "@mui/icons-material/Grade";
import { useDispatch, useSelector } from "react-redux";
import { updateEducation } from "../redux/educationSlice";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Education = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.educationDetails);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fieldType, setFieldType] = useState(""); // 'year', 'startYear', 'endYear'

  const years = Array.from({ length: 30 }, (_, index) => 2030 - index);

  const openMenu = (event, type) => {
    setAnchorEl(event.currentTarget);
    setFieldType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFieldType("");
  };

  const handleYearSelect = (field, value) => {
    dispatch(updateEducation({ ...education, [field]: value }));
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateEducation({ ...education, [name]: value }));
  };

  const FOOTER_HEIGHT = 64; // px

const containerStyle = {
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  paddingBottom: `${FOOTER_HEIGHT + 24}px`, // Add enough space for the fixed footer
};

  return (
    <div style={containerStyle}>
      <Card elevation={0} sx={{ boxShadow: "none", marginBottom: 4 }}>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold" className="text-[#ff8c00]">
              Educational Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* College Name */}
          <Grid item md={6} xs={12}>
            <TextField
              margin="dense"
              variant="outlined"
              name="college"
              label="College Name"
              style={{ width: "100%" }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><SchoolIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              value={education.college || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Year (Custom Dropdown) */}
          <Grid item md={6} xs={12}>
            <TextField
              label="Year"
              value={education.year || ""}
              onClick={(e) => openMenu(e, "year")}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><EventIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              margin="dense"
            />
          </Grid>

          {/* Field */}
          <Grid item md={6} xs={12}>
            <TextField
              margin="dense"
              variant="outlined"
              name="field"
              label="Field"
              style={{ width: "100%" }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><SchoolIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              value={education.field || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Branch */}
          <Grid item md={6} xs={12}>
            <TextField
              margin="dense"
              variant="outlined"
              name="branch"
              label="Branch"
              style={{ width: "100%" }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><SchoolIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              value={education.branch || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Start Year */}
          <Grid item md={6} xs={12}>
            <TextField
              label="Start Year"
              value={education.startYear || ""}
              onClick={(e) => openMenu(e, "startYear")}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><EventIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              margin="dense"
            />
          </Grid>

          {/* End Year */}
          <Grid item md={6} xs={12}>
            <TextField
              label="End Year"
              value={education.endYear || ""}
              onClick={(e) => openMenu(e, "endYear")}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><EventIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              margin="dense"
            />
          </Grid>

          {/* City */}
          <Grid item md={6} xs={12}>
            <TextField
              margin="dense"
              variant="outlined"
              name="city"
              label="City"
              style={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><LocationCityIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              value={education.city || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* CGPA */}
          <Grid item md={6} xs={12}>
            <TextField
              margin="dense"
              variant="outlined"
              name="grades"
              label="CGPA"
              style={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><GradeIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              value={education.grades || ""}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CardContent>

      {/* Navigation Links */}
      <Grid container spacing={2} alignItems="center" lg={12}>
        <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
          <Link to={'/profile'} style={linkStyle}>
            <ArrowBackIcon style={iconStyle} sx={{ color: '#FF6F00' }} />
            <h4 className="text-[#FF6F00]">Profile Section</h4>
          </Link>
          <Link to={'/projects'} style={linkStyle}>
            <h4 className="text-[#FF6F00]">Project Section</h4>
            <ArrowForwardIcon style={iconStyle} sx={{ color: '#FF6F00' }} />
          </Link>
        </Grid>
      </Grid>

      {/* Dropdown Year Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 5, // ~5 items
            width: anchorEl ? anchorEl.clientWidth : 200,
          },
        }}
      >
        {years.map((year) => (
          <MenuItem key={year} onClick={() => handleYearSelect(fieldType, year)}>
            {year}
          </MenuItem>
        ))}
        <MenuItem onClick={() => handleYearSelect(fieldType, "")}>Clear Selection</MenuItem>
      </Menu>
    </div>
  );
};

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  gap: '5px',
  transition: 'border-radius 0.3s',
  borderRadius: '4px',
  padding: '5px',
};

const containerStyles = {
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
  paddingRight: '40px',
  paddingLeft: '40px',
};

const iconStyle = {
  verticalAlign: 'middle',
  marginLeft: '5px',
};

export default Education;
