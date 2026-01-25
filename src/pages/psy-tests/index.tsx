import { Box } from "@chakra-ui/react";

import { TestList } from "~/components/test-list/TestList";

export const PsyTests = () => (
    <Box m='0 auto' minW={359} maxW='5xl'>
        <TestList />
    </Box>
)