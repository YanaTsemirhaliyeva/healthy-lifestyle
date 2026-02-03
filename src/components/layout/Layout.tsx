import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { CornflowersBg } from './CornflowerBackground';

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
    <Flex flexDirection='column' h='100%' minH='100vh' w='100%' minW='359px' overflow='hidden'>
        <Header />
        <Box
            as='main'
            pt={{ base: '82px', sm: '56px' }}
            pb={{ base: '110px', md: '80px' }}
            display='flex'
            flexDir='column'
            flexGrow={1}
            bgColor='#e3e9f3'
            pos='relative'
        >
            {/* Фон с васильками */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={0}
                pointerEvents="none"
            >
                <CornflowersBg />
            </Box>
            {children}
        </Box>
        <Box
            w='100%'
            minW='359px'
            zIndex='2'
        >
            <Footer />
        </Box>
    </Flex>
);
