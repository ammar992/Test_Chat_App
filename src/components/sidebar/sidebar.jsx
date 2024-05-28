/* eslint-disable react/prop-types */

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
} from '@chakra-ui/react';

import { navbars } from '../../Data/data';
import { NavLink } from 'react-router-dom';

export default function SideBar({ isOpen, onClose }) {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Box h={"full"} display={"flex"} gap={14} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              {
                navbars.map((item)=>{
                  return(
                    <NavLink key={item.id}  to={item.link}>
                    <Box   >
                      {item.nav}
                    </Box>
                    </NavLink>
                  )
                })
              }
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
