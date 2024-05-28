import { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Container, Image, Input, Stack, Text } from '@chakra-ui/react';
import { BsEmojiSmile } from 'react-icons/bs';
import { CiCamera } from 'react-icons/ci';
import { IoIosSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNewMessagesAlert } from '../../reducers/chat';
import { useToast } from '@chakra-ui/react';
import { GET, POST } from '../../utils/ApiProvider';
import List from '../../components/list/list';
import { clearOpenMessageAlert } from '../../reducers/chat';
import star from '../../assets/images/star1.png';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from '../../constant';
import me from '../../assets/images/me.png';
import { useSocket } from '../../socket';
import { useSocketEvents } from '../../hooks/hook';

const Message = () => {
  const endRef = useRef(null);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState('');
  const [selectUser, setSelectUser] = useState(null);
  const toast = useToast();
  const imgRef = useRef('');
  const [load,setLoad] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const navigate = useNavigate();
  const socket = useSocket();
  const [user, setUser] = useState({});
  const msgRef = useRef();

  const sendMessage = () => {
    if (!msgRef.current.value.trim()) return;
    const messageData = {
      chatId: selectUser._id,
      members: selectUser.members,
      message: msgRef.current.value,
    };
    socket.emit(NEW_MESSAGE, messageData);
    msgRef.current.value = '';
  };

  console.log(messages);


  const newMessagesHandlere = useCallback(
    (data) => {
      console.log(data.chatId,chatId);
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data]);
    },
    [chatId]
  );

  const newMessageAlert = useCallback(
    (data) => {
      if (data.chatId === chatId) return;
      dispatch(setNewMessagesAlert(data));
    },
    [chatId]
  );

  const eventHandler = {
    [NEW_MESSAGE]: newMessagesHandlere,
    [NEW_MESSAGE_ALERT]: newMessageAlert,
  };
  useSocketEvents(socket, eventHandler);

  const getUserMessages = async (item) => {
    setChatId(item._id);
    try {
      const response = await GET(`/message/user/${item._id}`, {
        Authorization: `Bearer ${user?.token}`,
      });
      setMessages(response?.data);
    } catch (error) {
      console.log('get messages error', error.messages);
    }
  };

  const imageHandler = async (e) => {
    try {
      const files = Array.from(e.target.files);
      if (files.length <= 0) return;
      if (files.length > 5) {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'error',
          description: "You can't upload more than 5 pictures at a time",
        });
        return;
      }
      setLoad(true);
      const formdata = new FormData();
      formdata.append('chatId', chatId);
      files.forEach((file) => formdata.append('files', file));
  
      const imgRes = await POST('/message/attachments', formdata, {
        Authorization: `Bearer ${user?.token}`,
      });
  
      toast({
        position: 'bottom-left',
        isClosable: true,
        duration: 5000,
        status: 'success',
        description: 'Attachment sent successfully',
      });
      console.log(imgRes);
  
      // Clear the file input
      e.target.value = '';
      setLoad(false);
    } catch (error) {
      console.log('Failed to upload images', error.message);
      setLoad(false);
    }
  };
  
  const getFriends = async () => {
    try {
      setLoading(true);
      const res = await GET('/chat/friends', {
        Authorization: `Bearer ${user?.token}`,
      });
      if (res?.success) {
        setFriends(res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log('Failed to fetch friends', error.message);
      setLoading(false);
    }
  };

  const clearNotification = (id)=>{
    dispatch(clearOpenMessageAlert(id));
  }

  const fetchUserMessage = async (userData) => {
    setSelectUser(userData);
  };

  const selectRef = () => {
    imgRef.current.click();
  };

  useEffect(() => {
    if (selector) {
      setUser(selector?.userReducer?.value);
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      getFriends();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box pt={'40px'} h={'100%'}>
      <Container maxW={'6xl'}>
        <Stack direction={{ base: 'column', md: 'row' }} h={'77vh'} gap={10}>
          <Box
            rounded={'md'}
            shadow={'lg'}
            display={'flex'}
            flexDirection={'column'}
            p={7}
            w={'100%'}
            flex={'3'}
          >
            <Text
              fontSize={'30px'}
              fontFamily={'poppins'}
              fontWeight={'900'}
              color={'#0E134F'}
            >
              Message
            </Text>
            <Stack
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              direction={'column'}
              gap={6}
              overflow={'scroll'}
              flex={'1'}
              mt={8}
            >
              {loading ? (
                <Box>Loading...</Box>
              ) : friends?.length > 0 ? (
                friends?.map((item, key) => (
                  <List
                    fetchUserMessage={fetchUserMessage}
                    item={item}
                    chatId={chatId}
                    clearNotification={clearNotification}
                    data={selector?.chatReducer?.newMessagesAlert}
                    getUserMessages={getUserMessages}
                    key={item._id || key}
                  />
                ))
              ) : (
                <Box fontSize={'20px'}>No friend found</Box>
              )}
            </Stack>
          </Box>
          {selectUser ? (
            <Box
              flex={'6'}
              rounded={'md'}
              shadow={'md'}
              display={'flex'}
              flexDirection={'column'}
            >
              <Box>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  width={'100%'}
                  height={'3px'}
                  shadow={'md'}
                  padding={8}
                >
                  <Text
                    color={'#42562E'}
                    fontSize={{ base: '13px', md: '18px', lg: '20px' }}
                    fontWeight={900}
                    fontFamily={'poppins'}
                  >
                    {selectUser?.name}
                  </Text>
                  <Box>
                    <Image width={'30px'} src={star} alt="icon" />
                  </Box>
                </Stack>
              </Box>
              <Box
                flex={1}
                overflow={'scroll'}
                css={{
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
                display={'flex'}
                gap={5}
                flexDirection={'column'}
                padding={'20px'}
              >
                {messages?.length > 0 ? (
                  messages?.map((item) => {
                    return (
                      <Box
                        display={'flex'}
                        key={item?._id}
                        justifyContent={
                          item?.senderId?._id === user?.user?._id
                            ? 'flex-end'
                            : 'flex-start'
                        }
                        gap={2}
                        alignItems={'center'}
                      >
                        {item?.senderId?._id !== user?.user?._id && (
                          <Box width={'30px'} height={'30px'}>
                            <Image
                              src={me}
                              width={'100%'}
                              height={'100%'}
                              alt="me icons"
                            />
                          </Box>
                        )}
                        {item.attachement && item.attachement.length > 0 ? (
                          <Stack direction="column" spacing={2}>
                            {item.attachement.map((attachment, index) => (
                              <Image
                                key={index}
                                src={attachment}
                                maxW={{
                                  base: '80px',
                                  md: '140px',
                                  lg: '400px',
                                }}
                                maxH={{
                                  base: '80px',
                                  md: '140px',
                                  lg: '400px',
                                }}
                                objectFit={'cover'}
                                borderRadius={'md'}
                                mr={2}
                              />
                            ))}
                          </Stack>
                        ) : (
                          <Text
                            maxW={'70%'}
                            p={2}
                            color={'black'}
                            bg={
                              item?.senderId?._id.toString() ===
                              user?.user?._id.toString()
                                ? '#F2F2F2'
                                : '#FCEFE6'
                            }
                            fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                            fontFamily={'poppins'}
                            fontWeight={900}
                            rounded={'md'}
                          >
                            {item.content}
                          </Text>
                        )}
                      </Box>
                    );
                  })
                ) : (
                  <Box
                    fontWeight={'400'}
                    fontSize={'16px'}
                    fontFamily={'poppins'}
                  >
                    Start your chat with {selectUser?.name}
                  </Box>
                )}

                <Box ref={endRef}></Box>
              </Box>
              <Box mt={'auto'} p={5}>
                <Box display={'flex'} gap={3} alignItems={'center'}>
                  <Box
                    pr={5}
                    rounded={'md'}
                    bg={'#E5E5E5'}
                    gap={1}
                    display={'flex'}
                    flex={'1'}
                  >
                    <Input
                      border={'none'}
                      placeholder="Type message"
                      ref={msgRef}
                      outline={'none'}
                    />
                    <Input
                      type="file"
                      onChange={(e) => {
                        imageHandler(e);
                      }}
                      ref={imgRef}
                      display={'none'}
                      multiple
                    />
                    <Box display={'flex'} alignItems={'center'} gap={3}>
                      <BsEmojiSmile cursor={'pointer'} fontSize={'16px'} />
                      <CiCamera
                        onClick={selectRef}
                        cursor={'pointer'}
                        fontSize={'20px'}
                      />
                    </Box>
                  </Box>
                  <Box
                    p={2}
                    onClick={() => {
                      sendMessage();
                    }}
                    cursor={'pointer'}
                    _disabled={load}
                    rounded={'md'}
                    bg={'#E9813B'}
                  >
                    {
                      load? <Text color={"white"}>sending....</Text>:<IoIosSend fontSize={'20px'} color="white" />
                    }
                    
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              flex={'6'}
              display={'flex'}
              fontFamily={'poppins'}
              fontWeight={400}
              justifyContent={'center'}
              fontSize={'large'}
              alignItems={'center'}
            >
              No User Selected yet
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Message;
