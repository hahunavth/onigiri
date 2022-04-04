import React from "react";
import { InteractionManager } from "react-native";

type Param = {
  dependencyList?: any[];
  callback?: (dependencyList?: any[]) => any;
  cleanupCallback?: (result?: any, dependencyList?: any[]) => any;
};

export default function useInteraction(param?: Param) {
  const [loading, setLoading] = React.useState(true);
  let result: any = null;
  React.useEffect(() => {
    // NOTE: DEPRECATED4
    const interaction = InteractionManager.runAfterInteractions(() => {
      param && param.callback && param.callback(param?.dependencyList);
      setLoading(false);
    });
    return () => {
      param &&
        param.cleanupCallback &&
        param.cleanupCallback(result, param?.dependencyList);
      interaction.cancel();
    };

    // NOTE: Use setImmediate instead of interaction
    // const immediate = setImmediate(() => {
    //   param && param.callback && param.callback(param?.dependencyList)
    //   setLoading(false)
    // })

    // return () => {
    //   param &&
    //     param.cleanupCallback &&
    //     param.cleanupCallback(result, param?.dependencyList)
    //  // interaction.cancel()
    // clearImmediate(immediate)
    // }
  }, param?.dependencyList || []);

  return {
    loading,
    setLoading,
    result
  };
}
