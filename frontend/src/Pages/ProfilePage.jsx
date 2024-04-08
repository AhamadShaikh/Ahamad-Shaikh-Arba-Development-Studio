import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Flex,
  Text,
  Button,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useDispatch,useSelector } from "react-redux"
import { handleChangePassword, handleFetchUserData, handleUpdateProfile } from "../Redux/Profile/action";

const initialChangeProfile = {
  fullName: '',
  avatar: ''
}

const ProfilePage = () => {
  // const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
  const { isOpen: isPasswordOpen, onOpen: onPasswordOpen, onClose: onPasswordClose } = useDisclosure();
  const [updateData, setUpdateData] = useState(initialChangeProfile);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const dispatch = useDispatch()

  const { userData } = useSelector((store) => store.userReducer);



  const handleChangeProfile = (e) => {
    const { name, value } = e.target
    setUpdateData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangeProfileSubmit = async (e) => {
    if (updateData.fullName === "" || updateData.avatar === "") {
      alert("Please fill in all the details.");
      return;
    }
    e.preventDefault();
    let obj = {
      userId: userData._id,
      fullName: updateData.fullName,
      avatar: updateData.avatar
    }
    dispatch(handleUpdateProfile(obj)).then(() => {
      alert("User successfully updated.");
      onProfileClose();
      fetchUserData();
    })
  }

  const handleChangePasswordSubmit = async () => {
    let obj = {
      userId: userData._id,
      oldPassword,
      newPassword
    }
    dispatch(handleChangePassword(obj)).then(() => {
      alert("Password successfully changed");
      onPasswordClose();
    })
  }

  const fetchUserData = async () => {
    dispatch(handleFetchUserData()).then(()=>{
      setLoading(false);
    }).catch(()=>{
      setLoading(false);
    })
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Box>
      <Navbar />
      <Center>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p="4"
          maxW="xl"
          w="100%"
          textAlign="center"
          mt={10}
          boxShadow="lg"
        >
          <br />
          <br />

          {loading ? (
            <p>Loading...</p>
          ) : userData ? (
            <div>
              <Flex align="center" justify="center" direction="column">
                <Box borderRadius="full" overflow="hidden" mb={4}>
                  <img
                    src={userData.avatar}
                    alt=""
                    style={{ width: "10rem" }}
                  />
                </Box>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  p="4"
                  maxW="xl"
                  w="100%"
                  textAlign="left"
                  mt={6}
                  boxShadow="md"
                >
                  <Flex direction="column" align="start">
                    <Text fontSize="xl" mb={2}>
                      <b>Full Name:</b> {userData.fullName}
                    </Text>
                    <Text fontSize="xl" mb={2}>
                      <b>User Name:</b> {userData.userName}
                    </Text>
                    <Text fontSize="xl" mb={2}>
                      <b>Email:</b> {userData.email}
                    </Text>
                  </Flex>
                </Box>
                <ButtonGroup spacing="2" margin={"10px"}>
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    bg={"#00ABC5"}
                    color={"white"}
                    _hover={{ bg: "#0189A3" }}
                    onClick={onProfileOpen}
                  >

                    Change Profile
                  </Button>
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    bg={"#00ABC5"}
                    color={"white"}
                    _hover={{ bg: "#0189A3" }}
                    onClick={onPasswordOpen}
                  >
                    Change Password
                  </Button>
                </ButtonGroup>
              </Flex>

              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isProfileOpen}
                onClose={onProfileClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Update Your Profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="First name"
                        name="fullName"
                        value={updateData.fullName}
                        onChange={handleChangeProfile}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Avatar</FormLabel>
                      <Input
                        placeholder="Avatar"
                        name="avatar"
                        value={updateData.avatar}
                        onChange={handleChangeProfile}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleChangeProfileSubmit}>
                      Update
                    </Button>
                    <Button onClick={onProfileClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isPasswordOpen}
                onClose={onPasswordClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Change Password</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Old Password</FormLabel>
                      <Input
                        type="text"
                        placeholder="Old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>New Password</FormLabel>
                      <Input
                        type="text"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleChangePasswordSubmit}>
                      Change Password
                    </Button>
                    <Button onClick={onPasswordClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </Box>
      </Center>
    </Box>
  );
};

export default ProfilePage;
