import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  it("should render", () => {
    const component = renderer.create(<SearchForm />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with query", () => {
    const component = renderer.create(<SearchForm query={"test"} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with query and onChange", () => {
    const onChange = jest.fn();
    const component = renderer.create(
      <SearchForm query={"test"} onChange={onChange} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it("should call onChange on value change", () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchForm query={"test"} onChange={onChange} />
    );
    expect(onChange).toHaveBeenCalledTimes(0);
    const input = getByPlaceholderText(/Type movie title here/i);
    fireEvent.change(input, { target: { value: "query" } });
    expect(onChange).toHaveBeenCalledWith("query");
  });

  it("should call onChange on button click", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <SearchForm query={"test"} onChange={onChange} />
    );
    expect(onChange).toHaveBeenCalledTimes(0);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onChange).toHaveBeenCalledWith("test");
  });
});
