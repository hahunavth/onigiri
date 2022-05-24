// // import { Button, FlatList, Input, Text, View } from 'native-base'
// // import React from 'react'
// // import {
// //   TouchableNativeFeedback,
// //   ListRenderItemInfo,
// //   TextInput
// // } from 'react-native'
// // import { ComicListVertical } from 'app/components/ComicListVertical'
// // import { useApiInfinityRecently } from '../../hooks/useApiInfinityItem'
// // import { useApiLazyRecently, useApiRecently } from '../../store/api'
// // import { useAppDispatch, useAppSelector } from '../../store/hooks'
// // import {
// //   fetchNewChapterNotificationThunk,
// //   notificationSelector
// // } from '../../store/notificationSlice'
// // import { resComicItem_T } from '../../types'
// // import AsyncStorage from '@react-native-async-storage/async-storage'
// // import { fetchBackgroundTask } from '../../utils/backgroundFetchServices'

// // export function MainTestScreen() {
// //   // const { fetchNextPage, results } = useApiInfinityRecently()
// //   // const dispatch = useAppDispatch()
// //   // React.useEffect(() => {
// //   //   dispatch(fetchNewChapterNotificationAsync())
// //   // }, [])
// //   // return <MemoComicListVertical list={results} onEndReach={fetchNextPage} />
// //   const { count, mergeCount } = useAppSelector(notificationSelector)
// //   const [str, setStr] = React.useState('')
// //   const [text, setText] = React.useState('')
// //   const inputRef = React.useRef<TextInput>()

// //   React.useEffect(() => {
// //     AsyncStorage.getItem('background-fetch-last-number').then((s) =>
// //       s ? setStr(s) : null
// //     )
// //     fetchBackgroundTask()
// //   }, [])

// //   AsyncStorage.getAllKeys().then((a) => console.log(a))
// //   AsyncStorage.getItem('notifications-template').then((a) => {
// //     console.log('result')
// //     console.log(a ? JSON.parse(a) : 'cant parse')
// //   })

// //   return (
// //     <View>
// //       <Text>Count: {count}</Text>
// //       <Text>async storage background-fetch-last-number: {str}</Text>
// //       <Text>mergeCount: {mergeCount}</Text>
// //       <Input value={text} onChangeText={(e) => setText(e)}></Input>
// //       <Button
// //         onPress={() =>
// //           AsyncStorage.getItem(text).then((s) => (s ? setStr(s) : null))
// //         }
// //       >
// //         RefreshInfo
// //       </Button>
// //     </View>
// //   )
// // }

// // // const MemoComicListVertical = React.memo(ComicListVertical)

// /**
//  * ZoomView
//  */

// /**
//  * ZoomView
//  */
// // import { Center, Text, View, VStack } from "native-base";
// // import React from "react";
// // import {
// //   Alert,
// //   ScrollView,
// //   Dimensions,
// //   Animated,
// //   PanResponder,
// //   Platform
// // } from "react-native";
// // import { TextTest, TextXsS } from "app/components/Typo";
// // import i18n from "i18n-js";
// // // NOTE: ADS
// // import {
// //   AdMobBanner,
// //   AdMobInterstitial,
// //   PublisherBanner,
// //   AdMobRewarded,
// //   setTestDeviceIDAsync
// // } from "expo-ads-admob";
// // import {
// //   useApiOriginComicDetail,
// //   useApiOriginRecently
// // } from "app/store/apiOrigin";
// // import { useAppSelector } from "app/store/hooks";
// // import {
// //   notificationSelector,
// //   selectAlleNewChapterNotification
// // } from "app/store/notificationSlice";
// // import { useWindowDimensions } from "react-native";
// // import RenderHtml from "react-native-render-html";
// // import { fetchBackgroundTask } from "app/utils/backgroundFetchServices";

// // // import AsyncStorage from '@react-native-async-storage/async-storage'
// // // @ts-ignore
// // import HTMLParser from "fast-html-parser";
// // import { mmkvStorage } from "app/utils/mmkvStorage";
// // import DynamicColumnGrid from "app/components/DynamicColumnGrid/DynamicColumnGrid";
// // import { DayAndNight } from "app/components/EmptyPage";

// // const source = {
// //   html: `
// //   <ul>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/anh-hung-onepunch-4389">
// //   <img src="https://st.nettruyenmoi.com/data/comics/37/anh-hung-onepunch.jpg" alt="Anh Hùng OnePunch">
// //   <h3>Anh Hùng OnePunch</h3>
// //   <h4>
// //   <i>Chapter 208</i>
// //   <i>
// //   <b>ONE - Murata Yuusuke</b>
// //   </i>
// //   <i>Action, Comedy, Manga</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/goblin-slayer-gaiden-year-one-17265">
// //   <img src="//st.nettruyenmoi.com/data/comics/113/goblin-slayer-gaiden-year-one.jpg" alt="Goblin Slayer Gaiden: Year One">
// //   <h3>Goblin Slayer Gaiden: Year One</h3>
// //   <h4>
// //   <i>Chapter 43.5</i>
// //   <i>Goblin Slayer Side Story: Year One</i>
// //   <i>Action, Adventure, Drama, Fantasy, Mature, Seinen, Tragedy</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/toorigakari-ni-one-point-advice-shiteiku-type-no-yankee-28785">
// //   <img src="//st.nettruyenmoi.com/data/comics/113/toorigakari-ni-one-point-advice-shiteiku-885.jpg" alt="Toorigakari ni one point advice shiteiku type no yankee">
// //   <h3>Toorigakari ni one point advice shiteiku type no yankee</h3>
// //   <h4>
// //   <i>Chapter 43</i>
// //   <i>One Point Yankee - <b>Otsuji</b></i>
// //   <i>Comedy, Manga, Romance, Seinen, Slice of Life</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/nhan-vien-van-phong-duoc-trieu-hoi-thanh-tu-dai-thien-vuong-o-the-gioi-khac-42975">
// //   <img src="//st.nettruyenmoi.com/data/comics/223/nhan-vien-van-phong-duoc-trieu-hoi-thanh-4188.jpg" alt="Nhân Viên Văn Phòng Được Triệu Hồi Thành Tứ Đại Thiên Vương Ở Thế Giới Khác">
// //   <h3>Nhân Viên Văn Phòng Được Triệu Hồi Thành Tứ Đại Thiên Vương Ở Thế Giới Khác</h3>
// //   <h4>
// //   <i>Chapter 26</i>
// //   <i>Salaryman ga Isekai ni Ittara Shitennou ni Natta Hanashi; Sarariiman ga Isekai ni Ittara Shitennou ni Natta Hanashi; Story About a Salaryman Who Became one of the Four Heavenly Kings When he Went to Another World</i>
// //   <i>Action, Adventure, Chuyển Sinh, Ecchi, Fantasy, Manga, Shounen, Slice of Life, Supernatural</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/cac-one-shot-cua-fujiko-fujio-24824">
// //   <img src="//st.nettruyenmoi.com/data/comics/248/cac-one-shot-cua-fujiko-fujio.jpg" alt="Các one-shot của Fujiko Fujio">
// //   <h3>Các one-shot của Fujiko Fujio</h3>
// //   <h4>
// //   <i>Chapter 62.2</i>
// //   <i>
// //   <b>Fujiko F. Fujio</b>
// //   </i>
// //   <i>Comedy, Fantasy, Manga, One shot</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/one-room-hiatari-futsuu-tenshi-tsuki-38449">
// //   <img src="//st.nettruyenmoi.com/data/comics/49/one-room-hiatari-futsuu-tenshi-tsuki.jpg" alt="One Room, Hiatari Futsuu, Tenshi Tsuki">
// //   <h3>One Room, Hiatari Futsuu, Tenshi Tsuki</h3>
// //   <h4>
// //   <i>Chapter 6</i>
// //   <i>Studio Apartment, Good Lighting, Angel Included , One Room, Normal Sunlight, with an Angel.</i>
// //   <i>Comedy, Ecchi, Mystery, Romance, School Life, Shounen, Slice of Life, Supernatural</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/sachi-iro-no-one-room-17616">
// //   <img src="//st.nettruyenmoi.com/data/comics/208/sachi-iro-no-one-room.jpg" alt="Sachi-iro no One Room">
// //   <h3>Sachi-iro no One Room</h3>
// //   <h4>
// //   <i>Chapter 55</i>
// //   <i>Sachiiro No One Room</i>
// //   <i>Action, Adventure, Shounen</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/kirei-na-onee-san-to-nomu-osake-wa-suki-desu-ka-26304">
// //   <img src="//st.nettruyenmoi.com/data/comics/192/kirei-na-onee-san-to-nomu-osake-wa-suki-8630.jpg" alt="Kirei na Onee-san to Nomu Osake wa Suki desu ka?">
// //   <h3>Kirei na Onee-san to Nomu Osake wa Suki desu ka?</h3>
// //   <h4>
// //   <i>Chapter 6</i>
// //   <i>Bạn có thích uống rượu cùng một cô gái xinh đẹp, Kirei na Onee-san to Nomu Osake wa Suki desu ka?; Do You Like Drinking Alcohol with a Beautiful Woman? - <b>Minami Izumi</b></i>
// //   <i>Comedy, Romance, Seinen, Slice of Life</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/dam-phat-chet-luon-goc-15552">
// //   <img src="//st.nettruyenmoi.com/data/comics/192/onepunch-man-one.jpg" alt="Đấm phát chết luôn (Gốc)">
// //   <h3>Đấm phát chết luôn (Gốc)</h3>
// //   <h4>
// //   <i>Chapter 141</i>
// //   <i>One Punch-Man (ONE) - <b>ONE</b></i>
// //   <i>Action, Comedy, Fantasy, Manga, Sci-fi</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/tsuki-50-man-moratte-mo-ikigai-no-nai-tonari-no-onee-san-ni-30-man-de-yatowarete-okaeri-tte-iu-36892">
// //   <img src="//st.nettruyenmoi.com/data/comics/28/tsuki-50-man-moratte-mo-ikigai-no-nai-to-9515.jpg" alt="Tsuki 50-man moratte mo Ikigai no nai Tonari no Onee-san ni 30-man de Yatowarete &quot;Okaeri&quot; tte Iu">
// //   <h3>Tsuki 50-man moratte mo Ikigai no nai Tonari no Onee-san ni 30-man de Yatowarete "Okaeri" tte Iu</h3>
// //   <h4>
// //   <i>Chapter 2</i>
// //   <i>It's Fun Having a 300,000 Yen a Month Job Welcoming Home an Onee-san Who Doesn't Find Meaning in a Job That Pays Her 500,000 Yen a Month</i>
// //   <i>Comedy, Manga, Romance, Slice of Life</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/anh-hung-onepunch-vs-god-23418">
// //   <img src="//st.nettruyenmoi.com/data/comics/122/anh-hung-onepunch-vs-god.jpg" alt="Anh Hùng OnePunch vs God">
// //   <h3>Anh Hùng OnePunch vs God</h3>
// //   <h4>
// //   <i>Chapter 10</i>
// //   <i>Trọc phồng tôm - <b>ONE - Murata Yuusuke</b></i>
// //   <i>Fantasy, Manga</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/tuyen-tap-hoan-hao-onee-loli-yuri-19206">
// //   <img src="//st.nettruyenmoi.com/data/comics/6/tuyen-tap-hoan-hao-onee-loli-yuri.jpg" alt="Tuyển tập Hoàn hảo: Onee-Loli Yuri">
// //   <h3>Tuyển tập Hoàn hảo: Onee-Loli Yuri</h3>
// //   <h4>
// //   <i>Chapter 22</i>
// //   <i>Parfait: Onee-Loli Yuri</i>
// //   <i>Comedy, One shot, School Life, Slice of Life, Soft Yuri, Yuri</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/one-room-wanko-26808">
// //   <img src="//st.nettruyenmoi.com/data/comics/184/one-room-wanko.jpg" alt="One-room Wanko">
// //   <h3>One-room Wanko</h3>
// //   <h4>
// //   <i>Chapter 2</i>
// //   <i>One Room Wanko, One-Room Wanco, One-Room Wanko, One Room Dog,ワンルームワンコ, Chú cún trong căn hộ one-room - <b>Shirokuma Shouta</b></i>
// //   <i>Comedy, Slice of Life</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/anh-hung-onepunch-fanmade-26314">
// //   <img src="//st.nettruyenmoi.com/data/comics/202/anh-hung-onepunch-fanmade.jpg" alt="Anh hùng OnePunch Fanmade">
// //   <h3>Anh hùng OnePunch Fanmade</h3>
// //   <h4>
// //   <i>Chapter 5</i>
// //   <i>Action, Adventure, Comic, Shounen</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/boku-wa-yurina-onee-chan-wo-ouenshite-imasu-22283">
// //   <img src="//st.nettruyenmoi.com/data/comics/11/boku-wa-yurina-onee-chan-wo-ouenshite-im-1831.png" alt="Boku wa, Yurina Onee-chan wo Ouenshite Imasu">
// //   <h3>Boku wa, Yurina Onee-chan wo Ouenshite Imasu</h3>
// //   <h4>
// //   <i>Chapter 2</i>
// //   <i>I'll Cheer On My Yuri Onee-chan, ぼくは、百合なおねえちゃんを応援しています - <b>Aoto Hibiki</b></i>
// //   <i>Comedy, Manga, Romance, School Life, Shoujo Ai</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/saigo-ni-hitotsu-dake-onegaishite-mo-yoroshii-desu-ka-23510">
// //   <img src="//st.nettruyenmoi.com/data/comics/214/saigo-ni-hitotsu-dake-onegaishite-mo-yor-8089.jpg" alt="Saigo ni Hitotsu Dake Onegaishite mo Yoroshii Desu ka?">
// //   <h3>Saigo ni Hitotsu Dake Onegaishite mo Yoroshii Desu ka?</h3>
// //   <h4>
// //   <i>Chapter 1</i>
// //   <i>May I Please Ask You Just One Last Thing? - <b>HOONOKI Sora - Nana Otori</b></i>
// //   <i>Comedy, Drama, Martial Arts, Romance</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/shinya-ni-ikenai-koto-o-shi-ni-kuru-onee-san-22064">
// //   <img src="//st.nettruyenmoi.com/data/comics/48/shinya-ni-ikenai-koto-o-shi-ni-kuru-onee-2530.jpg" alt="Shin'ya ni Ikenai Koto o Shi ni Kuru Onee-san">
// //   <h3>Shin'ya ni Ikenai Koto o Shi ni Kuru Onee-san</h3>
// //   <h4>
// //   <i>Chapter 1</i>
// //   <i>Onee-san comes over to my place late at night to do naughty stuff - <b>Naomichi Io</b></i>
// //   <i>Comedy, Manga, One shot, Shounen, Slice of Life</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/cuu-vi-ho-ly-oneshot-10452">
// //   <img src="//st.nettruyenmoi.com/data/comics/212/boruto-oneshot-manga.jpg" alt="Cửu Vĩ Hồ Ly Oneshot" style="width: 100; height: 100; background-color: red">
// //   <h3>Cửu Vĩ Hồ Ly Oneshot</h3>
// //   <h4>
// //   <i>Chapter 1</i>
// //   <i>Boruto Oneshot Manga - <b>Kishimoto Masashi</b></i>
// //   <i>Action, Drama, Fantasy, Martial Arts, Shounen, Supernatural</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/con-nha-giau-oneshot-2418">
// //   <img src="//st.nettruyenmoi.com/data/comics/114/hana-yori-dango-oneshot.jpg" alt="Con Nhà Giàu - Oneshot">
// //   <h3>Con Nhà Giàu - Oneshot</h3>
// //   <h4>
// //   <i>Chapter 1</i>
// //   <i>Hana Yori Dango - Oneshot - <b>KAMIO Youko</b></i>
// //   <i>Manga, One shot, Romance, School Life</i>
// //   </h4>
// //   </a>
// //   </li>
// //   <li>
// //   <a href="http://www.nettruyenmoi.com/truyen-tranh/bat-dau-noi-luc-tu-day-oneshot-1938">
// //   <img src="//st.nettruyenmoi.com/data/comics/146/bat-dau-noi-luc-tu-day-oneshot.jpg" alt="Bắt đầu nổi lực từ đây - Oneshot">
// //   <h3>Bắt đầu nổi lực từ đây - Oneshot</h3>
// //   <h4>
// //   <i>Chapter 1</i>
// //   <i>Cross Manage - Oneshot</i>
// //   <i>Manga, One shot</i>
// //   </h4>
// //   </a>
// //   </li>
// //   </ul>`
// // };

// // var { height, width } = Dimensions.get("window");
// // var neededWidth = width,
// //   neededHeight = height;

// // // var zoom = Math.min(height / neededHeight, width / neededWidth)
// // var zoom = 0.5;

// // export function MainTestScreen() {
// //   // console.log(i18n.currentLocale())

// //   // React.useEffect(() => {
// //   //   Platform.OS !== 'web' &&
// //   //     (async () => {
// //   //       await setTestDeviceIDAsync('EMULATOR')

// //   //       await AdMobInterstitial.setAdUnitID(
// //   //         'ca-app-pub-3940256099942544/1033173712'
// //   //       )
// //   //       await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
// //   //       await AdMobInterstitial.showAdAsync()
// //   //     })()
// //   // })

// //   const scrollViewRef = React.useRef<ScrollView>();
// //   const animatedZoom = React.useRef(new Animated.Value(1));

// //   React.useEffect(() => {
// //     setTimeout(() => {
// //       Animated.timing(animatedZoom.current, {
// //         toValue: zoom,
// //         useNativeDriver: false
// //       }).start();
// //     }, 5000);
// //   }, []);

// //   const _pan = PanResponder.create({
// //     onPanResponderMove: (e, { dy }) => {
// //       const { height: windowHeight } = Dimensions.get(`window`);
// //       // return this.props.onZoomProgress(
// //       //   Math.min(Math.max(dy * -1 / windowHeight, 0), 0.5),
// //       // )
// //       console.log("1");
// //       animatedZoom.current.setValue(2);
// //     },
// //     onMoveShouldSetPanResponder: (ev, { dx }) => {
// //       console.log("2");

// //       return dx !== 0;
// //     },
// //     onPanResponderGrant: () => {
// //       animatedZoom.current.setValue(1);
// //       console.log("3");

// //       // return this.props.onZoomStart()
// //     },
// //     onPanResponderRelease: () => {
// //       animatedZoom.current.setValue(1);
// //       console.log("4");

// //       // return this.props.onZoomEnd()
// //     }
// //   });
// //   // const result = useAppSelector((state) =>
// //   //   selectAlleNewChapterNotification(state)
// //   // );
// //   // const { data, isSuccess } = useApiOriginRecently("1");

// //   // React.useEffect(() => {
// //   //   const root = HTMLParser.parse(data);
// //   //   console.log(data);
// //   //   console.log(root.querySelector(".row > .item"));
// //   // }, [data]);

// //   // React.useEffect(() => {
// //   //   console.log(isSuccess);
// //   // }, [isSuccess]);

// //   // const [str, setStr] = React.useState("");

// //   // React.useEffect(() => {
// //   //   mmkvStorage
// //   //     .getItem("notifications-template")
// //   //     .then((s: string) => (s ? setStr(s) : null));
// //   //   // fetchBackgroundTask()
// //   // }, []);

// //   const { data, isError, isSuccess, error } = useApiOriginComicDetail("");
// //   React.useEffect(() => {
// //     console.log(isSuccess, data, isError, error);
// //   }, [isSuccess]);

// //   return (
// //     <ScrollView>
// //       {/* <Text>Result: {result && result[0]?.notification.chapterName}</Text>
// //       <Text> {result && result[0]?.notification.chapterPath}</Text>
// //       <Text> {result && result[0]?.notification.count}</Text>
// //       <Text> {result && result[0]?.notification.createdAt}</Text>
// //       <Text> {result && result[0]?.notification.createdAt}</Text>
// //       <Text> {result && result[0]?.notification.updatedAt}</Text> */}
// //       {/* <Text> Async storage{str}</Text> */}
// //       {/* <Text>
// //         Notification :
// //         {result &&
// //           JSON.stringify(
// //             result?.map((item) => {
// //               return item.notification
// //             })
// //           )}
// //       </Text> */}
// //       {/* <Text>Data: {data && JSON.stringify(data)}</Text> */}
// //       {/* <RenderHtml
// //         source={{
// //           baseUrl: 'http://www.nettruyenmoi.com',
// //           method: 'get',
// //           uri: '/'
// //         }}
// //         contentWidth={width}
// //       /> */}
// //       {/* {Platform.OS !== 'web' && (
// //         <AdMobBanner
// //           // style={{ height: 100, backgroundColor: 'gray' }}
// //           bannerSize="smartBannerLandscape"
// //           adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
// //           servePersonalizedAds // true or false
// //           // onDidFailToReceiveAdWithError={(e) =>
// //           //   __DEV__ &&
// //           //   Alert.alert('ca-app-pub-1646154512233519/3404814383', e, [
// //           //     { text: 'OK', onPress: (e) => console.log(e) }
// //           //   ])
// //           // }
// //         />
// //       )} */}

// //       {/* <Animated.ScrollView
// //         style={{ flex: 1, transform: [{ scale: animatedZoom.current }] }}
// //         // @ts-ignore
// //         ref={(ref) => (scrollViewRef.current = ref)}
// //         maximumZoomScale={4}
// //         minimumZoomScale={0.5}
// //         // contentContainerStyle={{ width: this.mapSize, height: this.mapSize }}
// //         centerContent
// //         showsHorizontalScrollIndicator={true}
// //         showsVerticalScrollIndicator={true}
// //       >
// //         <Animated.View
// //           {..._pan}
// //           style={{ width: 500, height: 1000, backgroundColor: 'red' }}
// //         >
// //           <Text>Hello</Text>
// //         </Animated.View>
// //       </Animated.ScrollView> */}

// //       {/* <RenderHtml contentWidth={width} source={source} /> */}
// //       <Text>{data}</Text>
// //       <DynamicColumnGrid />
// //       <DayAndNight type="day-to-night" />
// //     </ScrollView>
// //   );
// // }

// /***
//  Use this component inside your React Native Application.
//  A scrollable list with different item type
//  */
// import React, { Component } from "react";
// import { View, Text, Dimensions } from "react-native";
// // import {
// //   RecyclerListView,
// //   DataProvider,
// //   LayoutProvider
// // } from "recyclerlistview";
// import { comicItemSample } from "app/utils/sampleData";
// import { ComicItem } from "../../components/Comics/ComicGridGap3/ComicItem";
// import { ComicListItem } from "app/components/Comics/ComicVerticalList/ComicListItem";

// const ViewTypes = {
//   FULL: 0,
//   HALF_LEFT: 1,
//   HALF_RIGHT: 2
// };

// let containerCount = 0;

// class CellContainer extends React.Component {
//   constructor(args) {
//     super(args);
//     this._containerId = containerCount++;
//   }
//   render() {
//     return (
//       <View {...this.props}>
//         {this.props.children}
//         <Text>Cell Id: {this._containerId}</Text>
//       </View>
//     );
//   }
// }

// /***
//  * To test out just copy this component and render in you root component
//  */
// export class MainTestScreen extends React.Component {
//   // constructor(args) {
//   //   super(args);

//   //   let { width } = Dimensions.get("window");

//   //   //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
//   //   //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
//   //   let dataProvider = new DataProvider((r1, r2) => {
//   //     return r1 !== r2;
//   //   });

//   //   //Create the layout provider
//   //   //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
//   //   //Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
//   //   //If you need data based check you can access your data provider here
//   //   //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
//   //   //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
//   //   this._layoutProvider = new LayoutProvider(
//   //     (index) => {
//   //       return ViewTypes.FULL;
//   //       // if (index % 3 === 0) {
//   //       //   return ViewTypes.FULL;
//   //       // } else if (index % 3 === 1) {
//   //       //   return ViewTypes.HALF_LEFT;
//   //       // } else {
//   //       //   return ViewTypes.HALF_RIGHT;
//   //       // }
//   //     },
//   //     (type, dim) => {
//   //       switch (type) {
//   //         case ViewTypes.HALF_LEFT:
//   //           dim.width = width / 2;
//   //           dim.height = 160;
//   //           break;
//   //         case ViewTypes.HALF_RIGHT:
//   //           dim.width = width / 2;
//   //           dim.height = 160;
//   //           break;
//   //         case ViewTypes.FULL:
//   //           dim.width = width;
//   //           dim.height = 140;
//   //           break;
//   //         default:
//   //           dim.width = 0;
//   //           dim.height = 0;
//   //       }
//   //     }
//   //   );

//   //   this._rowRenderer = this._rowRenderer.bind(this);

//   //   //Since component should always render once data has changed, make data provider part of the state
//   //   this.state = {
//   //     // dataProvider: dataProvider.cloneWithRows(this._generateArray(300))
//   //     dataProvider: dataProvider.cloneWithRows(comicItemSample.data)
//   //   };
//   // }

//   // _generateArray(n) {
//   //   let arr = new Array(n);
//   //   for (let i = 0; i < n; i++) {
//   //     arr[i] = i;
//   //   }
//   //   return arr;
//   // }

//   // //Given type and data return the view component
//   // _rowRenderer(type, data) {
//   //   //You can return any view here, CellContainer has no special significance
//   //   switch (type) {
//   //     case ViewTypes.HALF_LEFT:
//   //       return (
//   //         <CellContainer style={styles.containerGridLeft}>
//   //           {/* <Text>Data: {data}</Text> */}
//   //         </CellContainer>
//   //       );
//   //     case ViewTypes.HALF_RIGHT:
//   //       return (
//   //         <CellContainer style={styles.containerGridRight}>
//   //           {/* <Text>Data: {data}</Text> */}
//   //         </CellContainer>
//   //       );
//   //     case ViewTypes.FULL:
//   //       return (
//   //         // <CellContainer style={styles.container}>
//   //         // {/* <Text>Data: {data}</Text> */}
//   //         <ComicListItem item={data} id={data.path} />
//   //         // </CellContainer>
//   //       );
//   //     default:
//   //       return null;
//   //   }
//   // }

//   // render() {
//   //   return (
//   //     <RecyclerListView
//   //       layoutProvider={this._layoutProvider}
//   //       dataProvider={this.state.dataProvider}
//   //       rowRenderer={this._rowRenderer}
//   //     />
//   //   );
//   // }
//   render(): React.ReactNode {
//     return <View></View>;
//   }
// }
// const styles = {
//   container: {
//     justifyContent: "space-around",
//     alignItems: "center",
//     flex: 1,
//     backgroundColor: "#00a1f1"
//   },
//   containerGridLeft: {
//     justifyContent: "space-around",
//     alignItems: "center",
//     flex: 1,
//     backgroundColor: "#ffbb00"
//   },
//   containerGridRight: {
//     justifyContent: "space-around",
//     alignItems: "center",
//     flex: 1,
//     backgroundColor: "#7cbb00"
//   }
// };

/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import { Image } from "native-base";
import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
import { ScaledImage } from "../../components/ScaledImage";

const response = {
  data: {
    title: "Võ Luyện Đỉnh Phong",
    chapterName: "Chapter 1735",
    updatedAt: "2021-12-02T00:00:00.000Z",
    updatedDistance: "20:51 02/12/2021",
    images: [
      "http://i226.ntcdntempv26.com/data/images/17696/796832/001.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/002.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/003.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/004.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/005.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/006.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/007.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/008.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/009.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/010.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/011.jpg?data=net",
      "http://i226.ntcdntempv26.com/data/images/17696/796832/012.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/001.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/002.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/003.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/004.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/005.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/006.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/007.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/008.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/009.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/010.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/011.jpg?data=net",
      "http://i332.ntcdntempv26.com/data/images/25132/733509/012.jpg?data=net"
    ],
    chapterList: [],
    path: "/truyen-tranh/vo-luyen-dinh-phong/chap-1735/796832"
  }
};

export function MainTestScreen() {
  let { width } = Dimensions.get("window");

  let dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  const layoutProvider = new LayoutProvider(
    (item) => item,
    (type, dim) => {
      dim.width = width;
      dim.height = 0;
    }
  );

  const [imgs, setImgs] = React.useState(() =>
    dataProvider.cloneWithRows(response.data.images)
  );

  const rowRenderer = (type, data) => {
    return (
      // <ScaledImage
      //   source={{ uri: data }}
      //   h={100}
      //   w={width}
      //   setImgs={() => null}
      // />
      // <View style={{ width: width, height: 100, backgroundColor: "green" }}>
      <Image
        source={{
          uri: data,
          headers: {
            referer: "https://www.nettruyenpro.com"
          }
        }}
        w={"100%"}
        height={"500"}
        style={{}}
        alt={"Img"}
        resizeMode={"cover"}
      />
      // </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ccc" }}>
      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={imgs}
        rowRenderer={rowRenderer}
        // forceNonDeterministicRendering={true}
        canChangeSize={true}
      />
    </View>
  );
}
