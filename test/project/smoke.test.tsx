import { render, screen } from "@testing-library/react";

function Dummy() {
  return <h1>Hello CI</h1>;
}

test("renders without crashing", () => {
  render(<Dummy />);
  expect(screen.getByText("Hello CI")).toBeInTheDocument();
});
