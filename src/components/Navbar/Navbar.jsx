import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Button,
  Image,
  useDisclosure,
  Center,
  Badge,
} from '@chakra-ui/react';
import { FaBars, FaCheck } from 'react-icons/fa6';
import SideBar from '../sidebar/sidebar';
import myuser from '../../assets/images/myuser.jpeg';
import { navbars } from '../../Data/data';
import { NavLink } from 'react-router-dom';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { GET, POST } from '../../utils/ApiProvider';
import { useSocket } from '../../socket';
import { resetNotification } from '../../reducers/chat';
import { increamentNotification } from '../../reducers/chat';

export default function Navbar() {
  const [activeNav, setActiveNav] = useState(1);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpens,
    onClose: onCloses,
    onOpen: onOpens,
  } = useDisclosure();
  const [usersData, setUsersData] = useState({});
  const selector = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [bool, setBool] = useState(false);
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const NEW_REQUEST = 'NEW_REQUEST';

  const getData = (e) => {
    setUsersData(e);
    onOpens();
  };




  const responseRequest = async (bool) => {
    try {
      const reqData = {
        reqId: usersData.id,
        accept: bool,
      };
      setBool(true);
      const res = await POST('/request/accept', reqData, {
        Authorization: `Bearer ${user?.token}`,
      });
      if (res?.data?.success) {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'success',
          description: res.data.message,
        });
        getNotificationData();
        onCloses();
        setBool(false);
      } else {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'error',
          description: res.data.error,
        });
        setBool(false);
      }
    } catch (error) {
      console.log('failed to response on request', error.message);
    }
  };

  const getNotificationData = async () => {
    setLoading(true);
    try {
      const res = await GET('/request/my', {
        Authorization: `Bearer ${user?.token}`,
      });
      if (res?.success) {
        setData(res?.data);
        setLoading(false);
      } else {
        console.log('failed to load the product');
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    }

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleNewRequest = (userId) => {
      console.log("userid", userId, selector?.userReducer?.value.user?.user);
      if (userId.toString() === user?.user?._id.toString()) {
        dispatch(increamentNotification());
      }
    };
  
    if (socket) {
      socket.on(NEW_REQUEST, handleNewRequest);
      return () => {
        socket.off(NEW_REQUEST, handleNewRequest);
      };
    }
  }, [socket, dispatch, user]);

  useEffect(() => {
    if (selector) {
      setUser(selector?.userReducer?.value);
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      getNotificationData();
    }
  }, [user]);

  const handleNavClick = (id, event) => {
    setActiveNav(id);
    if (id === 3) {
      setIsNotificationOpen(!isNotificationOpen);
      event.stopPropagation();
      dispatch(resetNotification());
      getNotificationData();
    }
  };

  return (
    <Stack shadow={'md'} height={'60px'}>
      <Container maxW={'6xl'} h={'100%'}>
        <Box
          display={{ base: 'none', lg: 'flex' }}
          gap="20px"
          height={'100%'}
          justifyContent={'flex-end'}
          alignItems={'center'}
        >
          {navbars.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            if (item.id === 3) {
              return (
                <Box key={item.id} position="relative">
                  <Button
                    onClick={(event) => handleNavClick(item.id, event)}
                    display="inline-flex"
                    alignItems="center"
                    background="transparent"
                    border="none"
                    cursor="pointer"
                    _hover={{ background: 'transparent' }}
                  >
                    <Icon
                      fontSize={'23px'}
                      color={isActive ? '#E9813B' : '#B7B7B7'}
                    />
                    <Text
                      fontSize={'16px'}
                      fontFamily={'poppins'}
                      color={isActive ? '#E9813B' : '#B7B7B7'}
                      fontWeight={'400'}
                      ml={2}
                    >
                      {item.nav}
                    </Text>
                    {selector?.chatReducer?.notification !== 0 && (
                      <Badge
                        ml={2}
                        bg="#fdab75"
                        color={'white'}
                        borderRadius="full"
                        px={2}
                        py={1}
                        fontWeight={'300'}
                        fontSize="12px"
                        position="absolute"
                        top="5px"
                        right="-5px"
                        transform="translateY(-50%)"
                      >
                        {selector?.chatReducer?.notification}
                      </Badge>
                    )}
                  </Button>
                  {isNotificationOpen && (
                    <Box
                      ref={notificationRef}
                      position="absolute"
                      top="calc(100% + 20px)"
                      transform="translateX(-50%)"
                      width="340px"
                      background="white"
                      maxH={'350px'}
                      overflowY={'auto'}
                      pb={7}
                      boxShadow="lg"
                      borderRadius="md"
                      zIndex="1"
                    >
                      <Box
                        position="absolute"
                        top="-13px"
                        left="50%"
                        transform="translateX(-50%)"
                        width="0"
                        height="0"
                        borderLeft="10px solid transparent"
                        borderRight="10px solid transparent"
                        borderBottom="10px solid white"
                        zIndex="0"
                      />
                      <Text p="4">
                        <Text
                          color={'#0E134F'}
                          fontFamily={'poppins'}
                          fontSize={'20px'}
                          fontWeight={'900'}
                        >
                          Notification
                        </Text>
                        <Stack
                          display={'flex'}
                          gap={6}
                          mt={6}
                          flexDirection={'column'}
                        >
                          {loading ? (
                            <Box
                              display={'flex'}
                              justifyContent={'center'}
                              alignItems={'center'}
                            >
                              <Spinner size={'md'} />
                            </Box>
                          ) : data?.length > 0 ? (
                            data?.map((item) => {
                              return (
                                <Stack
                                  key={item._id}
                                  direction={'row'}
                                  cursor={'pointer'}
                                  onClick={() => {
                                    getData(item);
                                  }}
                                  alignItems={'center'}
                                >
                                  <Box>
                                    <Image src={myuser} alt="icons" />
                                  </Box>
                                  <Box>
                                    <Text
                                      fontSize={'12px'}
                                      color={'#E9813B'}
                                      fontFamily={'poppins'}
                                      fontWeight={'400'}
                                    >
                                      1min ago
                                    </Text>
                                    <Text
                                      color={'gray.500'}
                                      fontFamily={'poppins'}
                                      fontSize={'14px'}
                                      fontWeight={'400'}
                                    >
                                      {`${item?.sender?.name} send you a friend request`}
                                    </Text>
                                  </Box>
                                </Stack>
                              );
                            })
                          ) : (
                            <Box>No notification found</Box>
                          )}
                        </Stack>
                      </Text>
                    </Box>
                  )}
                </Box>
              );
            }
            return (
              <NavLink
                to={item.link || '#'}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{ textDecoration: 'none' }}
              >
                <Box display={'flex'} alignItems={'center'} gap={'8px'}>
                  <Icon
                    fontSize={'23px'}
                    color={isActive ? '#E9813B' : '#B7B7B7'}
                  />
                  <Text
                    fontSize={'16px'}
                    fontFamily={'poppins'}
                    color={isActive ? '#E9813B' : '#B7B7B7'}
                    fontWeight={'400'}
                  >
                    {item.nav}
                  </Text>
                </Box>
              </NavLink>
            );
          })}
        </Box>
        <Box
          display={{ base: 'flex', lg: 'none' }}
          cursor={'pointer'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          h={'100%'}
          fontSize="20px"
          onClick={onOpen}
        >
          <FaBars color="#E9813B" />
        </Box>
      </Container>

      <Modal isOpen={isOpens} onClose={onCloses}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody position={'relative'}>
            <Center>
              <Box position={'absolute'} width={'90px'} top={'-30px'}>
                <Image
                  width={'full'}
                  objectFit={'cover'}
                  rounded={'full'}
                  src={myuser}
                  alt="icon"
                />
              </Box>
            </Center>
            <Box padding={'20px'} py={16}>
              <Text
                textAlign={'center'}
                fontSize={'20px'}
                color={'#0E134F'}
                fontFamily={'poppins'}
                fontWeight={'900'}
              >
                {usersData?.sender?.name}
              </Text>
              <Text
                fontSize={'14px'}
                fontFamily={'poppins'}
                mt={6}
                color={'gray.500'}
                fontWeight={'400'}
                textAlign={'center'}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                rem placeat eaque impedit magni natus quia, asperiores delectus!
                Velit, incidunt.
              </Text>
              <Stack direction={'row'} justifyContent={'center'} mt={8} gap={5}>
                <Stack direction="row" spacing={4}>
                  <Button
                    leftIcon={<FaCheck color="gray" />}
                    variant="solid"
                    bg={'transparent'}
                    p={'22px 20px'}
                    _hover={'none'}
                    rounded={'full'}
                    border={'1px solid gray'}
                    color={'gray.500'}
                    onClick={() => {
                      responseRequest(false);
                    }}
                    fontWeight={'700'}
                    fontSize={'16px'}
                    isLoading={bool}
                    fontFamily={'poppins'}
                  >
                    Reject
                  </Button>
                </Stack>
                <Stack direction="row" spacing={4}>
                  <Button
                    leftIcon={<FaCheck color="white" />}
                    variant="solid"
                    bgColor={'#ffa705'}
                    p={'22px 20px'}
                    _hover={'none'}
                    rounded={'full'}
                    color={'white'}
                    fontWeight={'700'}
                    isLoading={bool}
                    onClick={() => {
                      responseRequest(true);
                    }}
                    fontSize={'16px'}
                    fontFamily={'poppins'}
                  >
                    Accept
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <SideBar isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}
