import React, {
    Fragment,
    useEffect,
    useState,
    createElement,
    AnchorHTMLAttributes,
    HTMLAttributes,
} from 'react';
import {
    Heading,
    HeadingProps,
    Link,
    ListItem,
    OrderedList,
    Table,
    Tbody,
    Text,
    TextProps,
    Tfoot,
    Thead,
    Tr,
    Th,
    Td,
    TableContainer,
    UnorderedList,
} from '@chakra-ui/react';
import rehypeParse from 'rehype-parse/lib';
import rehypeReact from 'rehype-react/lib';
import { unified } from 'unified';

export function useProcessor(text: string) {
    const [Content, setContent] = useState<any>(Fragment);

    useEffect(() => {
        unified()
            .use(rehypeParse, { fragment: true })
            .use(rehypeReact, {
                createElement,
                components: {
                    h1: (props: HeadingProps) => (
                        <Heading fontSize="lg" mb="4" as="h2" {...props} />
                    ),
                    h2: (props: HeadingProps) => (
                        <Heading fontSize="lg" mt="4" mb="2" as="h3" {...props} />
                    ),
                    h3: (props: HeadingProps) => (
                        <Heading fontSize="lg" mt="4" mb="2" as="h4" {...props} />
                    ),
                    h4: (props: HeadingProps) => (
                        <Heading fontSize="lg" mt="2" mb="2" as="h5" {...props} />
                    ),
                    h5: (props: HeadingProps) => (
                        <Heading fontSize="lg" mt="2" mb="1" as="h6" {...props} />
                    ),
                    p: (props: TextProps) => <Text mb="2" {...props} />,
                    ul: (props: HTMLAttributes<HTMLUListElement>) => (
                        <UnorderedList mb="1" pl="4" {...props} />
                    ),
                    ol: (props: HTMLAttributes<HTMLOListElement>) => (
                        <OrderedList mb="1" pl="4" {...props} />
                    ),
                    li: ListItem,
                    hr: () => <hr style={{ marginBottom: '1rem' }} />,
                    a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <Link {...props} />,
                    blockquote: (props: unknown) => (
                        <Text
                            as="blockquote"
                            pl="2"
                            borderLeft="4px"
                            borderColor="teal"
                            {...props}
                        />
                    ),
                    table: (props: HTMLAttributes<HTMLTableElement>) => (
                        <TableContainer>
                            <Table {...props} />
                        </TableContainer>
                    ),
                    thead: Thead,
                    tbody: Tbody,
                    tfoot: Tfoot,
                    th: Th,
                    tr: Tr,
                    td: Td,
                },
            })
            .process(text)
            .then((file) => {
                setContent(file.result);
            });
    }, [text]);

    return Content;
}
