import user from '../assets/images/user.jpeg';
import myuser from '../assets/images/myuser.jpeg';
import { CiUser } from 'react-icons/ci';
import { IoMdLock } from 'react-icons/io';
import { MdInsertInvitation } from 'react-icons/md';
import { MdEventAvailable } from 'react-icons/md';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { LuLogOut } from 'react-icons/lu';
import { GoHome } from 'react-icons/go';
import { MdOutlineMail } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiSettings } from 'react-icons/ci';



const usersData = [
  {
    id: 1,
    friends: '14 friends',
    name: 'Anderson Willison',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet totam beatae assumenda ',
    img: user,
  },
  {
    id: 2,
    friends: '16 friends',
    name: 'Adrew Willison',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet totam beatae assumenda ',
    img: user,
  },
  {
    id: 3,
    friends: '10 friends',
    name: 'Adrew Willison',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet totam beatae assumenda ',
    img: user,
  },
  {
    id: 4,
    friends: '12 friends',
    name: 'Adrew Willison',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet totam beatae assumenda ',
    img: user,
  },
  {
    id: 5,
    friends: '6 friends',
    name: 'Adrew Willison',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet totam beatae assumenda ',
    img: user,
  },
  {
    id: 6,
    friends: '12 friends',
    name: 'Adrew Willison',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet totam beatae assumenda ',
    img: user,
  },
];

const notificationData = [
  {
    name: 'danial',
    id: 1,
    desc: 'Danial sent you a friend request',
    img: myuser,
  },
  {
    name: 'Ismail',
    id: 2,
    desc: 'Ismail sent you a friend request',
    img: myuser,
  },
  {
    name: 'Anderson',
    id: 3,
    desc: 'Anderson sent you a friend request',
    img: myuser,
  },
  {
    name: 'Ali',
    id: 4,
    desc: 'Ali sent you a friend request',
    img: myuser,
  },
];

const settingsData = [
  {
    icon: CiUser,
    id: 1,
    name: 'Profile Settings',
  },
  {
    icon: IoMdLock,
    id: 2,
    name: 'Change Password',
  },
  {
    icon: MdInsertInvitation,
    id: 3,
    name: 'Invitations',
  },
  {
    icon: MdEventAvailable,
    id: 4,
    name: 'Available For Invitations',
  },
  {
    icon: MdOutlineVerifiedUser,
    id: 5,
    name: 'Verify Your Account',
  },
  {
    icon: MdOutlinePrivacyTip,
    id: 6,
    name: 'Privacy Policy',
  },
  {
    id: 7,
    name: 'Log Out',
    icon: LuLogOut,
  },
];

const chatListData = [
  {
    name: 'addrew',
    image: myuser,
    id: 1,
    time: '3hr',
    lastMessage: 'Lorem ipsum  dolor sit amet dolor sit amet sit ',
  },
  {
    name: 'addrew',
    image: myuser,
    id: 2,
    time: '3hr',
    lastMessage: 'Lorem ipsum  dolor sit amet dolor sit amet sit ',
  },
  {
    name: 'addrew',
    image: myuser,
    id: 3,
    time: '3hr',
    lastMessage: 'Lorem ipsum  dolor sit amet dolor sit amet sit ',
  },
  {
    name: 'addrew',
    image: myuser,
    id: 4,
    time: '3hr',
    lastMessage: 'Lorem ipsum  dolor sit amet dolor sit amet sit ',
  },
  {
    name: 'addrew',
    image: myuser,
    id: 5,
    time: '3hr',
    lastMessage: 'Lorem ipsum  dolor sit amet dolor sit amet sit ',
  },
  {
    name: 'addrew',
    image: myuser,
    id: 6,
    time: '3hr',
    lastMessage: 'Lorem ipsum  dolor sit amet dolor sit amet sit ',
  },
];

const userChattData = [
  {
    id: 1,
    message: 'Hello there!',
    isUser: false,
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    message: 'Hi! How can I help you today?',
    isUser: true,
  },
  {
    id: 3,
    message: 'I have a question about your products.',
    isUser: false,
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    message: 'Sure, what would you like to know?',
    isUser: true,
  },
  {
    id: 5,
    message:
      'Do you offer international shipping? Do you offer international shipping? Do you offer international shipping? Do you offer international shipping?',
    isUser: false,
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    message: 'Sure, what would you like to know?',
    isUser: true,
  },
  {
    id: 7,
    message: 'Do you offer international shipping?',
    isUser: false,
    avatar: 'https://via.placeholder.com/150',
  },
];
const navbars = [
  {
    nav: 'Home',
    icon: GoHome,
    id: 1,
    link: '/',
  },
  {
    nav: 'Message',
    icon: MdOutlineMail,
    id: 2,
    link: '/message',
  },
  {
    nav: 'Notification',
    icon: IoMdNotificationsOutline,
    id: 3,
  },
  {
    nav: 'Settings',
    icon: CiSettings,
    id: 4,
    link: '/settings',
  },
];
export {
  usersData,
  notificationData,
  settingsData,
  chatListData,
  userChattData,
  navbars
};
