import { Helmet } from 'react-helmet-async';

import { AssetsView } from 'src/sections/assets/view';

// ----------------------------------------------------------------------

export default function AssetsPage() {
  return (
    <>
      <Helmet>
        <title> Assets | Hiring Portal </title>
      </Helmet>

      <AssetsView />
    </>
  );
}
