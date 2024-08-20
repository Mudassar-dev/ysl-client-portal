import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Loading from 'src/components/loading/loading';

import PostCard from '../post-card';
// import PostSort from '../post-sort';
import PostSearch from '../post-search';
import { getAssetsByName } from '../../../services/userService';

// ----------------------------------------------------------------------

export default function AssetsView() {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getAssetsData = async () => {
      setIsLoading(true);
      try {
        const assetsData = await getAssetsByName('King Plumbing');
        const assets = assetsData?.data;
        if (assets?.files?.length) setFiles(assets?.files);

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    };
    getAssetsData();
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Assets</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button> */}
      </Stack>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {files?.length ? (
            <>
              <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                <PostSearch files={files} />
              </Stack>

              <Grid container spacing={3}>
                {files.map((file, index) => (
                  <PostCard key={index} file={file} />
                ))}
              </Grid>
            </>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <Typography variant="h4" color="red">
                No File Found
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
