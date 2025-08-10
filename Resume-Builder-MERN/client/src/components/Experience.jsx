import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  updateExperience,
  deleteExperience,
} from "../redux/experienceSlice";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Experience = () => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.experienceDetails);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(updateExperience({ index, field: name, value }));
  };

  const handleAddExperience = () => {
    dispatch(addExperience());
  };

  const handleDeleteExperience = (index) => {
    dispatch(deleteExperience(index));
  };

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        mt: 6,
        mb: 10,
        px: 3,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-lg mb-6 text-center">
  <h1 className="text-2xl font-bold">Professional Experience</h1>
</div>


      {experiences.map((exp, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{
            mb: 5,
            borderRadius: 3,
          }}
        >
          <CardHeader
            avatar={<WorkOutlineIcon color="primary" />}
            title={
              <Typography variant="h6" fontWeight={600} color="#0d47a1">
                Experience {index + 1}
              </Typography>
            }
            action={
              <Tooltip title="Delete Experience" arrow>
                <IconButton
                  onClick={() => handleDeleteExperience(index)}
                  color="error"
                  size="large"
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "rotate(20deg)" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
            <Grid container spacing={3}>
              {/* Role */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Role"
                  name="role"
                  variant="outlined"
                  value={exp.role}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <WorkOutlineIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                  sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#4F46E5', // default border (Indigo 600)
                    },
                    '&:hover fieldset': {
                      borderColor: '#4F46E5', // hover border (Indigo 600)
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4F46E5', // Indigo 600 on focus
                      borderWidth: '2px',
                    },
                  },
                  '& label': {
                    color: '#4F46E5', // default label color (Indigo 600)
                  },
                  '& label.Mui-focused': {
                    color: '#4F46E5', // Indigo 600 label on focus
                    fontWeight: 500,
                  },
                }}

                />
              </Grid>

              {/* Institute */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Institute / Organization"
                  name="institute"
                  variant="outlined"
                  value={exp.institute}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <BusinessIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#4F46E5', // default border (Indigo 600)
                      },
                      '&:hover fieldset': {
                        borderColor: '#4F46E5', // hover border (Indigo 600)
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4F46E5', // Indigo 600 on focus
                        borderWidth: '2px',
                      },
                    },
                    '& label': {
                      color: '#4F46E5', // default label color (Indigo 600)
                    },
                    '& label.Mui-focused': {
                      color: '#4F46E5', // Indigo 600 label on focus
                      fontWeight: 500,
                    },
                  }}

                />
              </Grid>

              {/* Start Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  variant="outlined"
                  value={exp.startDate}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <CalendarTodayIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#4F46E5', // default border (Indigo 600)
                      },
                      '&:hover fieldset': {
                        borderColor: '#4F46E5', // hover border (Indigo 600)
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4F46E5', // Indigo 600 on focus
                        borderWidth: '2px',
                      },
                    },
                    '& label': {
                      color: '#4F46E5', // default label color (Indigo 600)
                    },
                    '& label.Mui-focused': {
                      color: '#4F46E5', // Indigo 600 label on focus
                      fontWeight: 500,
                    },
                  }}

                />
              </Grid>

              {/* End Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  variant="outlined"
                  value={exp.endDate}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <CalendarTodayIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#4F46E5', // default border (Indigo 600)
                      },
                      '&:hover fieldset': {
                        borderColor: '#4F46E5', // hover border (Indigo 600)
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4F46E5', // Indigo 600 on focus
                        borderWidth: '2px',
                      },
                    },
                    '& label': {
                      color: '#4F46E5', // default label color (Indigo 600)
                    },
                    '& label.Mui-focused': {
                      color: '#4F46E5', // Indigo 600 label on focus
                      fontWeight: 500,
                    },
                  }}

                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  multiline
                  minRows={4}
                  variant="outlined"
                  value={exp.description}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <DescriptionIcon color="action" sx={{ mr: 1, mt: 1 }} />
                    ),
                  }}
                 sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#4F46E5', // default border (Indigo 600)
                        },
                        '&:hover fieldset': {
                          borderColor: '#4F46E5', // hover border (Indigo 600)
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4F46E5', // Indigo 600 on focus
                          borderWidth: '2px',
                        },
                      },
                      '& label': {
                        color: '#4F46E5', // default label color (Indigo 600)
                      },
                      '& label.Mui-focused': {
                        color: '#4F46E5', // Indigo 600 label on focus
                        fontWeight: 500,
                      },
                    }}

                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleAddExperience}
          sx={{
            background: "linear-gradient(to right, #3B82F6, #4F46E5)",
            px: 4,
            py: 1.5,
            fontWeight: 700,
            fontSize: "1rem",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(to right, #2563EB, #4338CA)", // slightly darker on hover
            },
            boxShadow: "0 6px 15px rgba(21, 101, 192, 0.4)",
            transition: "all 0.3s ease",
          }}
>
  Add Experience
</Button>

      </Box>

      {/* Navigation */}
      <Grid container justifyContent="space-between" sx={{ mt: 8, px: 1 }}>
        <Grid item>
          <Link
            to="/projects"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#1565c0",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 18,
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0d47a1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1565c0")}
          >
            <ArrowBackIcon /> Project Section
          </Link>
        </Grid>
        <Grid item>
          <Link
            to="/extraDetails"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#1565c0",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 18,
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0d47a1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1565c0")}
          >
            Extra Details Section <ArrowForwardIcon />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Experience;
