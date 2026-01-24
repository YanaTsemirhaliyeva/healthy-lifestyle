import {
    Box,
    Flex,
    Link,
    useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

export const Header = () => {
    // const isMdOrAbove = useBreakpointValue({ base: false, md: true });
    const { isOpen, onClose } = useDisclosure();

    const handleReset = () => {
        onClose();
    };

    return (
        <Box
            as='header'
            bgColor={isOpen ? 'lime.50' : 'lime.100'}
            pos='fixed'
            top='0'
            left='0'
            width='100%'
            minW='359px'
            zIndex={isOpen ? '1500' : '3'}
            sx={{
                boxShadow: {
                    base: '0 0 3px rgba(225, 255, 148, 0.6), 0 0 15px rgba(225, 255, 148, 0.5)',
                    md: '0 0 6px rgba(225, 255, 148, 0.8), 0 0 25px rgba(225, 255, 148, 0.6)'
                }
            }}
        >
            <Flex
                m='0 auto'
                alignItems='center'
                p={{ base: '14px 18px', sm: '16px' }}
                pr={{ '2xs': 6, md: '76px' }}
                maxW='5xl'
            >
                <Link
                    as={RouterLink}
                    to='/'
                    // w={{ base: '34px', '2xs': '135px' }}
                    h='auto'
                    mr={{ md: '128px' }}
                    onClick={handleReset}
                >
                    здесь будет меню или логотип?
                </Link>

            </Flex>
        </Box>
    );
};
