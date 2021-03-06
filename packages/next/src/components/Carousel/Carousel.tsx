import { TouchableOpacity } from "react-native";
import {
  Box,
  Container,
  Flex,
  HStack,
  Pressable,
  View,
  Image,
  VStack,
  Heading,
  Text,
  Skeleton,
  Button
} from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { MotiView } from "moti";
import { AnimatePresence } from "framer-motion";
import { resComicItem_T } from "app/types";
import { NextLink } from "app/components/NextLink";

type Props = {
  list: resComicItem_T[];
};

const images = [
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "data:image/jpeg;base64,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"
];

export const Carousel = (props: Props) => {
  const [imageId, setImageId] = React.useState(0);

  const goPrev = React.useCallback(
    () => setImageId((id) => (id > 0 ? id - 1 : props.list.length - 1)),
    []
  );

  const goNext = React.useCallback(
    () => setImageId((id) => (id < props.list?.length - 1 ? id + 1 : 0)),
    []
  );

  React.useEffect(() => {
    const emmit = setInterval(goNext, 10000);
    return () => clearInterval(emmit);
  }, [imageId]);

  return (
    <HStack
      w={["full"]}
      h={[200, 320]}
      bg={"white"}
      rounded={1}
      overflow={"hidden"}
    >
      {/* Icon */}
      <HStack
        _android={{ position: "absolute", left: 0, zIndex: 2, bottom: 0 }}
        // position={'absolute'}
        // left={0}
        // bottom={0}
        // zIndex={2}
        _web={{ position: "absolute", right: 0, zIndex: 2, bottom: 0 }}
        bg={"white"}
      >
        <Pressable
          _web={{
            cursor: "pointer"
          }}
          _hover={{
            bg: "blue.50"
          }}
          _pressed={{
            bg: "white",
            opacity: 0.6
          }}
          px={[3, 4, 11]}
          py={[3, 4, 15]}
          onPress={goPrev}
        >
          {({ isFocused, isHovered, isPressed }) => (
            <AntDesign
              name="arrowleft"
              size={16}
              color={isPressed ? "#777" : "black"}
            />
          )}
        </Pressable>

        <Pressable
          _web={{
            cursor: "pointer"
          }}
          _hover={{
            bg: "blue.50"
          }}
          _pressed={{
            bg: "white",
            opacity: 0.6
          }}
          px={[3, 4, 11]}
          py={[3, 4, 15]}
          onPress={goNext}
        >
          {({ isFocused, isHovered, isPressed }) => (
            <AntDesign
              name="arrowright"
              size={16}
              color={isPressed ? "#777" : "black"}
            />
          )}
        </Pressable>
      </HStack>
      {/* Icon */}

      {/* Content */}
      <VStack
        flex={3}
        px={[4, 12]}
        pt={[4, 12]}
        justifyContent={"space-between"}
      >
        <VStack space={[2, 4]}>
          <AnimatePresence exitBeforeEnter>
            {props.list?.length && imageId % 2 === 0 ? (
              <MotiView
                // style={{ flex: 1 }}
                key="0"
                exit={{
                  opacity: 0.1,
                  translateY: 24
                }}
                from={{
                  opacity: 0.1,
                  translateY: 24
                }}
                animate={{
                  opacity: 1,
                  translateY: 0
                }}
                transition={{
                  // loop: true,
                  type: "timing",
                  duration: 250
                }}
              >
                {/* <Heading mb={-2}>{props.list[imageId]?.name}</Heading> */}
                <Text
                  mb={-2}
                  fontSize={[15, 18, 24]}
                  fontWeight={600}
                  numberOfLines={2}
                >
                  {props.list[imageId]?.name}
                </Text>
              </MotiView>
            ) : (
              <MotiView
                // style={{ flex: 1 }}
                key="1"
                exit={{
                  opacity: 0.1,
                  translateY: 24
                }}
                from={{
                  opacity: 0.1,
                  translateY: 24
                }}
                animate={{
                  opacity: 1,
                  translateY: 0
                }}
                transition={{
                  // loop: true,
                  type: "timing",
                  duration: 250
                }}
              >
                {/* <Heading mb={-2}>{props.list[imageId]?.name}</Heading> */}
                <Text
                  mb={-2}
                  fontSize={[15, 18, 24]}
                  fontWeight={600}
                  numberOfLines={2}
                >
                  {props.list[imageId]?.name}
                </Text>
              </MotiView>
            )}
          </AnimatePresence>

          {/* Kind */}
          <View>
            <AnimatePresence exitBeforeEnter>
              {props.list?.length && imageId % 2 === 0 ? (
                <MotiView
                  // style={{ flex: 1 }}
                  key="0"
                  exit={{
                    opacity: 0.1,
                    translateY: 24
                  }}
                  from={{
                    opacity: 0.1,
                    translateY: 24
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0
                  }}
                  transition={{
                    // loop: true,
                    type: "timing",
                    duration: 250,
                    delay: 50
                  }}
                >
                  <HStack display={["none", "flex"]} space={4} mb={2}>
                    {props?.list[imageId]?.kind?.map((str) => {
                      return (
                        <Button variant={"subtle"} size={["xs", "sm"]}>
                          {str}
                        </Button>
                      );
                    })}
                  </HStack>
                  <Text
                    numberOfLines={4}
                    color={"gray.600"}
                    // numOfLines={3}

                    fontSize={[12, 16]}
                  >
                    {props.list[imageId]?.description}
                  </Text>
                </MotiView>
              ) : (
                <MotiView
                  // style={{ flex: 1 }}
                  key="1"
                  exit={{
                    opacity: 0.1,
                    translateY: 24
                  }}
                  from={{
                    opacity: 0.1,
                    translateY: 24
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0
                  }}
                  transition={{
                    // loop: true,
                    type: "timing",
                    duration: 250,
                    delay: 50
                  }}
                >
                  <HStack space={4} mb={2} display={["none", "flex"]}>
                    {props.list[imageId]?.kind?.map((str) => {
                      return (
                        <Button variant={"subtle"} size={"sm"}>
                          {str}
                        </Button>
                      );
                    })}
                  </HStack>
                  <Text
                    numberOfLines={4}
                    color={"gray.600"}
                    // numOfLines={3}

                    fontSize={[12, 16]}
                  >
                    {props.list[imageId]?.description}
                  </Text>
                </MotiView>
              )}
            </AnimatePresence>
          </View>
          {/* Kind */}
        </VStack>

        {/* Link */}
        <VStack
          alignItems={["flex-end", "flex-start"]}
          justifyContent={"center"}
          h={12}
        >
          <AnimatePresence exitBeforeEnter>
            {props.list?.length && imageId % 2 === 0 ? (
              <MotiView
                // style={{ flex: 1 }}
                key="0"
                exit={{
                  opacity: 0.1,
                  translateY: 24
                }}
                from={{
                  opacity: 0.1,
                  translateY: 24
                }}
                animate={{
                  opacity: 1,
                  translateY: 0
                }}
                transition={{
                  // loop: true,
                  type: "timing",
                  duration: 200,
                  delay: 100
                }}
              >
                <Pressable>
                  {({ isHovered, isPressed, isFocused }) => (
                    <NextLink
                      routeName="comic-detail"
                      params={{
                        path: props.list[imageId]?.path
                      }}
                    >
                      <Text
                        fontSize={[14, 18]}
                        fontWeight={"500"}
                        selectable={false}
                        color={
                          isPressed
                            ? "blue.300"
                            : isHovered
                            ? "blueGray.600"
                            : "coolGray.800"
                        }
                      >
                        Read now!
                      </Text>
                    </NextLink>
                  )}
                </Pressable>
              </MotiView>
            ) : (
              <MotiView
                // style={{ flex: 1 }}
                key="1"
                exit={{
                  opacity: 0.1,
                  translateY: 24
                }}
                from={{
                  opacity: 0.1,
                  translateY: 24
                }}
                animate={{
                  opacity: 1,
                  translateY: 0
                }}
                transition={{
                  // loop: true,
                  type: "timing",
                  duration: 200,
                  delay: 100
                }}
              >
                <Pressable>
                  {({ isHovered, isPressed, isFocused }) => (
                    <NextLink
                      routeName="comic-detail"
                      params={{
                        path: props.list[imageId]?.path
                      }}
                    >
                      <Text
                        fontSize={[14, 18]}
                        fontWeight={"500"}
                        selectable={false}
                        color={
                          isPressed
                            ? "blue.300"
                            : isHovered
                            ? "blueGray.600"
                            : "coolGray.800"
                        }
                      >
                        Read now!
                      </Text>
                    </NextLink>
                  )}
                </Pressable>
              </MotiView>
            )}
          </AnimatePresence>
        </VStack>
        {/* Link */}
      </VStack>

      {/* Img */}
      {props.list?.length ? (
        <Flex flex={[2, 1]}>
          <AnimatePresence exitBeforeEnter>
            {imageId % 2 === 0 ? (
              <MotiView
                style={{ flex: 1 }}
                key="0"
                exit={{
                  opacity: 0,
                  translateX: 100
                }}
                from={{
                  opacity: 0,
                  translateX: 100
                }}
                animate={{
                  opacity: 1,
                  translateX: 0
                }}
                transition={{
                  // loop: true,
                  type: "timing",
                  duration: 300
                }}
              >
                <Image
                  source={{
                    uri: props.list[imageId]?.posterUrl || ""
                  }}
                  flex={1}
                  alt={props.list[imageId]?.posterUrl || "a"}
                  progressiveRenderingEnabled={true}
                />
              </MotiView>
            ) : (
              <MotiView
                style={{ flex: 1 }}
                key="1"
                exit={{
                  opacity: 0,
                  translateX: 100
                }}
                from={{
                  opacity: 0,
                  translateX: 100
                }}
                animate={{
                  opacity: 1,
                  translateX: 0
                }}
                transition={{
                  // loop: true,
                  type: "timing",
                  duration: 300
                }}
              >
                <Image
                  source={{
                    uri: props.list[imageId]?.posterUrl || ""
                  }}
                  alt={props.list[imageId]?.posterUrl || ""}
                  flex={1}
                  progressiveRenderingEnabled={true}
                />
              </MotiView>
            )}
          </AnimatePresence>
        </Flex>
      ) : (
        <Skeleton flex={1} />
      )}
      {/* Content */}
    </HStack>
  );

  return (
    <div
      style={{
        width: 1000,
        height: 500
        // flex: 1
      }}
    >
      <div className="carousel">
        <div className="carousel__nav">
          <span id="moveLeft" className="carousel__arrow">
            <svg
              className="carousel__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
            </svg>
          </span>
          <span id="moveRight" className="carousel__arrow">
            <svg
              className="carousel__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
            </svg>
          </span>
        </div>
        <div className="carousel-item carousel-item--1">
          <div className="carousel-item__image"></div>
          <div className="carousel-item__info">
            <div className="carousel-item__container">
              <h2 className="carousel-item__subtitle">The grand moment </h2>
              <h1 className="carousel-item__title">Le tour</h1>
              <p className="carousel-item__description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
              <a href="#" className="carousel-item__btn">
                Explore the tour
              </a>
            </div>
          </div>
        </div>
        <div className="carousel-item carousel-item--2">
          <div className="carousel-item__image"></div>
          <div className="carousel-item__info">
            <div
              className="carousel-item__container"
              style={{ backgroundColor: "red" }}
            >
              <h2 className="carousel-item__subtitle">The big window </h2>
              <h1 className="carousel-item__title">Minimal window</h1>
              <p className="carousel-item__description">
                Clear Glass Window With Brown and White Wooden Frame iste natus
                error sit voluptatem accusantium doloremque laudantium.
              </p>
              <a href="#" className="carousel-item__btn">
                Read the article
              </a>
            </div>
          </div>
        </div>
        <div className="carousel-item carousel-item--3">
          <div className="carousel-item__image"></div>
          <div className="carousel-item__info">
            <div className="carousel-item__container">
              <h2 className="carousel-item__subtitle">Tropical palms </h2>
              <h1 className="carousel-item__title">Palms</h1>
              <p className="carousel-item__description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
              <a href="#" className="carousel-item__btn">
                Explore the palms
              </a>
            </div>
          </div>
        </div>

        <div className="carousel-item carousel-item--4">
          <div className="carousel-item__image"></div>
          <div className="carousel-item__info">
            <div className="carousel-item__container">
              <h2 className="carousel-item__subtitle">Beach </h2>
              <h1 className="carousel-item__title">The beach </h1>
              <p className="carousel-item__description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
              <a href="#" className="carousel-item__btn">
                Explore the beach
              </a>
            </div>
          </div>
        </div>

        <div className="carousel-item carousel-item--5">
          <div className="carousel-item__image"></div>
          <div className="carousel-item__info">
            <div className="carousel-item__container">
              <h2 className="carousel-item__subtitle">The white building </h2>
              <h1 className="carousel-item__title">White building</h1>
              <p className="carousel-item__description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
              <a href="#" className="carousel-item__btn">
                Read the article
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
