import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    Stack,
    Image
} from "@chakra-ui/react";
import Signin from "../assest/Signup.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assest/logo.png"
import { handleLogin } from "../Redux/Auth/action";
import { useDispatch } from "react-redux"

const initialLogin = {
    email: '',
    password: ''
}

export default function LoginPage() {
    const [loginData, setLoginData] = useState(initialLogin)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLoginChange = (e) => {
        const { type, value, name } = e.target

        setLoginData((prev) => ({ ...prev, [name]: value }))
    }

    const handleLoginSubmit = async () => {
        if (loginData.email === "" || loginData.password === "") {
            alert("Fill the credentials")
            return
        }

        dispatch(handleLogin(loginData)).then((data) => {
            if (data.token) {
                localStorage.setItem('token', JSON.stringify(data.token))
                localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))
                alert("User logged in successfull")
                navigate("/home")
            }
        })
    }
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
                <Image objectFit="cover" src={Signin} alt="Signup" width={"100%"} h={'600px'} />
            </Stack>
            <Box width={["100%", "100%", "40%", "40%"]}>

                <Stack pl={16} pr={16} mb={10} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Text m={0} fontSize="3xl" fontWeight="bold" fontFamily="body">Sign In</Text>
                    <Text m={0} fontSize="3xl" fontWeight="bold" fontFamily="body">
                        <Image src={logo} alt="" h="100px" w="100px" />
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
                                value={loginData.email}
                                onChange={handleLoginChange}
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
                                type="text"
                                size="sm"
                                focusBorderColor="#00ABC5"
                                text="sm"
                                placeholder="Enter Password"
                                fontFamily="body"
                                _placeholder={{ color: "gray.400" }}
                                border={'none'}
                                borderBottom={'1px solid #00ABC5'}
                                name='password'
                                value={loginData.password}
                                onChange={handleLoginChange}
                            />
                        </FormControl>
                        <Button onClick={handleLoginSubmit}
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
                        >
                            Sign In
                        </Button>
                        <Button onClick={handleLoginSubmit}
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
                            m={'10px'}
                        >
                            Forgot password
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
                        Don't have an account?
                    </Text>
                    <Link to={"/signup"}>
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
                            SIGN UP
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Box>
    );
}
