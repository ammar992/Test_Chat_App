import { Box, Button, Container, Image, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import myuser from '../../assets/images/user.jpeg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GET, POST } from '../../utils/ApiProvider';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';


const SinglePerson = () => {
  const [user,setUser] = useState({});
  const {id} = useParams();
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoad,setIsLoad] = useState(false);
  const selector = useSelector(state=>state);

  const getMyData = async()=>{
    try {
      setLoading(true);
      const res = await GET(`/user/singleuser/${id}`, {
        Authorization: `Bearer ${user?.token}`,
      });
      setLoading(false);
      setData(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
   
  }

  const sendRequest = async ()=>{
    
    try {
      setIsLoad(true)
      const sendData = {
        userId:data?._id
      }
      const res = await POST("/request/friend",sendData,{
        Authorization: `Bearer ${user?.token}`
      });
      if(res.data.success){
        toast({
          position:"bottom-left",
          isClosable:true,
          duration:5000,
          status:"success",
          description:"Request sent successfully"
        });
        setIsLoad(false);    
      }else{
        toast({
          position:"bottom-left",
          isClosable:true,
          duration:5000,
          status:"error",
          description:res?.data?.error
        });
        setIsLoad(false);
      }  
    } catch (error) {
      console.log("error failed to send request",error.message);      
      setIsLoad(false);
    }
  }
  useEffect(()=>{
    if(selector){
      setUser(selector?.userReducer?.value);
    }
  },[selector]);

  useEffect(()=>{
    if(user){
      getMyData();
    }else{
      navigate("/login");
    }
  },[user]);

  return (
   <>
   {
    loading?<Box display={"flex"} justifyContent={"center"} height={"70vh"} alignItems={"center"}><Spinner color='#EB9813B' size={"xl"} /></Box>:<Stack pt={'30px'}>
    <Container maxW={'5xl'}>
      <Stack direction={{base:"column",md:"row"}} gap={'40px'}>
        <Stack>
          <Box
            flex={'1'}
            p={'10px'}
            display={'flex'}
            rounded={'md'}
            px={10}
            py={7}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'226px'}
            gap={'10px'}
            shadow={'md'}
          >
            <Box width={'106px'} height={'106px'}>
              <Image
                src={myuser}
                width={'100%'}
                borderRadius={'50%'}
                alt="user icon"
              />
            </Box>
            <Text fontSize={'24px'} fontFamily={'poppins'} fontWeight={'900'}>
              {data?.name}
            </Text>
            <Text fontSize={'16px'} fontFamily={'poppins'} fontWeight={'400'}>
              UI/UX Designer
            </Text>
          </Box>
          <Button color={"#E9813B"} isLoading={isLoad} onClick={()=>{sendRequest()}} _hover={"none"} mt={"30px"} rounded={"full"} bg={"#FCEDE4"}>
              SendRequest                
          </Button>
        </Stack>
        <Box
          flex={'4'}
          rounded={'md'}
          display={'flex'}
          flexDirection={'column'}
          gap={'15px'}
          p={{base:"10px",md:'20px'}}
          height={'fit-content'}
          shadow={'lg'}
        >
          <Text
            fontSize={'24px'}
            fontFamily={'poppins'}
            color={'#0E134F'}
            textAlign={{base:"center",md:"left"}}
            fontWeight={'900'}
          >
            About
          </Text>
          <Text
            color={'#42562E'}
            fontSize={'16px'}
            fontFamily={'poppins'}
            textAlign={{base:"center",md:"left"}}
            fontWeight={'400'}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad et
            magni eum itaque vel distinctio rerum provident voluptatum, at
            quaerat aliquam error quibusdam, atque incidunt deserunt earum
            tempore cumque repudiandae.
          </Text>
        </Box>
      </Stack>
    </Container>
  </Stack>
   }
    
    </>
  );
};

export default SinglePerson;
