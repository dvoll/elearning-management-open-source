import React from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Box, ButtonGroup, Button, Text } from '@chakra-ui/react';

interface SwiperNavigationProps {
    isEnd: boolean;
    isBeginning: boolean;
    activeIndex: number;
    length: number;
    onNextSlide: () => void;
    onPrevSlide: () => void;
}

const SwiperNavigation = ({
    isEnd,
    isBeginning,
    activeIndex,
    length,
    onNextSlide,
    onPrevSlide,
}: SwiperNavigationProps) => {
    return (
        <Flex
            padding={4}
            paddingBlockEnd={0}
            paddingBlockStart={2}
            justifyContent={'space-between'}
            borderColor="teal"
        >
            <Box>
                <Text fontSize={'xs'}>Folie</Text> {activeIndex + 1} / {length}{' '}
            </Box>
            <ButtonGroup>
                <Button onClick={onPrevSlide} leftIcon={<ArrowBackIcon />} disabled={isBeginning}>
                    zurück
                </Button>
                <Button
                    onClick={onNextSlide}
                    colorScheme={'teal'}
                    rightIcon={<ArrowForwardIcon />}
                    disabled={isEnd}
                >
                    Nächste Folie
                </Button>
            </ButtonGroup>
        </Flex>
    );
};

export default SwiperNavigation;
