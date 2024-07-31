import { Helmet } from 'react-helmet-async';

import { ATSView } from 'src/sections/ats/view';

// ----------------------------------------------------------------------

export default function ATSPage() {
  return (
    <>
      <Helmet>
        <title> ATS | Hiring Portal </title>
      </Helmet>

      <ATSView />
    </>
  );
}
