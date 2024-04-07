import {
    Flex,
    ButtonGroup,
    Button,
    Text,
    Input,
    IconButton,
    Image, Box
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png"
import { FaCartPlus } from "react-icons/fa6";
import { useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
function Navbar({ avatar, handleLogout }) {
    return (
        <div>
            <Flex minWidth="max-content" alignItems="center" gap="2" boxShadow="2xl" mb="7" justifyContent={"space-between"}>
                <Link to="/home">
                    <Image src={logo} alt="" h="100px" w="100px" />
                </Link>
                <ButtonGroup m="4" gap="2">
                    <Button colorScheme="black" variant="ghost">
                        <Link to="/mystore">
                            <FaCartPlus />
                            <Text>My Store</Text>
                        </Link>
                    </Button>
                    <Button colorScheme="black" variant="ghost" onClick={handleLogout}>
                        <Link to="/">
                            <IoLogOutOutline />
                            <Text>Logout</Text>
                        </Link>
                    </Button>
                    <Box colorScheme="black" width={'40px'} borderRadius={'50%'}>
                        <Link to="/profile">
                            <Image src={"https://picsum.photos/200"} alt={''} borderRadius={'50%'} />
                            <Text>User</Text>
                        </Link>
                    </Box>
                </ButtonGroup>
            </Flex>
            <hr />
        </div>
    );
}
export default Navbar;