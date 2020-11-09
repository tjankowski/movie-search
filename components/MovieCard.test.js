import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  it("should render without item", () => {
    expect(() => renderer.create(<MovieCard />)).toThrow();
  });

  it("should render item", () => {
    const item = {
      Poster: "/image.png",
      Title: "2020",
      Year: 2020,
      Type: "movie",
    };
    const component = renderer.create(<MovieCard item={item} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
