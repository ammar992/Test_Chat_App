import { Box, Container, Stack } from '@chakra-ui/react';
import Card from '../../components/Card/Card';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GET } from '../../utils/ApiProvider';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const Home = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const selector = useSelector((state) => state);
  const navigate = useNavigate();


  const getUsersData = async () => {
    try {
      setLoading(true);
      const res = await GET('/chat/users', {
        Authorization: `Bearer ${user?.token}`,
      });
      if (res?.success) {
        setData(res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log('error');
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser(selector?.userReducer?.value);
  }, [selector]);
  useEffect(() => {
    if (user) {
      getUsersData();
    } else {
      navigate('/login');
    }
  }, [user]);


  return (
    <>
      {loading ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          height={'70vh'}
          alignItems={'center'}
        >
          <Spinner color="#E9813B" size="xl" />
        </Box>
      ) : (
        <Stack pt={'30px'}>
          <Container maxW={{ base: '5xl', md: '3xl', lg: '5xl' }}>
            <Box
              fontSize={{ base: '22px', md: '30px', lg: '36px' }}
              textAlign={{ base: 'center', md: 'left' }}
              color={'#0E134F'}
              fontFamily={'poppins'}
              fontWeight={'900'}
            >
              Discover User
            </Box>
            <Stack
              direction={'row'}
              mt={'40px'}
              flexWrap={'wrap'}
              gap={'20px'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {data?.length > 0 ? (
                data?.map((item) => {
                  return <Card key={item._id} item={item} />;
                })
              ) : (
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  height={'60vh'}
                  alignItems={'center'}
                >
                  No data found
                </Box>
              )}
            </Stack>
          </Container>
        </Stack>
      )}
    </>
  );
};

export default Home;
