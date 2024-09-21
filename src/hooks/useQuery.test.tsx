import { render, screen } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import useQuery from "./useQuery"; // Adjust the import path as necessary

// Mock useLocation from react-router-dom
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

// A test component that uses the custom hook
const TestComponent = () => {
  const query = useQuery();
  return (
    <div>
      <span data-testid="name">{query.get("name")}</span>
      <span data-testid="age">{query.get("age")}</span>
      <span data-testid="id">{query.getAll("id").join(",")}</span>
    </div>
  );
};

describe("useQuery", () => {
  it("should return an empty URLSearchParams object when no query string is present", () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: "",
    });

    render(<TestComponent />);

    expect(screen.getByTestId("name").textContent).toBe("");
    expect(screen.getByTestId("age").textContent).toBe("");
    expect(screen.getByTestId("id").textContent).toBe("");
  });

  it("should return the correct URLSearchParams object for a given query string", () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: "?name=JohnDoe&age=30",
    });

    render(<TestComponent />);

    expect(screen.getByTestId("name").textContent).toBe("JohnDoe");
    expect(screen.getByTestId("age").textContent).toBe("30");
  });

  it("should handle multiple values for the same query parameter", () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: "?id=1&id=2&id=3",
    });

    render(<TestComponent />);

    expect(screen.getByTestId("id").textContent).toBe("1,2,3");
  });

  it("should return null for non-existing query parameters", () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: "?name=JohnDoe&age=30",
    });

    render(<TestComponent />);

    expect(screen.getByTestId("name").textContent).toBe("JohnDoe");
    expect(screen.getByTestId("age").textContent).toBe("30");
    expect(screen.getByTestId("id").textContent).toBe("");
  });
});
