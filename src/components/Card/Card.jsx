/* eslint-disable react/prop-types */

import { Box, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import user from '../../assets/images/user.jpeg';

const Card = ({ item }) => {
  return (
    <Link to={`/person/${item?._id}`}>
      <Stack
        direction={'row'}
        gap={'14px'}
        shadow={'lg'}
        padding={'15px'}
        rounded={'lg'}
        height={'113px'}
        width={'315px'}
      >
        <Box width={'200px'} height={'full'}>
          <Image
            width={'100%'}
            objectFit={'cover'}
            src={user}
            height={'full'}
            alt="user icon"
          />
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
        >
          <Text
            fontSize={'12px'}
            color={'#E9813B'}
            fontFamily={'poppins'}
            fontWeight={'400'}
          >
            12 friends
          </Text>
          <Text fontSize={'18px'} fontFamily={'poppins'} fontWeight={'900'}>
            {item.name}
          </Text>
          <Text
            fontSize={'10px'}
            color={'#42562E'}
            fontFamily={'poppins'}
            fontWeight={'400'}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet totam
            beatae assumenda
          </Text>
        </Box>
      </Stack>
    </Link>
  );
};

export default Card;
