/* eslint-disable react/prop-types */

import { Box, Image, Stack, Text } from '@chakra-ui/react';
import myUser from '../../assets/images/myuser.jpeg';

const List = ({
  item,
  fetchUserMessage,
  getUserMessages,
  chatId,
  data,
  clearNotification,
}) => {
  const newMessageCount =
    data.find((msg) => msg.chatId.toString() === item._id.toString())?.count ||
    0;

  const handleChatClick = () => {
    fetchUserMessage(item);
    getUserMessages(item);
    clearNotification(item._id); // Assuming clearNotification is a function that clears the notification for a chat ID
  };

  return (
    <Stack
      direction={'row'}
      rounded={'sm'}
      bg={chatId.toString() === item._id.toString() ? '#ffcead' : ''}
      onClick={handleChatClick}
      cursor={'pointer'}
      alignItems={'center'}
    >
      <Box width={'50px'} height={'50px'}>
        {!item.isUser && (
          <Image width={'100%'} height={'100%'} src={myUser} alt="icon" />
        )}
      </Box>
      <Box display={'flex'} flexDirection={'column'} width={'100%'}>
        <Box
          display={'flex'}
          w={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text
            fontSize={'16px'}
            fontFamily={'poppins'}
            fontWeight={900}
            color={'#0E134F'}
          >
            {item.name}
          </Text>
          <Text
            p={1}
            color={item._id === chatId ? 'white' : '#E9813B'}
            fontSize={'12px'}
            fontFamily={'poppins'}
          >
            3hr
          </Text>
        </Box>
        <Text
          fontSize={'12px'}
          fontFamily={'poppins'}
          fontWeight={'400'}
          color={'gray.500'}
        >
          {newMessageCount > 0 ? (
            <Text>{`You have ${newMessageCount} new messages`}</Text>
          ) : (
            'Lorem ipsum dolor sit amet consectetur'
          )}
        </Text>
      </Box>
    </Stack>
  );
};

export default List;
