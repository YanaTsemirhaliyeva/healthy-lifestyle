import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Image,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

import { WheelItemI } from '~/consts/consts';

interface WheelResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: WheelItemI | null;
  itemIndex?: number;
}

export const WheelResultModal = ({ 
  isOpen, 
  onClose, 
  item, 
  itemIndex 
}: WheelResultModalProps) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mr={6}>
          <Flex align="center" gap={2}>
            {/* индекс и название */}
            <Flex align="center" gap={2}>
              <Text 
                fontSize="2xl" 
                fontWeight="bold" 
                color="blue.600"
                minW="56px"
              >
                #{itemIndex !== undefined && itemIndex >= 0 ? itemIndex + 1 : '?'}
              </Text>
              <Text fontSize="lg">{item.title}</Text>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            {item.src && (
              <Box borderRadius="lg" overflow="hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
            )}
            
            {item.description && (
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">
                  Описание:
                </Text>
                <Text color="gray.900">{item.description}</Text>
              </Box>
            )}
            
            {item.details && item.details.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">
                  Детали:
                </Text>
                <List spacing={2}>
                  {item.details.map((detail, index) => (
                    <ListItem key={index} display="flex" alignItems="start">
                      <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                      <Text color="gray.800">{detail}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            <Flex justify="flex-end" gap={3} pt={4}>
              <Button variant="outline" onClick={onClose}>
                Закрыть
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};