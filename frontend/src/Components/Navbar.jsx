import {
    Flex,
    ButtonGroup,
    Button,
    Text,
    Input,
    IconButton,
    Image
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png"
import { FaCartPlus } from "react-icons/fa6";
function Navbar() {
    
    return (
        <div>
            <Flex minWidth="max-content" alignItems="center" gap="2" boxShadow="2xl" mb="7" justifyContent={"space-between"}>
                <Link to="/">
                    <Image src={logo} alt="" h="100px" w="100px" />
                </Link>
                <ButtonGroup m="4" gap="2">
                    <Button colorScheme="black" variant="ghost">
                        <Link to="/cart">
                            <FaCartPlus />
                        </Link>
                    </Button>
                    <Button colorScheme="black" variant="outline" borderRadius={'50%'}>
                        <Link to="/profile">
                            <Image src={""}/>
                        </Link>
                    </Button>
                </ButtonGroup>
            </Flex>
            <hr />
        </div>
    );
}
export default Navbar;