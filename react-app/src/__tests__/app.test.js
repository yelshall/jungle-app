import React from "react";
import renderer from "react-test-renderer";

import HostAbout from "../screens/Host/Misc/HostAbout";

describe("<HostAbout />", () => {
  it("has 4 components", () => {
    const tree = renderer.create(<HostAbout />).toJSON();
    expect(tree.children.length).toBe(4);
  });
});
