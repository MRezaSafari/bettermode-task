import { useMutation } from "@apollo/client";
import { IRemoveReactionVariables } from "@bettermode/models";
import { render, screen } from "@testing-library/react";
import React from "react";
import useRemoveReaction from "./remove-reaction";

// Mock useMutation from @apollo/client
jest.mock("@apollo/client", () => ({
  useMutation: jest.fn(),
}));

// A test component that uses the custom hook
const TestComponent = () => {
  const { removeReaction, loading, error } = useRemoveReaction();

  React.useEffect(() => {
    const variables: IRemoveReactionVariables = {
      postId: "43224",
      reaction: "upvote",
    };

    if (removeReaction) {
      removeReaction({ variables });
    }
  }, [removeReaction]);

  return (
    <div>
      <span data-testid="loading">{loading ? "Loading" : "Not Loading"}</span>
      <span data-testid="error">{error ? error.message : "No Error"}</span>
    </div>
  );
};

describe("useRemoveReaction", () => {
  const mockRemoveReaction = jest.fn();
  const mockLoading = false;
  const mockError = undefined;

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue([
      mockRemoveReaction, // removeReaction function mock
      { loading: mockLoading, error: mockError }, // Return values for loading and error
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it("should return the removeReaction function, loading, and error state", () => {
    render(<TestComponent />);

    expect(screen.getByTestId("loading").textContent).toBe("Not Loading");
    expect(screen.getByTestId("error").textContent).toBe("No Error");
  });

  it("should call removeReaction with correct variables", () => {
    render(<TestComponent />);

    const variables: IRemoveReactionVariables = {
      postId: "43224",
      reaction: "upvote",
    };

    expect(mockRemoveReaction).toHaveBeenCalledWith({ variables });
  });

  it("should return loading as true when the mutation is in progress", () => {
    (useMutation as jest.Mock).mockReturnValue([
      mockRemoveReaction,
      { loading: true, error: mockError },
    ]);

    render(<TestComponent />);

    expect(screen.getByTestId("loading").textContent).toBe("Loading");
  });

  it("should return an error if the mutation fails", () => {
    const mockErrorObject = new Error("Something went wrong");
    (useMutation as jest.Mock).mockReturnValue([
      mockRemoveReaction,
      { loading: mockLoading, error: mockErrorObject },
    ]);

    render(<TestComponent />);

    expect(screen.getByTestId("error").textContent).toBe(
      mockErrorObject.message
    );
  });
});
