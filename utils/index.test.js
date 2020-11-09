import { union, updateUrlQuery } from "./index";

describe("union", () => {
  it("should return empty string given 0 arguments", () => {
    expect(union()).toEqual("");
  });

  it("should return same argument given 1 argument", () => {
    expect(union("test")).toEqual("test");
  });

  it("should return join multiple arguments using space", () => {
    const args = ["testA", "testB"];
    expect(union(args[0], args[1])).toEqual(args.join(" "));
  });
});

describe("updateUrlQuery", () => {
  it("should add query parameter to url with value", () => {
    //given
    window.history.pushState = jest.fn();
    window.location.href = "http://localhost";
    document.title = "Movie search";

    //when
    updateUrlQuery("test");

    //expect
    const expected = "http://localhost/?query=test";
    expect(window.history.pushState).toHaveBeenCalledWith(
      { path: expected },
      "Movie search",
      expected
    );
  });
});
