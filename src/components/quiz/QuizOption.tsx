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
}

const QuizOption = ({ label, selected, status, ...rest }: QuizOptionProps) => {
    const foreground = useColorModeValue('gray.900', 'white');
    const background = 'transparent';
    const backgroundActive = 'teal';
    return (
        // borderRadius={}="25px"
        <Button
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
            {/* <Box
                pos="absolute"
                inset="0"
                borderRadius="25px"
                borderWidth="1px"
                boxSizing="border-box"
                borderColor={foreground}
            /> */}
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
