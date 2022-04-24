import React from 'react';
import { useDisclosure, Box, useColorModeValue, Drawer, DrawerContent } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "./Header";


export default function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            {/* <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            /> */}
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <Box>
                        drawer content
                        {/* <SidebarContent onClose={onClose} /> */}
                    </Box>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <Header onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}