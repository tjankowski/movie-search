import React from "react";
import renderer from "react-test-renderer";
import MovieSkeleton from "./MovieSkeleton";

describe("MovieSkeleton", () => {
  it("should render", () => {
    const component = renderer.create(<MovieSkeleton />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
