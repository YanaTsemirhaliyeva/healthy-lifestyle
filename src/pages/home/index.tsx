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
            <Box px={{ base: 1, xs: 4 }}>
                <Box
                    m={{ base: '0 auto', xs: '0 auto 4px', sm: '0 auto 24px', lg: '0 auto 20px' }}
                    maxW={{ sm: '6xl' }}
                >
                   <TestBlock />
                </Box>
            </Box>
        </>
    );
