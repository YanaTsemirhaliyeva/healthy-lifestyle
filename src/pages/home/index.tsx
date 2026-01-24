import { Box } from '@chakra-ui/react';

import { HelmetComponent } from '~/components/helmet-component/HelmetComponent';
import { SwiperPromo } from '~/components/swiper-promo/SwiperPromo';
import { TestBlock } from '~/components/test-block/TestBlock';
import { PAGE_META } from '~/consts/page-meta';


export const Home = () => (
        <>
            <HelmetComponent {...PAGE_META.Home} />
            <Box maxW='100%' mb={8}>
                <SwiperPromo />
            </Box>
            <Box
                pl={{ base: '16px', xs: '20px', sm: '28px' }}
                pr={{ xs: '20px', sm: '54px', md: '70px' }}
            >
                <Box
                    m={{ base: '0 auto', xs: '0 auto 4px', sm: '0 auto 24px', lg: '0 auto 20px' }}
                    maxW={{ base: '500px', sm: '5xl' }}
                    pr={{ base: 4, '2xs': 0 }}
                >
                   <TestBlock />
                </Box>
            </Box>
        </>
    );
