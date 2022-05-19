import { CheckIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    ChakraComponent,
    ChakraProps,
    Flex,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

export interface QuizOptionProps extends ChakraProps {
    label: string;
    selected: boolean;
    status?: 'wrong' | 'correct';
    onClick: () => void;
}

const QuizOption = ({ label, selected, status, ...rest }: QuizOptionProps) => {
    const foreground = useColorModeValue('gray.900', 'white');
    const background = 'transparent';
    const backgroundActive = 'teal';
    return (
        // borderRadius={}="25px"
        <Button
            isActive={selected}
            as="div"
            border="4px"
            borderColor={'transparent'}
            paddingInline="8"
            paddingBlock="2"
            // color={foreground}
            // background={selected ? backgroundActive : background}
            pos="relative"
            borderRadius="25px"
            w="full"
            {...rest}
        >
            {status !== undefined && (
                <Box
                    pos="absolute"
                    inset="-4px"
                    borderRadius="25px"
                    borderWidth="2px"
                    boxSizing="border-box"
                    borderColor={status === 'correct' ? 'green' : 'red'}
                />
            )}
            <Flex
                pos="absolute"
                insetBlock="0"
                insetInlineStart="0"
                width="50px"
                align="center"
                justify="center"
            >
                {selected && <CheckIcon />}
            </Flex>
            <Box>
                <Text textAlign={'center'} fontStyle="italic" fontSize="md">
                    {label}
                </Text>
            </Box>
        </Button>
    );
};

export default QuizOption;
