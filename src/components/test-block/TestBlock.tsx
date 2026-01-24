import { Grid } from "@chakra-ui/react";

import { TEST_BLOCK_THEMES } from "~/consts/consts";

import { VerticalCard } from "../vertical-card/VerticalCard";

export const TestBlock = () => (
    <Grid
        templateColumns={{
            base: '1fr',
            xs: 'repeat(2, 1fr)',
        }}
        gap={{ base: 3, xs: '14px', sm: '14px', xl: 5 }}
        alignItems='stretch'
        autoRows='1fr'
    >
        {TEST_BLOCK_THEMES.map((item, i) => (
            <VerticalCard
                item={item}
                key={i}
            />
        ))}
    </Grid>
)