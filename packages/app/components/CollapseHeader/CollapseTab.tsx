// Lib
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from "@react-navigation/material-top-tabs";

import { useThemedTopTabScreenOption } from "../Typo";

const Tab = createMaterialTopTabNavigator();

type CollapseTabProps = {
  renderTabBar: (props: MaterialTopTabBarProps) => React.ReactNode;
  renderFriends: () => JSX.Element;
  renderSuggestions: () => JSX.Element;
};

const CollapseTab = (props: CollapseTabProps) => {
  const { renderTabBar, renderFriends, renderSuggestions } = props;

  const screenOptions = useThemedTopTabScreenOption();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const emit = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(emit);
    };
  });

  // const screenOptions = useMemo<MaterialTopTabNavigationOptions>(
  //   () => ({
  //     tabBarLabelStyle: {},
  //     tabBarItemStyle: {
  //       margin: -5,
  //       justifyContent: 'center',
  //       alignItems: 'center'
  //     },
  //     tabBarPressOpacity: 0.1,
  //     tabBarIndicatorStyle: {
  //       backgroundColor: '#f0125cdf',
  //       flex: 1,
  //       height: 38,
  //       borderWidth: 5,
  //       borderRadius: 12,
  //       borderColor: 'transparent'

  //       // web
  //       // margin: 6,
  //       // // marginHorizontal: 20,
  //       // borderWidth: 0,
  //       // height: 25
  //       // 'box-sizing': 'border-box'
  //     },
  //     tabBarActiveTintColor: 'white',
  //     tabBarAllowFontScaling: false,
  //     tabBarInactiveTintColor: 'gray',
  //     tabBarPressColor: 'transparent',
  //     lazyPreloadDistance: 2
  //     // web
  //     // tabBarStyle: {
  //     //   // maxWidth: 500,
  //     //   paddingHorizontal: 'auto'
  //     // }
  //   }),
  //   []
  // )

  return (
    <>
      {loading ? null : (
        <Tab.Navigator
          tabBar={renderTabBar}
          // pageMargin={10}
          backBehavior="none"
          screenOptions={screenOptions}
        >
          <Tab.Screen name="Detail">{renderFriends}</Tab.Screen>
          <Tab.Screen
            name="Chapters"
            // component={renderSuggestions}
            // NOTE: Do not use component props like above
            //       It will rerender component when navigate
            //       Use children props will render once
          >
            {renderSuggestions}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </>
  );
};

export default CollapseTab;
// export default React.memo(CollapseTab)
