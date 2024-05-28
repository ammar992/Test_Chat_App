import {
  Box,
  Container,
  InputGroup,
  Input,
  InputLeftElement,
  Stack,
  InputRightElement,
  Button,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { LuLock } from 'react-icons/lu';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { POST } from '../../utils/ApiProvider';

const Signup = () => {
  const [typePassword, setTypePassword] = useState(false);
  const [reTypePassword, setReTypePassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const signup = async () => {
    try {
      if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.confirmPassword
      ) {
        toast({
          status: 'error',
          description: 'Empty fields is not allowed',
          duration: 5000,
          position: 'bottom-left',
          isClosable: true,
        });

        return;
      }
      if (data.password !== data.confirmPassword) {
        toast({
          status: 'error',
          description: "Password and comfirm doesn't match",
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        return;
      }
      setLoading(true);
      const res = await POST(`/user/register`, data);
      console.log(res);
      if (res?.data.success) {
        toast({
          status: 'success',
          description: 'user registered successfully',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        navigate('/login');
      } else {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'error',
          description: res?.response?.data?.error,
        });
        setLoading(false);
      }
    
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack>
      <Container maxW={'6xl'} height={'100vh'}>
        <Stack
          display={'flex'}
          flexDirection={'column'}
          h={'100vh'}
          justify={'space-between'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Stack
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            h={'80vh'}
          >
            <Box
              fontSize={{ base: '23px', md: '36px', lg: '40px', xl: '44px' }}
              fontWeight={'900'}
              fontFamily={'poppins'}
            >
              Welcome! Signup Now
            </Box>
            <Stack>
              <Stack
                w={{ base: '100%', md: '90%' }}
                display={'flex'}
                flexDirection={'column'}
                gap={'20px'}
                h={'auto'}
              >
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CiUser fontSize={'20px'} color="#E9813B" />
                  </InputLeftElement>
                  <Input
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                    type="text"
                    border="none"
                    shadow={'lg'}
                    fontSize={'14px'}
                    placeholder="Name"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineEmail fontSize={'20px'} color="#E9813B" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    border="none"
                    shadow={'lg'}
                    fontSize={'14px'}
                    placeholder="Email"
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <LuLock color="#E9813B" fontSize={'20px'} />
                  </InputLeftElement>
                  <Input
                    type={typePassword ? 'text' : 'password'}
                    fontSize={'14px'}
                    border="none"
                    shadow={'lg'}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                    placeholder="Type password"
                  />
                  <InputRightElement>
                    {typePassword ? (
                      <LuEye
                        onClick={() => {
                          setTypePassword(!typePassword);
                        }}
                      />
                    ) : (
                      <LuEyeOff
                        onClick={() => {
                          setTypePassword(!typePassword);
                        }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <LuLock color="#E9813B" fontSize={'20px'} />
                  </InputLeftElement>
                  <Input
                    type={reTypePassword ? 'text' : 'password'}
                    border="none"
                    onChange={(e) => {
                      setData({ ...data, confirmPassword: e.target.value });
                    }}
                    shadow={'lg'}
                    fontSize={'14px'}
                    placeholder="Re-type password"
                  />
                  <InputRightElement>
                    {reTypePassword ? (
                      <LuEye
                        onClick={() => {
                          setReTypePassword(false);
                        }}
                      />
                    ) : (
                      <LuEyeOff
                        onClick={() => {
                          setReTypePassword(true);
                        }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                <Button
                  bgColor={'#E77334'}
                  rounded={'full'}
                  _hover={'none'}
                  color={'white'}
                  isLoading={loading}
                  onClick={signup}
                >
                  Signup
                </Button>
              </Stack>
            </Stack>
            <Box
              fontFamily={'poppins'}
              fontWeight={'400'}
              fontSize={{ base: '12px', md: '14px', lg: '16px' }}
              textAlign={'center'}
            >
              If already have an account /{' '}
              <Text as={'span'} color={'#E9813B'} fontWeight={'bold'}>
                <Link to="/login">Login Now</Link>
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Signup;
