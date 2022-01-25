import React, { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import {
  Button,
  IndexPath,
  Layout,
  Select,
  SelectItem,
} from "@ui-kitten/components";

type MemoBtnProps = Pick<BtnRadioProps, "onChange"> & {
  value: string | number;
  isActivated: boolean;
  id: number;
};

const MemoBtn = React.memo(
  ({ isActivated, onChange, value, id }: MemoBtnProps) => {
    return (
      <Button
        style={{ padding: 0, margin: 3 }}
        appearance={isActivated ? "filled" : "outline"}
        status={isActivated ? "primary" : "basic"}
        onPress={() => (isActivated ? onChange(-1) : onChange(id))}
      >
        {value}
      </Button>
    );
  }
);

type MemoMultiBtnProps = Pick<BtnRadioProps, "onChange"> & {
  value: string | number;
  isActivated: boolean;
  id: number;
};

const MemoBtnMulti = React.memo(
  ({ isActivated, onChange, value, id }: MemoMultiBtnProps) => {
    // console.log("render" + id);
    return (
      <Button
        style={{ padding: 0, margin: 3 }}
        appearance={isActivated ? "filled" : "outline"}
        status={isActivated ? "primary" : "basic"}
        onPress={() =>
          onChange((state: boolean[]) => {
            if (typeof state === "object") {
              const newState = [...state];
              newState[id] = !newState[id];
              return newState;
            }
            return state;
          })
        }
      >
        {value}
      </Button>
    );
  }
);

interface BtnRadioProps {
  list: number[] | string[];
  onChange: (value: any) => any;
  selectedId: number | boolean[];
  isMultiSelect?: boolean;
}

export const BtnRadio1 = ({
  list,
  selectedId: selected,
  isMultiSelect,
  onChange,
}: BtnRadioProps) => {
  return (
    <Layout
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      {isMultiSelect
        ? list.map((num, id) => (
            <MemoBtnMulti
              key={id}
              value={num}
              isActivated={
                typeof selected === "object" &&
                typeof selected[id] === "boolean" &&
                selected[id] === true
              }
              id={id}
              onChange={onChange}
            />
          ))
        : list.map((num, id) => (
            <MemoBtn
              key={id}
              value={num}
              isActivated={selected === id}
              onChange={onChange}
              id={id}
            />
          ))}
    </Layout>
  );
};

export const BtnRadio = React.memo(BtnRadio1);
