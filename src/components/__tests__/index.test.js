import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ParentLayout from "../parentLayout";
import { useRouter } from "next/router";

// Mocking the useRouter function
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ParentLayout Component", () => {
  let routerMock;

  beforeEach(() => {
    routerMock = { back: jest.fn() }
  });

  it("renders children correctly", () => {
    render(
      <ParentLayout>
        <div data-testid="child">Child Content</div>
      </ParentLayout>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders back button when backTitle is provided", () => {
    render(<ParentLayout backTitle="Go Back" />);
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("does not render back button when backTitle is empty", () => {
    render(<ParentLayout backTitle="" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
