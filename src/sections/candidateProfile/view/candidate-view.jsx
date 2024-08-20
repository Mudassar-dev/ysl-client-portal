import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';

import { getCandidateProfile } from 'src/services/userService';

import Loading from 'src/components/loading/loading';

import './index.css';
import ProfileInfo from '../profile-info';
import ProfileField from '../profile-field';
import ProfileExperience from '../profile-experience';

export default function CandidateProfile() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [candidateProfile, setCandidateProfile] = useState({});

  useEffect(() => {
    const getCandidateData = async (Id) => {
      setIsLoading(true);
      try {
        const profileData = await getCandidateProfile(Id);
        const data = profileData?.data;
        setCandidateProfile(data?.candidateProfile);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    };

    getCandidateData(id);
  }, [id]);

  return (
    <section className="info-reports user-profile">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(candidateProfile).length ? (
            <Container>
              <ProfileInfo candidateProfile={candidateProfile} />
              <ProfileField candidateProfile={candidateProfile} />
              <ProfileExperience candidateProfile={candidateProfile} />
            </Container>
          ) : null}
        </>
      )}
    </section>
  );
}
