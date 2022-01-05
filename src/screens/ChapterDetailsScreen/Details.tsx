import QuicksandText from "@/components/Common/QuicksandText";
import {
  detailcomicDetailsProps,
  detailComicDetailsTopBarProps,
} from "@/navigators/Main/ComicDetailsTopTabNavigator";
import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
} from "@/utils/Download/GifManager";
import React, { useEffect } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useApiComicDetail } from "../../app/api";
import DetailsBar from "./DetailsBar";

interface DetailsProps {
  path: string;
}

const gifIds = ["YsTs5ltWtEhnq", "cZ7rmKfFYOvYI", "11BCDu2iUc8Nvhryl7"];

const Details: React.FunctionComponent<detailcomicDetailsProps> = (props) => {
  const { data, isSuccess } = useApiComicDetail(props?.route?.params?.path);

  useEffect(() => {
    (async () => {
      await addMultipleGifs(gifIds);
    })();
    return () => {
      deleteAllGifs();
    };
  }, []);

  const [selectedUri, setUri] = React.useState<string | null>(null);

  const handleSelect = async (id: string) => {
    try {
      const singleId = await getSingleGif(id);
      setUri(singleId);
      console.log(selectedUri);
    } catch (e) {
      console.error("Couldn't load gif", e);
    }
  };

  const unloadAll = () => {
    setUri(null);
    deleteAllGifs();
  };

  console.log(selectedUri);

  return (
    <View style={styles.container}>
      {/* <DetailsBar /> */}
      {/* <QuicksandText>{data?.detail}</QuicksandText> */}
      <View style={styles.container}>
        <Text style={styles.header}>See contents of gifManagement.ts</Text>
        <Text style={styles.paragraph}>Select one of the IDs</Text>

        {gifIds.map((item, index) => (
          <Button
            title={`Gif ${index + 1}`}
            key={item}
            onPress={() => handleSelect(item)}
          />
        ))}

        <Button title="Unload all" onPress={unloadAll} />

        <Text style={styles.paragraph}>
          Selected URI: {selectedUri || "none"}
        </Text>
        {selectedUri != null && (
          <Image style={{ height: 200 }} source={{ uri: selectedUri }} />
        )}
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    height: 1000,
  },
  header: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    textAlign: "center",
    marginBottom: 15,
  },
});
