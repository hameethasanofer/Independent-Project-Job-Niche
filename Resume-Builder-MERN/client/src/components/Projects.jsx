import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Box
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { updateProject, addProject, deleteProject } from "../redux/projectSlice";
import Tooltip from "@mui/material/Tooltip";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectDetails);
  const [showInputFields, setShowInputFields] = useState(false);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    dispatch(updateProject({ index, field: name, value }));
  };

  const handleAddProject = () => {
    dispatch(addProject());
    setShowInputFields(true);
  };

  const handleDeleteProject = (index) => {
    dispatch(deleteProject(index));
    setShowInputFields(false);
  };

  const containerStyle = {
    marginTop: "0px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "0px",
    paddingBottom: "0px",
    minHeight: "100vh",
  };

  const content = (
    <div>
      <p>1. Provide  description of the project.</p>
      <p>eg.</p>
      <p>Streamlined resume creation process using MERN stack.</p>
      <p> Integrated Material-UI and React for intuitive user interface.</p>
      <p>Implemented Redux for centralized state management and seamless data flow.</p>
    </div>
  );

  const TechStack = (
    <div>
      <p>1. Provide the tech stack used in the project.</p>
      <p>eg.</p>
      <p>React, Redux, Material-UI, Node.js, Express.js, MongoDB</p>
    </div>
  );

  return (
    <div style={containerStyle}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Card
          elevation={0}
          sx={{
            boxShadow: "none",
            marginTop: 2,
            marginBottom: 0,
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "calc(100vh - 120px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <CardHeader
            title={
              <Typography variant="h5" align="center" fontWeight="bold" className="text-[#FF6F00]">
                Projects Details
              </Typography>
            }
          />
          <CardContent>
            {projects?.map((project, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h5" sx={{ marginTop: "8px" }}>
                    Project {index + 1}
                  </Typography>
                  <IconButton onClick={() => handleDeleteProject(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
                <Grid container spacing={1} alignItems="center" lg={12}>
                  <Grid item md={12} sm={12} xs={12} lg={12}>
                    <Typography variant="h6" sx={{ marginTop: "8px" }}>
                      Project Title
                    </Typography>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      type="text"
                      name="title"
                      label={`Project Title`}
                      style={{ width: "100%" }}
                      value={project.title}
                      onChange={(event) => handleInputChange(index, event)}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <TitleIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} lg={12}>
                    <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ display: 'flex', gap: 3, alignItems: 'center' }}>Project Description
                        <Tooltip
                          title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{"Use next line for each new sentence"}</Box>}
                          placement="top"
                          arrow
                        >
                          <p style={{ fontSize: '1rem' }}> ?</p>
                        </Tooltip>
                      </p>
                      <Tooltip
                        title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{content}</Box>}
                        placement="top"
                        arrow
                      >
                        <p style={{ fontSize: '1rem' }}><i className="fa-solid fa-circle-info"></i></p>
                      </Tooltip>
                    </Typography>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      type="text"
                      name="description"
                      multiline
                      rows={4}
                      label={`Project Description`}
                      style={{ width: "100%" }}
                      value={project.description}
                      onChange={(event) => handleInputChange(index, event)}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <DescriptionIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} lg={12}>
                    <Typography variant="h6" sx={{ marginTop: "8px" }}>
                      Project Link(Hosted)
                    </Typography>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      type="text"
                      name="link"
                      label={`Project Link`}
                      style={{ width: "100%" }}
                      value={project.link}
                      onChange={(event) => handleInputChange(index, event)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" >
                            <IconButton >
                              <LinkIcon  />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} lg={12}>
                    <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p>Project Tech Stack</p>
                      <p>
                        <Tooltip
                          title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{TechStack}</Box>}
                          placement="top"
                          arrow
                        >
                          <p style={{ fontSize: '1rem' }}><i className="fa-solid fa-circle-info"></i></p>
                        </Tooltip>
                      </p>
                    </Typography>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      type="text"
                      name="techStack"
                      label={`Tech Stack`}
                      style={{ width: "100%" }}
                      value={project.techStack}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </Grid>
                </Grid>
              </div>
            ))}
            <Button
              variant="contained"
              sx={{
                marginTop: "8px", backgroundColor: "var(--btn)", color: 'white', '&:hover': { backgroundColor: "#FF6F00" },
                float: 'right'
              }}
              onClick={handleAddProject}
            >
              Add Project
            </Button>
          </CardContent>
          {/* Spacer to push border to bottom */}
          <Box sx={{ flexGrow: 1 }} />
          {/* Navigation and bottom space INSIDE the Card */}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2} alignItems="center" lg={12}>
              <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
                <Link to={'/education'} style={linkStyle}>
                  <ArrowBackIcon style={iconStyle} sx={{ color: '#FF6F00' }} />
                  <h4 className="text-[#FF6F00]">Education Section</h4>
                </Link>
                <Link to={'/experience'} style={linkStyle}>
                  <h4 className="text-[#FF6F00]">Experience Section</h4>
                  <ArrowForwardIcon style={iconStyle} sx={{ color: '#FF6F00' }} />
                </Link>
              </Grid>
            </Grid>
            <Box sx={{ height: 40 }} />
          </Box>
        </Card>
      </Box>
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

export default Projects;