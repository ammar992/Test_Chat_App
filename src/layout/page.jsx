import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { Box, Stack } from '@chakra-ui/react';

const MainPages = () => {
  return (
    <Stack display={"flex"} flexDirection={"column"}>
      <Navbar />
      <Box flex={"1"}>
      <Outlet />
      </Box>
    </Stack>
  );
};

export default MainPages;
