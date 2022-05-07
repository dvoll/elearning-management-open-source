import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Link,
    BoxProps,
    FlexProps,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { ReactText } from 'react';
import { DarkModeSwitch } from './DarkModeSwitch';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export interface LinksPerCategory {
    [key: string]: Array<{ title: string; slug: string }>;
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    linksPerCategory: LinksPerCategory;
}

export default function SidebarContent({ onClose, linksPerCategory, ...rest }: SidebarProps) {
    return (
        <Flex
            flexDirection="column"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            paddingBlockStart={2}
            pos="fixed"
            h="full"
            overflowY="auto"
            {...rest}
        >
            <Flex alignSelf={'flex-end'} alignItems="center" mx="8" justifyContent="space-between">
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {Object.keys(linksPerCategory).map((linkCategory) => (
                <Box px="2" py="4" key={linkCategory}>
                    <Text fontSize="xs" fontFamily="monospace">
                        {linkCategory}
                    </Text>
                    {linksPerCategory[linkCategory].map((link) => (
                        <NavItem key={link.title} href={link.slug}>
                            {link.title}
                        </NavItem>
                    ))}
                </Box>
            ))}
            <Spacer />
            <Box p="4" mx="4">
                <DarkModeSwitch />
            </Box>
        </Flex>
    );
}

interface NavItemProps extends FlexProps {
    children: ReactText;
    href: string;
}
const NavItem = ({ children, href, ...rest }: NavItemProps) => {
    return (
        <Link
            as={GatsbyLink}
            to={href}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align="center"
                px="2"
                py="1"
                ml="2"
                my="1"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'teal',
                    color: 'white',
                }}
                {...rest}
            >
                <ArrowForwardIcon paddingEnd={2} w={6} h={6} flexShrink={0} />
                {children}
            </Flex>
        </Link>
    );
};
