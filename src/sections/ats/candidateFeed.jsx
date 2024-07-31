import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TabContext from '@mui/lab/TabContext';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { getTimeDifference } from 'src/utils/format-time';

// import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function CandidateFeed({ candidateFeedData, tabValue, handleTabChange }) {
  const [candidateData, setCadidateData] = useState([]);

  const navigate = useNavigate();

  const handleViewProfile = (candidateId) => {
    navigate(`/ats/candidateprofile?id=${candidateId}`);
  };

  useEffect(() => {
    if (tabValue === 'qualified') setCadidateData(candidateFeedData?.qualifiedCandidates);
    else if (tabValue === 'disqualified')
      setCadidateData(candidateFeedData?.disqualifiedCandidates);
  }, [candidateFeedData, tabValue]);

  const CandidateFeedView = (
    <Box className="tab-content">
      <Box className="tab-pane" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container className="grid-view-wrapper">
          {candidateData.map((stagesData, firstIndex) => (
            <Grid item lg={4} key={firstIndex}>
              <Typography variant="h5" className="sub-heading">
                {stagesData?.stage}
              </Typography>
              <Box className="card-listing">
                {stagesData?.candidates.map((candidate, cardIdx) => (
                  <Card
                    key={cardIdx}
                    sx={{ mb: 2 }}
                    className="card"
                    onClick={() => handleViewProfile(candidate?.id)}
                  >
                    <CardContent className="card-body">
                      <Box className="media">
                        <CardMedia
                          component="img"
                          className="user-image"
                          image={candidate?.photo}
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Box className="media-body">
                          <Typography variant="h6">{candidate?.name}</Typography>

                          {candidate?.disqualify_reason ? (
                            <Typography variant="body2" className="text-danger textwithicon">
                              <CardMedia
                                component="img"
                                className="card-icon"
                                image="/assets/newImages/block-icon.png"
                              />
                              {candidate?.disqualify_reason}
                            </Typography>
                          ) : (
                            <Typography variant="body2" className="textwithicon">
                              <CardMedia
                                component="img"
                                className="card-icon"
                                image="/assets/newImages/clock-icon.png"
                              />
                              {getTimeDifference(candidate?.created_at)}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions className="card-footer">
                      <Typography variant="body2" className="textwithicon">
                        <CardMedia
                          component="img"
                          className="card-icon"
                          image="/assets/newImages/location-icon.png"
                          // sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        Bothell
                      </Typography>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );

  return (
    <Grid item xs={12} md={9} className="grid-view">
      <Box>
        <Typography variant="h4" className="title">
          Candidate Feed
        </Typography>

        <TabContext value={tabValue}>
          <Tabs value={tabValue} onChange={handleTabChange} className="toggler-btn nav-pills">
            <Tab
              label={`Qualified (${candidateFeedData?.qualifiedCandidatesCount})`}
              value="qualified"
              className="nav-link"
            />
            <Tab
              label={`Disqualified (${candidateFeedData?.disqualifiedCandidatesCount})`}
              value="disqualified"
              className="nav-link"
            />
          </Tabs>
          {CandidateFeedView}
        </TabContext>
      </Box>
    </Grid>
  );
}

CandidateFeed.propTypes = {
  candidateFeedData: PropTypes.object.isRequired,
  tabValue: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};
