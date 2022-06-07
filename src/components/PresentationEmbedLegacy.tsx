import React, { FunctionComponent } from 'react';
import { AspectRatio, useColorModeValue, Box, Text } from '@chakra-ui/react';

interface PresentationEmbedLegacyProps {
    presentationUrl?: string | null;
}

const PresentationEmbedLegacy: FunctionComponent<PresentationEmbedLegacyProps> = ({
    presentationUrl,
}) => {
    return (
        <AspectRatio
            maxW="56rem"
            ratio={16 / 9}
            paddingBottom="24px"
            filter={useColorModeValue('', 'invert(.8)')}
        >
            <Box>
                {presentationUrl ? (
                    <iframe
                        style={{ width: '100%', height: '100%' }}
                        src={presentationUrl}
                        width="921px"
                        height="600px"
                        frameBorder="0"
                    >
                        Dies ist ein eingebettetes{' '}
                        <a target="_blank" href="https://office.com">
                            Microsoft Office
                        </a>
                        -Dokument, unterstützt von{' '}
                        <a target="_blank" href="https://office.com/webapps">
                            Office
                        </a>
                        .
                    </iframe>
                ) : (
                    <Text>Keine Präsentation vorhanden</Text>
                )}
            </Box>
        </AspectRatio>
    );
};

export default PresentationEmbedLegacy;
