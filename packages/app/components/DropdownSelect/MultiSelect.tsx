import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Dropdown, MultiSelect as MS } from "react-native-element-dropdown";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SelectOptionT } from "./types";

type Props = {
  data: SelectOptionT[];
  selected: SelectOptionT[];
  setSelected: (value: React.SetStateAction<SelectOptionT[]>) => void;
};

export const MultiSelect = React.memo(
  ({ data, selected, setSelected }: Props) => {
    const renderItem = React.useCallback((item: any) => {
      return (
        <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        </View>
      );
    }, []);

    const handleChange = (item: SelectOptionT[]) => {
      setSelected(item);
    };

    const leftIcon = () => (
      <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
    );

    return (
      <View style={styles.container}>
        <MS
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={selected}
          search
          searchPlaceholder="Search..."
          onChange={handleChange}
          renderLeftIcon={leftIcon}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
                <AntDesign color="black" name="delete" size={17} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 14
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16
  }
});
