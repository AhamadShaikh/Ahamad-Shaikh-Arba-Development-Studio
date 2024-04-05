import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Image, Input, Stack, Text } from "@chakra-ui/react";
import SignupImage from "../assest/Signup.png";
import { Link, Navigate, useNavigate } from "react-router-dom";

const initialSignup = {
    fullName: '',
    userName: '',
    email: '',
    password: '',
    avatar: '',
};

export default function SignupPage() {
    const [signupData, setSignupData] = useState(initialSignup);
    const navigate = useNavigate()

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignupSubmit = async () => {
        try {
            let res = await fetch(`https://arba-api-v28s.onrender.com/user/register`, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(signupData)
            });
            if (res) {
                 navigate("/")
            }
            console.log(signupData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            justifyContent={'center'}
            flexDirection={["column", "column", "column", "row"]}
        >
            <Stack
                justify="center"
                alignSelf="center"
            >
                <Image objectFit="cover" src={SignupImage} alt="Signup" width={"100%"} h={'600px'} />
            </Stack>
            <Box width={["100%", "100%", "40%", "40%"]}>

                <Stack pl={16} pr={16} mb={10}>
                    <Text m={0} fontSize="3xl" fontWeight="bold" fontFamily="body">
                        Apna Mart
                    </Text>
                    <Text
                        m={0}
                        fontSize="sm"
                        fontFamily="body"
                        color="gray.400"
                        lineHeight="tall"
                    >
                        Register your account
                    </Text>
                </Stack>
                <Stack pl={16} pr={24} spacing={6}>
                    <form>
                        <FormControl id="fullname">
                            <FormLabel
                                fontSize="sm"
                                lineHeight="tall"
                                fontFamily="body"
                                fontWeight="normal"
                                pb={"0.5rem"}
                            >
                                Full Name{" "}
                            </FormLabel>
                            <Input
                                type="text"
                                size="sm"
                                focusBorderColor="#00ABC5"
                                text="sm"
                                placeholder="Full Name"
                                fontFamily="body"
                                _placeholder={{ color: "gray.400" }}
                                border={'none'}
                                borderBottom={'1px solid #00ABC5'}
                                name='fullName'
                                value={signupData.fullName}
                                onChange={handleSignupChange}
                            />
                        </FormControl>
                        <FormControl id="username">
                            <FormLabel
                                fontSize="sm"
                                lineHeight="tall"
                                fontFamily="body"
                                fontWeight="normal"
                                pb={"0.5rem"}
                            >
                                UserName{" "}
                            </FormLabel>
                            <Input
                                type="text"
                                size="sm"
                                focusBorderColor="#00ABC5"
                                text="sm"
                                placeholder="Username"
                                fontFamily="body"
                                _placeholder={{ color: "gray.400" }}
                                border={'none'}
                                borderBottom={'1px solid #00ABC5'}
                                name='userName'
                                value={signupData.userName}
                                onChange={handleSignupChange}
                            />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel
                                fontSize="sm"
                                lineHeight="tall"
                                fontFamily="body"
                                fontWeight="normal"
                                pb={"0.5rem"}
                            >
                                Email{" "}
                            </FormLabel>
                            <Input
                                type="email"
                                size="sm"
                                focusBorderColor="#00ABC5"
                                text="sm"
                                placeholder="Email"
                                fontFamily="body"
                                _placeholder={{ color: "gray.400" }}
                                border={'none'}
                                borderBottom={'1px solid #00ABC5'}
                                name='email'
                                value={signupData.email}
                                onChange={handleSignupChange}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel
                                fontSize="sm"
                                lineHeight="tall"
                                fontFamily="body"
                                fontWeight="normal"
                                pb={"0.5rem"}
                            >
                                Password{" "}
                            </FormLabel>
                            <Input
                                type="password"
                                size="sm"
                                focusBorderColor="#00ABC5"
                                text="sm"
                                placeholder="Enter Password"
                                fontFamily="body"
                                _placeholder={{ color: "gray.400" }}
                                border={'none'}
                                borderBottom={'1px solid #00ABC5'}
                                name='password'
                                value={signupData.password}
                                onChange={handleSignupChange}
                            />
                        </FormControl>
                        <FormControl id="avatar">
                            <FormLabel
                                fontSize="sm"
                                lineHeight="tall"
                                fontFamily="body"
                                fontWeight="normal"
                                pb={"0.5rem"}
                            >
                                Avatar{" "}
                            </FormLabel>
                            <Input
                                type="text"
                                size="sm"
                                focusBorderColor="#00ABC5"
                                text="sm"
                                placeholder="Avatar"
                                fontFamily="body"
                                _placeholder={{ color: "gray.400" }}
                                border={'none'}
                                borderBottom={'1px solid #00ABC5'}
                                name='avatar'
                                value={signupData.avatar}
                                onChange={handleSignupChange}
                            />
                        </FormControl>
                        <Button
                            my={3}
                            size="md"
                            w={170}
                            h={45}
                            borderRadius="40px"
                            bg="#00ABC5"
                            color="white"
                            border="0"
                            fontWeight="400"
                            fontFamily="body"
                            fontSize="sm"
                            cursor="pointer"
                            _focus={{
                                outline: "none"
                            }}
                            _hover={{
                                bg: "#0189A3"
                            }}
                            boxShadow="lg"
                            onClick={handleSignupSubmit}
                        >
                            Signup
                        </Button>
                    </form>
                </Stack>
                <Stack
                    direction="row"
                    pl={16}
                    pr={16}
                    pt={8}
                    pb={10}
                    align="center"
                    justify="flex-end"
                >
                    <Text
                        fontSize="xs"
                        color="gray.400"
                        lineHeight="tall"
                        fontFamily="body"
                    >
                        Already have an account?
                    </Text>
                    <Link to={"/"}>
                        <Button
                            size="xs"
                            bg="white"
                            color="gray.500"
                            border="1px"
                            borderColor="gray.300"
                            borderRadius="full"
                            py={3}
                            px={4}
                            fontWeight="medium"
                            cursor="pointer"
                            _focus={{
                                outline: "none"
                            }}
                            _hover={{
                                bg: "white"
                            }}
                        >
                            SIGN IN
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Box>
    );
}
