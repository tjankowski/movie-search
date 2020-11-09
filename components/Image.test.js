import React from "react";
import renderer from "react-test-renderer";
import Image from "./Image";

describe("Image", () => {
  it("should render placeholder", () => {
    const component = renderer.create(<Image />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render image", () => {
    const component = renderer.create(<Image src="/empty.gif" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render image with class", () => {
    const component = renderer.create(
      <Image src="/empty.gif" className="class" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
