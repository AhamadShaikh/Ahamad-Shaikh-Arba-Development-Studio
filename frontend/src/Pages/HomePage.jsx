import React, { useState, useEffect } from 'react'
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Text } from "@chakra-ui/react"
import Navbar from '../Components/Navbar'
import Slider from '../Components/Slider'
import ProductsList from '../Components/ProductsList'
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { handleLogoutUser } from '../Redux/Auth/action'

const HomePage = () => {
    const [avatar, setAvatar] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    // localStorage.setItem('termsAndConditions', JSON.stringify("false"))
    const permission = JSON.parse(localStorage.getItem('termsAndConditions'))
    const [termsAndConditions, setTermsAndConditions] = useState(permission)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        let token = JSON.parse(localStorage.getItem("token"))

        dispatch(handleLogoutUser()).then((res) => {
            localStorage.setItem('token', JSON.stringify(null))
            localStorage.setItem('refreshToken', JSON.stringify(null))
            localStorage.setItem('termsAndConditions', JSON.stringify(null))
            alert("User Logged Out")
            navigate("/")
        })
    }


    const handleReject = () => {
        alert('You need to accept the terms & conditions first')
    }

    const handleAccept = () => {
        localStorage.setItem('termsAndConditions', JSON.stringify("true"))
        onClose()
    }

    const fetchUserData = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(
                "https://arba-api-v28s.onrender.com/user/myuser",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            const userData = await response.json();
            console.log(userData);
            setAvatar(userData.avatar)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
        onOpen();
    }, []);

    return (
        <div>
            <Box>
                <Navbar avatar={avatar} handleLogout={handleLogout} />
            </Box>
            <Box>
                {/* <Slider/> */}
                <Button variant='ghost' colorScheme='blue' bg={'#00ABC5'} color={'white'} _hover={{
                    bg: "#0189A3"
                }}>
                    <Link to={'/allProducts'}>
                        <Text>All Products Page</Text>
                    </Link>
                </Button>
            </Box>
            <Box>
                <ProductsList />
            </Box>
            {
                termsAndConditions !== null ? "" : <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Terms & Conditions</ModalHeader>
                        <ModalBody pb={6}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, debitis cum voluptate iure explicabo obcaecati animi officiis, vero atque totam dolores illo corrupti iste? Consequuntur ex natus quam animi odit perferendis doloremque veniam, eveniet rem explicabo nostrum perspiciatis maxime! Iure delectus excepturi laudantium, modi fuga, assumenda, eius impedit perspiciatis quis nemo tenetur adipisci sequi dolorum cum! Itaque quae minima, amet officiis, ratione at veniam sunt velit fuga et unde adipisci voluptatibus in. Repudiandae in, iusto quia, laudantium dolorem dolorum, exercitationem soluta minima sed quaerat suscipit quam ullam vitae quasi vero asperiores sequi temporibus optio? Corporis, debitis accusantium. Libero, quia est?
                        </ModalBody>
                        <ModalFooter display={'flex'} justifyContent={'space-between'}>
                            <Button variant='ghost' colorScheme='blue' bg={'#00ABC5'} color={'white'} _hover={{
                                bg: "#0189A3"
                            }} onClick={handleAccept}>
                                Accept
                            </Button>
                            <Button variant='ghost' colorScheme='blue' bg={'#00ABC5'} color={'white'} _hover={{
                                bg: "#0189A3"
                            }} onClick={handleReject}>
                                Reject
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            }
        </div>
    )
}

export default HomePage
