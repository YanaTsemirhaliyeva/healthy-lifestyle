import { Card, CardBody,Text } from "@chakra-ui/react";

export const TestComponent = ({text}: {text: string}) => (
    <Card>
        <CardBody>
            <Text>{text}</Text>
        </CardBody>
    </Card>
)