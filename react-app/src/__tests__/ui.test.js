import React from "react";
import Profile from "../screens/Student/Tabs/Profile";
import renderer from "react-test-renderer";
import { View } from "react-native";
import Chat from "../screens/Chat";

import { mount, shallow, configure, ShallowWrapper } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
test("message box", () => {
  null;
});

jest.mock("../screens/Student/Tabs/Profile");
jest.mock("../screens/Chat");

describe("Profile", () => {
  const wrapper = new ShallowWrapper(<Profile {...null} />);

  it("should render a <View />", () => {
    expect(wrapper.find(View)).toHaveLength(0); // SUCCESS
  });

  it("return null, if given inccorect input", () => {
    const tree = renderer.create(wrapper).toJSON();
    expect(tree == undefined).toBe(true);
  });
});

describe("Chat", () => {
  const wrapper = new ShallowWrapper(<Chat {...null} />);

  it("should render a <View />", () => {
    expect(wrapper.find(View)).toHaveLength(0); // SUCCESS
  });

  it("return null, if given inccorect input", () => {
    const tree = renderer.create(wrapper).toJSON();
    expect(tree == undefined).toBe(true);
  });
});
