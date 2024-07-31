import { Helmet } from 'react-helmet-async';

import { CandidateProfile } from 'src/sections/candidateProfile/view';

// ----------------------------------------------------------------------

export default function CandidateProfilePage() {
  return (
    <>
      <Helmet>
        <title> Candidate Profile | Hiring Portal </title>
      </Helmet>

      <CandidateProfile />
    </>
  );
}
