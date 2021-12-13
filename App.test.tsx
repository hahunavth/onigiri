import React from "react";
import renderer from "react-test-renderer";

import App from "./App";
import Categories from "@/components/Common/CategoryBtn";
("./src/components/Common/Categories.tsx");

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer
      .create(<Categories iconName="" name="" onPress={() => null} />)
      .toJSON();
    // @ts-ignore
    expect(tree.children.length).toBe(1);
  });
});
