import { Box } from "@chakra-ui/react";

import { PSY_TESTS } from "~/consts/consts";

import { TestComponent } from "../test-component/TestComponent";

export const TestList = () => (
    <Box pt={10}>
        {PSY_TESTS.map((test) => (  
            <TestComponent 
                key={test.id} 
                text={test.title} 
            />
        ))}
    </Box>
);