import {
    Box,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack
} from '@chakra-ui/react';
import React from 'react';

import { ProjectiveTestView } from './ProjectiveTestView';
import { StandardTestView } from './StandardTestView';
import { TestData, TestResult } from './test.types';

interface TestDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    test: TestData | null;
}

export const TestDetailModal: React.FC<TestDetailModalProps> = ({
    isOpen,
    onClose,
    test
}) => {
    if (!test) return null;

    const isProjective = test.type === 'image-grid' || test.type === 'single-image-options';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={isProjective ? '5xl' : '4xl'}
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent maxH="95vh" borderRadius="xl" mt={5}>
                <ModalHeader>
                    {/* <VStack align="start" spacing={2}>
                        <HStack>
                            <Heading size="lg" mr={4}>{test.title}</Heading>
                        </HStack>
                        <Text color="gray.600">{test.desc}</Text>
                    </VStack> */}
                </ModalHeader>

                <ModalCloseButton size="lg" />

                <ModalBody pb={8} mt={2} px={{base: 2, xs: 6}}>
                    <Tabs variant="enclosed" colorScheme="blue">
                        <TabList>
                            <Tab>Пройти тест</Tab>
                            <Tab>Описание</Tab>
                            {test.results && test.results.length > 0 && <Tab>Шкала результатов</Tab>}
                        </TabList>

                        <TabPanels>
                            {/* Вкладка с тестом */}
                            <TabPanel px={{base: 1, xs: 4}}>
                                {isProjective ? (
                                    <ProjectiveTestView test={test} />
                                ) : (
                                    <StandardTestView test={test} onComplete={onClose} />
                                )}
                            </TabPanel>

                            {/* Вкладка с описанием */}
                            <TabPanel px={{base: 1, xs: 4}}>
                                <VStack align="start" spacing={4}>
                                    <Box>
                                        <Heading size="sm" mb={2}>О тесте</Heading>
                                        <Text>{test.desc}</Text>
                                    </Box>

                                    <Box>
                                        <Heading size="sm" mb={2}>Как пройти</Heading>
                                        <VStack align="start" spacing={2}>
                                            {test.type === 'image-grid' && (
                                                <>
                                                    <Text>• Расслабьтесь и посмотрите на все изображения</Text>
                                                    <Text>• Выберите одну картинку, которая больше всего нравится</Text>
                                                    <Text>• Доверьтесь первому впечатлению</Text>
                                                </>
                                            )}
                                            {test.type === 'single-image-options' && (
                                                <>
                                                    <Text>• Расслабьтесь и посмотрите на изображение 10 секунд</Text>
                                                    <Text>• Отметьте первое, что увидели</Text>
                                                    <Text>• Не думайте слишком долго</Text>
                                                </>
                                            )}
                                            {!test.type || test.type === 'standard' && (
                                                <>
                                                    <Text>• Отвечайте честно, не пытаясь "угадать"</Text>
                                                    <Text>• Выбирайте ответ, который ближе всего к вашей ситуации</Text>
                                                    <Text>• Не пропускайте вопросы</Text>
                                                </>
                                            )}
                                        </VStack>
                                    </Box>
                                </VStack>
                            </TabPanel>

                            {/* Вкладка с результатами - показываем только если есть результаты */}
                            {test.results && test.results.length > 0 && (
                                <TabPanel px={{base: 1, xs: 4}}>
                                    <VStack spacing={4} align="stretch">
                                        {test.results.map((result: TestResult, index: number) => (
                                            <Box
                                                key={result.id || index}
                                                p={4}
                                                bg="gray.50"
                                                borderRadius="md"
                                                borderLeft="4px solid"
                                                borderColor={
                                                    index === 0 ? 'green.400' :
                                                        index === 1 ? 'blue.400' :
                                                            index === 2 ? 'orange.400' : 'red.400'
                                                }
                                            >
                                                <Heading size="sm" mb={2} color="gray.800">
                                                    {result.title}
                                                </Heading>
                                                <Text color="gray.600">
                                                    {result.desc}
                                                </Text>
                                                <Text mt={2} fontSize="sm" color="gray.500">
                                                    Баллы: {result.min}–{result.max}
                                                </Text>
                                            </Box>
                                        ))}
                                    </VStack>
                                </TabPanel>
                            )}
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};