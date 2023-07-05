import { useEffect, useState } from "react";
import {
  Box,
  CloseIcon,
  FlatList,
  HStack,
  Input,
  Text,
  VStack,
} from "native-base";
import { isNumeric, trimHTML } from "../logic/Utilities";
import { Pressable } from "react-native";
import AnimatedPressable from "./AnimatedPressable";

const Search = ({ data }: { data: any }) => {
  // States
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // Handlers
  const inputHandler = (value: string) => {
    setSearch(value);
  };

  const resultItemHandler = (slide: number) => {
    if (data?.onSelect) data?.onSelect(slide);
    setSearch("");
  };

  // Effects
  useEffect(() => {
    if (search) {
      const res =
        data?.data
          ?.map((obj: any, index: number) => ({ ...obj, slide: index }))
          .filter((slide: any) =>
            isNumeric(search)
              ? slide?.slide + 1 === parseInt(search)
              : slide?.title?.includes(search) ||
                slide?.longText?.includes(search)
          ) || [];
      setResults(res);
    }
  }, [search]);

  return (
    <>
      <Input
        value={search}
        bg="white"
        placeholder="Search..."
        _focus={{ backgroundColor: "white", borderColor: "gray.200" }}
        onChangeText={inputHandler}
        InputRightElement={
          search ? (
            <Pressable onPress={() => setSearch("")}>
              <CloseIcon size="sm" mr="2" />
            </Pressable>
          ) : (
            <></>
          )
        }
      />
      {search.trim().length > 0 ? (
        results.length > 0 ? (
          <Box
            w="full"
            h={`${Math.min(48 * results.length, 256)}px`}
            bg="white"
            borderRadius="sm"
            position="absolute"
            top="10"
            borderWidth={1}
            borderColor="gray.200"
            overflow="hidden"
            zIndex={1}
          >
            <FlatList
              data={results}
              renderItem={(item: any) => (
                <Box minH="12" borderBottomWidth={1} borderColor="gray.100">
                  <AnimatedPressable
                    minH="12"
                    onPress={() => resultItemHandler(item?.item?.slide)}
                  >
                    <VStack minH="12" space="0.5" p="2" justifyContent="center">
                      <HStack w="full" justifyContent="space-between" space="2">
                        {item?.item?.title && item?.item?.longText ? (
                          <Text bold numberOfLines={1} fontSize="xs">
                            {trimHTML(item?.item?.title)}
                          </Text>
                        ) : item?.item?.longText ? (
                          <Text numberOfLines={1} fontSize="xs">
                            {trimHTML(item?.item?.longText)}
                          </Text>
                        ) : item?.item?.image ? (
                          <Text numberOfLines={1} fontSize="xs">
                            Image
                          </Text>
                        ) : null}
                        <Text fontSize="xs" color="gray.400">
                          p{item?.item?.slide + 1}
                        </Text>
                      </HStack>

                      {item?.item?.title && item?.item?.longText && (
                        <Text numberOfLines={1} fontSize="xs">
                          {trimHTML(item?.item?.longText)}
                        </Text>
                      )}
                    </VStack>
                  </AnimatedPressable>
                </Box>
              )}
            />
          </Box>
        ) : (
          <Box
            w="full"
            h="12"
            bg="white"
            borderRadius="sm"
            position="absolute"
            top="10"
            borderWidth={1}
            borderColor="gray.200"
            overflow="hidden"
            zIndex={1}
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xs" color="gray.500">
              Nothing found
            </Text>
          </Box>
        )
      ) : null}
    </>
  );
};

export default Search;
