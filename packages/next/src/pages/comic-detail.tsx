import {
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
  HStack,
  Box,
  VStack,
  Container,
  Pressable,
  TextField,
  Input,
  Center
} from 'native-base'
import { ImageBackground } from 'react-native'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ComicDetailScreen } from 'app/screens'
import MemoCollapseHeader from 'app/components/CollapseHeader/CollapseHeader'
import { useApiComicDetail } from 'app/store/api'
import { NextLink } from 'app/components/NextLink'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import DetailList, { RoundView } from 'app/components/CollapseHeader/DetailList'
import ChapterList from 'app/components/CollapseHeader/ChapterList'
import { ListHeader } from 'app/components/ListHeader'
import { NavBar } from 'app/components/NavBar.web'
import { LinearGradient as LG } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import ChapterLink from '../components/ChapterLink'
import Header from 'app/components/CollapseHeader/Header'

function ComicDetail() {
  const router = useRouter()
  const { id, path } = router.query

  const { data } = useApiComicDetail((path || '') as string)
  const offset = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(offset.value)
    }
  })

  setTimeout(() => {
    offset.value = 1
  }, 2000)

  return (
    <>
      <View>
        <NavBar />
        <Header
          name={data?.title || ''}
          bio={`Rating ${data?.rate}`}
          photo={data?.posterUrl || ''}
        />
      </View>
      {/* Detail info */}

      <Center>
        <View>
          <HStack>
            <View w={'1/3'}>
              <RoundView
                style={{
                  backgroundColor: '$light.backgroundPrimary'
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    // fontFamily: QFontFamily.Quicksand_700Bold,
                    marginBottom: 8
                  }}
                >
                  Genre
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                  }}
                >
                  {data?.kind?.map((kind) => (
                    <Button
                      key={kind}
                      style={{ margin: 4 }}
                      size={'xs'}
                      variant={'subtle'}
                      colorScheme={'danger'}
                      onPress={
                        () => {}
                        // navigate('genres', {
                        //   genresName: kind
                        // })
                      }
                    >
                      {kind}
                    </Button>
                  ))}
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    // fontFamily: QFontFamily.Quicksand_700Bold,
                    marginBottom: 8
                  }}
                >
                  Complete info
                </Text>
                <View style={{ paddingLeft: 4 }}>
                  <Text style={{ color: '#ccc', fontSize: 11 }}>Author:</Text>

                  <Text
                    style={{
                      fontSize: 14
                      // fontFamily: QFontFamily.Quicksand_600SemiBold
                    }}
                  >
                    {data?.author}
                  </Text>

                  <Text style={{ color: '#ccc', fontSize: 11 }}>Status:</Text>
                  <Text
                    style={{
                      fontSize: 14
                      // fontFamily: QFontFamily.Quicksand_600SemiBold
                    }}
                  >
                    {data?.status}
                  </Text>
                  <Text style={{ color: '#ccc', fontSize: 11 }}>Rating:</Text>
                  <Text
                    style={{
                      fontSize: 14
                      // fontFamily: QFontFamily.Quicksand_600SemiBold
                    }}
                  >
                    {data?.rate}
                  </Text>
                  <Text style={{ color: '#ccc', fontSize: 11 }}>
                    Followers:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14
                      // fontFamily: QFontFamily.Quicksand_600SemiBold
                    }}
                  >
                    {data?.info}
                  </Text>
                </View>
              </RoundView>
            </View>

            <ChapterList
              data={data?.chapters}
              initialNumToRender={8}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
          </HStack>
        </View>
      </Center>
    </>
  )

  // return (
  //   // <View w={['full', '5/6', '4/5', '3/4']} alignSelf={'center'}>
  //   // {/* <Container maxW={'full'} w={'container'}> */}
  //   <MemoCollapseHeader comic={data} />
  //   // {/* </Container> */}
  //   // </View>
  // )

  // return (
  //   <View>
  //     <HStack>
  //       <View w={'1/3'}>
  //         <RoundView
  //           style={{
  //             backgroundColor: '$light.backgroundPrimary'
  //           }}
  //         >
  //           <Text
  //             style={{
  //               fontSize: 18,
  //               // fontFamily: QFontFamily.Quicksand_700Bold,
  //               marginBottom: 8
  //             }}
  //           >
  //             Genre
  //           </Text>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               flexWrap: 'wrap'
  //             }}
  //           >
  //             {data?.kind?.map((kind) => (
  //               <Button
  //                 key={kind}
  //                 style={{ margin: 4 }}
  //                 size={'xs'}
  //                 variant={'subtle'}
  //                 colorScheme={'danger'}
  //                 onPress={
  //                   () => {}
  //                   // navigate('genres', {
  //                   //   genresName: kind
  //                   // })
  //                 }
  //               >
  //                 {kind}
  //               </Button>
  //             ))}
  //           </View>
  //           <Text
  //             style={{
  //               fontSize: 18,
  //               // fontFamily: QFontFamily.Quicksand_700Bold,
  //               marginBottom: 8
  //             }}
  //           >
  //             Complete info
  //           </Text>
  //           <View style={{ paddingLeft: 4 }}>
  //             <Text style={{ color: '#ccc', fontSize: 11 }}>Author:</Text>

  //             <Text
  //               style={{
  //                 fontSize: 14
  //                 // fontFamily: QFontFamily.Quicksand_600SemiBold
  //               }}
  //             >
  //               {data?.author}
  //             </Text>

  //             <Text style={{ color: '#ccc', fontSize: 11 }}>Status:</Text>
  //             <Text
  //               style={{
  //                 fontSize: 14
  //                 // fontFamily: QFontFamily.Quicksand_600SemiBold
  //               }}
  //             >
  //               {data?.status}
  //             </Text>
  //             <Text style={{ color: '#ccc', fontSize: 11 }}>Rating:</Text>
  //             <Text
  //               style={{
  //                 fontSize: 14
  //                 // fontFamily: QFontFamily.Quicksand_600SemiBold
  //               }}
  //             >
  //               {data?.rate}
  //             </Text>
  //             <Text style={{ color: '#ccc', fontSize: 11 }}>Followers:</Text>
  //             <Text
  //               style={{
  //                 fontSize: 14
  //                 // fontFamily: QFontFamily.Quicksand_600SemiBold
  //               }}
  //             >
  //               {data?.info}
  //             </Text>
  //           </View>
  //         </RoundView>
  //       </View>

  //       <ChapterList
  //         data={data?.chapters}
  //         initialNumToRender={8}
  //         maxToRenderPerBatch={10}
  //         windowSize={10}
  //       />
  //     </HStack>
  //   </View>
  // )

  // return (
  //   <View flex={1} bg={'warmGray.100'}>
  //     <NavBar />
  //     <LG
  //       colors={['#ffffff', '#ffffffea', '#ddd3d3dc', '#b9a2a2ba', '#ad8c8c76']}
  //       start={{ x: 0, y: 1 }}
  //       end={{ x: 0, y: 0 }}
  //       // style={{ zIndex: 2 }}
  //     >
  //       <ImageBackground
  //         // style={}
  //         blurRadius={40}
  //         source={{ uri: data?.posterUrl }}
  //         style={{ width: 'full', height: 280 }}
  //         fadeDuration={500}
  //         imageStyle={{ opacity: 0.4, backgroundColor: '#000' }}
  //       />
  //     </LG>
  //     <Container
  //       // w={['full', 'lg', '4/5', '3/4', '2/3']}
  //       w={'container'}
  //       minW={'2/3'}
  //       // justifyContent={''}
  //       alignSelf={'center'}
  //       flexDirection={'column'}
  //       bg={'gray.50'}
  //     >
  //       <Box w={'full'}>
  //         <HStack
  //           bg={'white'}
  //           p={4}
  //           rounded={'2xl'}
  //           mt={-156}
  //           zIndex={100}
  //           borderWidth={10}
  //           borderColor={'gray.100'}
  //           shadow={'4'}
  //           space={8}
  //         >
  //           <View w={240} h={320} rounded={'2xl'} overflow={'hidden'}>
  //             {data?.posterUrl ? (
  //               <Image src={data?.posterUrl} height={320} width={100} />
  //             ) : null}
  //           </View>
  //           <VStack flex={1}>
  //             <HStack
  //               justifyContent={'space-between'}
  //               w={'full'}
  //               alignItems={'center'}
  //             >
  //               <Text
  //                 fontSize={32}
  //                 fontFamily={'Quicksand'}
  //                 fontWeight={700}
  //                 color={'darkBlue.36800'}
  //               >
  //                 {data?.title}
  //               </Text>
  //               {/* Star */}
  //               <HStack>
  //                 {new Array(Number.parseInt(data?.rate || '0'))
  //                   .fill(1)
  //                   .map((v, i) => {
  //                     return (
  //                       <AntDesign key={i} name="star" size={32} color="#bcd" />
  //                     )
  //                   })}

  //                 {new Array(5 - Number.parseInt(data?.rate || '0'))
  //                   .fill(1)
  //                   .map((v, i) => {
  //                     return (
  //                       <AntDesign
  //                         key={i}
  //                         name="staro"
  //                         size={32}
  //                         color="#bcd"
  //                       />
  //                     )
  //                   })}
  //               </HStack>
  //             </HStack>
  //             <HStack space={4} mt={2}>
  //               {data?.kind.map((item) => {
  //                 return (
  //                   <Button
  //                     size={'sm'}
  //                     p={2}
  //                     py={1}
  //                     variant={'subtle'}
  //                     colorScheme={'darkBlue'}
  //                     rounded={4}
  //                     _text={{
  //                       fontWeight: 600,
  //                       fontFamily: 'Quicksand',
  //                       fontSize: 16
  //                     }}
  //                   >
  //                     {item}
  //                   </Button>
  //                 )
  //               })}
  //             </HStack>
  //             <VStack
  //               flex={1}
  //               mt={4}
  //               flexDirection={'column'}
  //               justifyContent={'space-between'}
  //             >
  //               {/* <VStack flexDirection={'column'} justifyContent={'flex-start'}>
  //                 <Text
  //                   fontFamily={'Quicksand'}
  //                   fontSize={22}
  //                   fontWeight={600}
  //                   color={'darkBlue.700'}
  //                 >
  //                   Synopsis:
  //                 </Text>
  //                 <Text
  //                   fontFamily={'Quicksand'}
  //                   fontSize={16}
  //                   fontWeight={600}
  //                   color={'darkBlue.900'}
  //                 >
  //                   {data?.detail.trim()}
  //                 </Text>
  //               </VStack> */}

  //               <HStack justifyContent={'space-between'} maxW={480} mb={2}>
  //                 <VStack>
  //                   <Text
  //                     fontFamily={'Quicksand'}
  //                     fontSize={16}
  //                     fontWeight={600}
  //                     color={'blueGray.400'}
  //                   >
  //                     Author
  //                   </Text>
  //                   <Text
  //                     fontFamily={'Quicksand'}
  //                     fontSize={16}
  //                     fontWeight={600}
  //                     color={'blueGray.800'}
  //                   >
  //                     {data?.author}
  //                   </Text>
  //                 </VStack>

  //                 <VStack>
  //                   <Text
  //                     fontFamily={'Quicksand'}
  //                     fontSize={16}
  //                     fontWeight={600}
  //                     color={'blueGray.400'}
  //                   >
  //                     Follows
  //                   </Text>
  //                   <Text
  //                     fontFamily={'Quicksand'}
  //                     fontSize={16}
  //                     fontWeight={600}
  //                     color={'blueGray.800'}
  //                   >
  //                     {data?.follows}
  //                   </Text>
  //                 </VStack>

  //                 <VStack>
  //                   <Text
  //                     fontFamily={'Quicksand'}
  //                     fontSize={16}
  //                     fontWeight={600}
  //                     color={'blueGray.400'}
  //                   >
  //                     Info
  //                   </Text>
  //                   <Text
  //                     fontFamily={'Quicksand'}
  //                     fontSize={16}
  //                     fontWeight={600}
  //                     color={'blueGray.800'}
  //                   >
  //                     {data?.info}
  //                   </Text>
  //                 </VStack>
  //               </HStack>
  //             </VStack>
  //             <HStack alignItems={'flex-start'}>
  //               <Button
  //                 w={40}
  //                 // mx={'auto'}
  //                 // py={3}
  //                 rounded="md"
  //                 // mt={-4}
  //                 zIndex={10}
  //                 // position={'absolute'}
  //                 // bottom={0}
  //                 // ml={8}
  //                 colorScheme={'success'}
  //                 shadow={8}
  //               >
  //                 Read from first!
  //               </Button>

  //               <Button
  //                 w={40}
  //                 // mx={'auto'}
  //                 // py={3}
  //                 rounded="md"
  //                 // mt={-4}
  //                 zIndex={10}
  //                 // position={'absolute'}
  //                 // bottom={0}
  //                 ml={8}
  //                 colorScheme={'success'}
  //                 shadow={8}
  //               >
  //                 Read from last!
  //               </Button>
  //             </HStack>
  //           </VStack>
  //           <Button
  //             w={40}
  //             mx={'auto'}
  //             py={3}
  //             rounded="md"
  //             mt={-4}
  //             zIndex={10}
  //             position={'absolute'}
  //             bottom={0}
  //             ml={10}
  //             colorScheme={'warning'}
  //             shadow={8}
  //           >
  //             Add to favorite
  //           </Button>
  //         </HStack>
  //       </Box>
  //       {/* <ListHeader
  //         name={'Recently'}
  //         subtitle="New comic release"
  //         color="Blue"
  //       /> */}
  //       {/* <View flex={1}>
  //         <ListHeader name="All chapters" subtitle="Hello" />
  //       </View> */}
  //       <HStack m={6} space={4}>
  //         <VStack
  //           flexDirection={'column'}
  //           justifyContent={'flex-start'}
  //           w={'1/3'}

  //           // m={4}
  //         >
  //           <Box
  //             p={8}
  //             bg={'coolGray.100'}
  //             borderWidth={8}
  //             borderColor={'white'}
  //             rounded={'lg'}
  //             shadow={2}
  //           >
  //             <Text
  //               fontFamily={'Quicksand'}
  //               fontSize={22}
  //               fontWeight={600}
  //               color={'darkBlue.700'}
  //             >
  //               Synopsis:
  //             </Text>
  //             <Text
  //               fontFamily={'Quicksand'}
  //               fontSize={16}
  //               fontWeight={600}
  //               color={'darkBlue.900'}
  //             >
  //               {data?.detail.trim()}
  //             </Text>
  //           </Box>

  //           <Box
  //             p={8}
  //             bg={'coolGray.100'}
  //             borderWidth={8}
  //             borderColor={'white'}
  //             rounded={'lg'}
  //             shadow={2}
  //             mt={4}
  //           >
  //             <Text
  //               fontFamily={'Quicksand'}
  //               fontSize={22}
  //               fontWeight={600}
  //               color={'darkBlue.700'}
  //             >
  //               Comment:
  //             </Text>
  //             <Input />
  //           </Box>
  //         </VStack>

  //         <VStack
  //           flexDirection={'column'}
  //           justifyContent={'flex-start'}
  //           // w={'2/3'}
  //           flex={1}
  //           p={8}
  //           bg={'coolGray.100'}
  //           borderWidth={8}
  //           borderColor={'white'}
  //           rounded={'lg'}
  //           shadow={2}

  //           // m={4}
  //         >
  //           <Text
  //             fontFamily={'Quicksand'}
  //             fontSize={22}
  //             fontWeight={600}
  //             color={'darkBlue.700'}
  //           >
  //             Chapter:
  //           </Text>
  //           {data?.chapters.map((cpt, id) => {
  //             return (
  //               // <NextLink
  //               //   routeName="chapter"
  //               //   key={cpt.path}
  //               //   params={{
  //               //     comicPath: data?.path,
  //               //     cptId: data?.chapters.length - id
  //               //   }}
  //               // >
  //               //   <Pressable
  //               //     _focus={{
  //               //       borderColor: 'warmGray.300'
  //               //     }}
  //               //     borderWidth={2}
  //               //     borderColor={'transparent'}
  //               //     _hover={{ bg: 'red.50' }}
  //               //     flexDirection={'row'}
  //               //     justifyContent={'space-between'}
  //               //     w={'full'}
  //               //     bg={'coolGray.50'}
  //               //     // p={1}
  //               //     px={2}
  //               //     rounded={2}
  //               //     m={1}
  //               //   >
  //               //     <Text mr={'auto'}>{cpt.name}</Text>
  //               //     <Text>{cpt.updatedDistance}</Text>
  //               //   </Pressable>
  //               // </NextLink>
  //               <ChapterLink chapter={cpt} comicPath={data?.path} />
  //             )
  //           })}
  //         </VStack>
  //       </HStack>
  //     </Container>
  //   </View>
  // )

  return (
    <View>
      <Animated.View
        style={[
          {
            backgroundColor: 'red',
            width: 100,
            height: 100
          },
          animatedStyle
        ]}
      ></Animated.View>
      <NextLink routeName="/">Home</NextLink>
      {data?.path ? (
        <Image src={data?.posterUrl || ''} width={100} height={100} />
      ) : null}
      <Text>{data?.title}</Text>
      <Text>{data?.rate}</Text>
      <Text>{data?.author}</Text>
      <Text>{data?.detail}</Text>
      <Text>{data?.follows}</Text>
      <Text>{data?.info}</Text>
      <Text>{data?.status}</Text>
      <ScrollView>
        {data?.kind.map((kind) => (
          <Button>{kind}</Button>
        ))}
      </ScrollView>
      <FlatList
        data={data?.chapters || []}
        renderItem={({ item, index, separators }) => {
          return <Text>{item.name}</Text>
        }}
      />
    </View>
  )
}

export default ComicDetail
