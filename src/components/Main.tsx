import React from 'react';
import { Stack, StackProps } from '@chakra-ui/react';

export const Main = (props: StackProps) => (
    <Stack spacing="1.5rem" width="100%" maxWidth="56rem" {...props} />
);
