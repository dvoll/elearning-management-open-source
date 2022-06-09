import React, { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { AspectRatio, Box, Text, useColorModeValue } from '@chakra-ui/react';
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
        <>
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
                            maxW="56rem"
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
            <SwiperNavigation
                isEnd={isEnd}
                isBeginning={isBeginning}
                activeIndex={activeIndex}
                length={images.length}
                onPrevSlide={() => swiperRef.current.slidePrev()}
                onNextSlide={() => swiperRef.current.slideNext()}
            />
            <Box
                padding={4}
                paddingBlockStart={0}
                borderInline="1px"
                borderBottom="1px"
                borderColor="teal"
                borderEndStartRadius={12}
                borderEndEndRadius={12}
            >
                <SwitchTransition>
                    <CSSTransition
                        key={activeIndex}
                        addEndListener={(node, done) =>
                            node.addEventListener('transitionend', done, false)
                        }
                        classNames="slide-fade"
                    >
                        <Box>
                            <SlideText html={texts[activeIndex]} />
                        </Box>
                    </CSSTransition>
                </SwitchTransition>
            </Box>
        </>
    );
};

const SlideText = ({ html }: { html?: string }) => {
    if (!html) return null;
    const processedBody = useProcessor(html);
    return <Box paddingBlockStart={4}>{processedBody}</Box>;
};

export default SlideSwiper;
