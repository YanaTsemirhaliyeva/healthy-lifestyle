import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
        <Flex flexDirection='column' h='100%' minH='100vh' w='100%' minW='359px'>
            <Header />
            <Box
                as='main'
                pt={{ base: '82px', sm: '56px' }}
                pb={{ base: '110px', md: '80px' }}
                display='flex'
                flexDir='column'
                flexGrow={1}
                bgColor='lime.50'
            >
                {children}
            </Box>
            <Box
                // pos='fixed'
                // left='0'
                // bottom='0'
                w='100%'
                minW='359px'
                zIndex='2'
            >
                <Footer />
            </Box>
        </Flex>
    );
