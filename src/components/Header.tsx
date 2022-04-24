import React from 'react';
import {
    IconButton,
    Avatar,
    Box, Flex,
    HStack,
    VStack, useColorModeValue, Text, FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Heading
} from '@chakra-ui/react';
import { DarkModeSwitch } from './DarkModeSwitch';
import { HamburgerIcon } from '@chakra-ui/icons';

interface HeaderProps extends FlexProps {
    onOpen: () => void;
}
export const Header = ({ onOpen, ...rest }: HeaderProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            minHeight="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between'}}
            {...rest}>
            <IconButton
                icon={<HamburgerIcon />}
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                marginInlineEnd={2} />

            <Heading as="h1" fontSize="md" fontFamily="monospace" fontWeight="bold" py="1">
                Management von kollaborativen Open Source Software Entwicklungs Projekten
            </Heading>
        </Flex>
    );
};
