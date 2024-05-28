import {
  Box,
  Button,
  Container,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { settingsData } from '../../Data/data';
import download from '../../assets/images/download.png';
import unverified from '../../assets/images/unverified.png';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducers/userReducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const Setting = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(user);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    if (selector) {
      setUser(selector?.userReducer?.value);
    }
  }, [selector]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <Stack pt={'40px'}>
      <Container maxW={'6xl'}>
        <Stack direction={{ base: 'column', lg: 'row' }} gap={'30px'}>
          <Box shadow={'lg'} p="25px 0 25px 25px" flex={'3'}>
            <Stack
              direction={'row'}
              position={'relative'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text
                fontSize={{ base: '20px', md: '30px' }}
                color={'#0e134F'}
                fontFamily={'poppins'}
                fontWeight={'900'}
              >
                Settings
              </Text>
              <Text
                display={'flex'}
                py="3"
                px={6}
                bg={'#FCEDE4'}
                gap={1}
                position={'absolute'}
                borderLeftRadius={'full'}
                color={'#E9813B'}
                right={'0'}
                alignItems={'center'}
              >
                <Image
                  src={unverified}
                  w={'18px'}
                  height={'18px'}
                  alt="unverified icon"
                />
                <Text as={'span'}>Unverified</Text>
              </Text>
            </Stack>
            <Stack flexDirection={'column'} gap={7} mt={7}>
              {settingsData.length > 0 &&
                settingsData.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Stack
                      key={item.id}
                      cursor={'pointer'}
                      direction={'row'}
                      gap={4}
                      alignItems={'center'}
                      onClick={item.name === 'Log Out' ? handleLogout : null}
                    >
                      <Icon color="#E9813B" fontSize={'23px'} />
                      <Text
                        fontSize={{ base: '15 px', md: '18px' }}
                        fontFamily={'poppins'}
                        fontWeight={900}
                        color={'#0E134F'}
                      >
                        {item.name}
                      </Text>
                    </Stack>
                  );
                })}
            </Stack>
          </Box>
          <Box flex={'5'} pb={8} shadow={'md'}>
            <Box shadow={'sm'}>
              <Box p="20px">
                <Text
                  color={'#0E134F'}
                  textAlign={{ base: 'center', md: 'left' }}
                  fontSize={{ base: '16px', md: '20px' }}
                  fontFamily={'poppins'}
                  fontWeight={'900'}
                >
                  Profile Settings
                </Text>
              </Box>
            </Box>
            <Stack direction={{ base: 'column', md: 'row' }} mt={10}>
              <Box flex={'2'} display={'flex'} justifyContent={'center'}>
                <Box
                  w={{ base: '90px', md: '130px' }}
                  position={'relative'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bg={'#ffe2cf'}
                  borderRadius={'50%'}
                  h={{ base: '90px', md: '130px' }}
                >
                  <FaUser fontSize={'50px'} color="#E9813B" />
                  <Box
                    position={'absolute'}
                    cursor={'pointer'}
                    bottom={'0'}
                    right={'0'}
                  >
                    <Image
                      width={{ base: '30px', md: '40px' }}
                      height={{ base: '30px', md: '40px' }}
                      src={download}
                      alt="icon"
                    />
                  </Box>
                </Box>
              </Box>
              <Box flex={'4'} width={'100%'}>
                <Box
                  w={{ base: '100%', md: '80%' }}
                  display={'flex'}
                  flexDirection={'column'}
                  gap={'30px'}
                  p={{ base: '10px', md: '0px' }}
                >
                  <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Text
                      fontSize={'14px'}
                      fontFamily={'poppins'}
                      fontWeight={400}
                      color={'#0E134F'}
                    >
                      Name
                    </Text>
                    <Input
                      type="text"
                      padding={'20px'}
                      outline={'none'}
                      placeholder="Dave Parker"
                      shadow={'md'}
                      value={user?.user?.name}
                    />
                  </Box>
                  <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Text
                      fontSize={'14px'}
                      fontFamily={'poppins'}
                      fontWeight={400}
                      color={'#0E134F'}
                    >
                      Contact Number
                    </Text>
                    <Input
                      type="number"
                      padding={'20px'}
                      outline={'none'}
                      placeholder="+92 233244943"
                      shadow={'md'}
                    />
                  </Box>
                  <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Text
                      fontSize={'14px'}
                      fontFamily={'poppins'}
                      fontWeight={400}
                      color={'#0E134F'}
                    >
                      About Yourself
                    </Text>
                    <Textarea
                      type="text"
                      padding={'10px'}
                      shadow={'lg'}
                      outline={'none'}
                      placeholder="About Yourself"
                    />
                  </Box>
                </Box>
                <Box p={{ base: '10px', md: '0px' }}>
                  <Button
                    _hover={'none'}
                    mt={3}
                    w={'fit-content'}
                    px={10}
                    rounded={'full'}
                    width={{ base: '100%', md: 'auto' }}
                    bg={'#E9813B'}
                    color={'white'}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Setting;
