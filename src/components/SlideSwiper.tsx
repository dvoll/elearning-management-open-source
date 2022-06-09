import React, { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { AspectRatio, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useProcessor } from './useRehypeProcessor';
import SwiperNavigation from './SwiperNavigation';
import 'swiper/css';
import './SlideSwiper.css';

interface SlideSwiperProps {
    images: any[];
    texts: string[];
}

const SlideSwiper = ({ images, texts }: SlideSwiperProps) => {
    const [isEnd, setIsEnd] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const onSwiperIndexChange = useCallback((newIndex: number) => {
        setActiveIndex(newIndex);
    }, []);
    const swiperRef = useRef<any>(null);
    if (images.length === 0) return null;
    return (
        <Flex flexWrap={'wrap'} maxW={'96rem'} gap={2}>
            <Box w={'full'} maxW={'56rem'}>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={(swiper) => {
                        onSwiperIndexChange(swiper.realIndex);
                        if (swiper.isEnd) {
                            setIsEnd(true);
                        } else {
                            setIsEnd(false);
                        }
                        if (swiper.isBeginning) {
                            setIsBeginning(true);
                        } else {
                            setIsBeginning(false);
                        }
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={image.base}>
                            <AspectRatio
                                w={'full'}
                                ratio={16 / 9}
                                filter={useColorModeValue('', 'invert(.8)')}
                            >
                                <GatsbyImage
                                    image={image}
                                    alt={`Slide ${index + 1}`}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </AspectRatio>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Flex
                flexDirection={'column'}
                flexGrow={1}
                flexBasis={'32rem'}
                maxW={'56rem'}
                alignContent={'stretch'}
                borderEnd="1px"
                borderBottom="1px"
                borderColor="teal"
                borderEndStartRadius={12}
                borderEndEndRadius={12}
            >
                <SwiperNavigation
                    isEnd={isEnd}
                    isBeginning={isBeginning}
                    activeIndex={activeIndex}
                    length={images.length}
                    onPrevSlide={() => swiperRef.current.slidePrev()}
                    onNextSlide={() => swiperRef.current.slideNext()}
                />
                <Box flexGrow={1} padding={4} paddingBlockStart={0}>
                    <SwitchTransition>
                        <CSSTransition
                            key={activeIndex}
                            addEndListener={(node, done) =>
                                node.addEventListener('transitionend', done, false)
                            }
                            classNames="slide-fade"
                        >
                            <Flex h={'full'}>
                                {texts[activeIndex] ? (
                                    <SlideText html={texts[activeIndex]} />
                                ) : (
                                    <Text
                                        pt={2}
                                        w={'full'}
                                        textAlign={'center'}
                                        fontStyle={'italic'}
                                        alignSelf={'center'}
                                        opacity={'.3'}
                                    >
                                        Kein Beschreibungstext zu dieser Folie vorhanden.
                                    </Text>
                                )}
                            </Flex>
                        </CSSTransition>
                    </SwitchTransition>
                </Box>
            </Flex>
        </Flex>
    );
};

const SlideText = ({ html }: { html?: string }) => {
    if (!html) return null;
    const processedBody = useProcessor(html);
    return <Box paddingBlockStart={4}>{processedBody}</Box>;
};

export default SlideSwiper;
