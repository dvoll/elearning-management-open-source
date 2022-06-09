import React from 'react';
import {
    useDisclosure,
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Code,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Header } from './Header';
import SidebarContent, { LinksPerCategory } from './SidebarContent';
import { Footer } from './Footer';
import { Main } from './Main';

export default function PageLayout({
    children,
    linksPerCategory,
    currentSlug,
}: {
    children: ReactNode;
    linksPerCategory: LinksPerCategory;
    currentSlug: string;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'flex' }}
                linksPerCategory={linksPerCategory}
                currentSlug={currentSlug}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <Box>
                        <SidebarContent
                            onClose={onClose}
                            linksPerCategory={linksPerCategory}
                            currentSlug={currentSlug}
                        />
                    </Box>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <Header onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Main>{children}</Main>
                <Spacer />
                <Footer>
                    <Text>
                        E-Learning zum Thema{' '}
                        <Code>
                            Management von kollaborativen Open Source Software Entwicklungsprojekten
                        </Code>
                    </Text>
                </Footer>
            </Box>
        </Box>
    );
}
