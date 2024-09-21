import { useMutation } from "@apollo/client";
import { IAddReactionVariables } from "@bettermode/models";
import { render, screen } from "@testing-library/react";
import React from "react";
import useAddReaction from "./add-reaction";

// Mock useMutation from @apollo/client
jest.mock("@apollo/client", () => ({
  useMutation: jest.fn(),
}));

// A test component that uses the custom hook
const TestComponent = () => {
  const { addReaction, loading, error } = useAddReaction();

  React.useEffect(() => {
    const variables: IAddReactionVariables = {
      postId: "43224",
      input: {
        overrideSingleChoiceReactions: true,
        reaction: "upvote",
      },
    };

    if (addReaction) {
      addReaction({ variables });
    }
  }, [addReaction]);

  return (
    <div>
      <span data-testid="loading">{loading ? "Loading" : "Not Loading"}</span>
      <span data-testid="error">{error ? error.message : "No Error"}</span>
    </div>
  );
};

describe("useAddReaction", () => {
  const mockAddReaction = jest.fn();
  const mockLoading = false;
  const mockError = undefined;

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue([
      mockAddReaction, // addReaction function mock
      { loading: mockLoading, error: mockError }, // Return values for loading and error
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it("should return the addReaction function, loading, and error state", () => {
    render(<TestComponent />);

    expect(screen.getByTestId("loading").textContent).toBe("Not Loading");
    expect(screen.getByTestId("error").textContent).toBe("No Error");
  });

  it("should call addReaction with correct variables", () => {
    render(<TestComponent />);

    const variables: IAddReactionVariables = {
      postId: "43224",
      input: {
        overrideSingleChoiceReactions: true,
        reaction: "upvote",
      },
    };

    expect(mockAddReaction).toHaveBeenCalledWith({ variables });
  });

  it("should return loading as true when the mutation is in progress", () => {
    (useMutation as jest.Mock).mockReturnValue([
      mockAddReaction,
      { loading: true, error: mockError },
    ]);

    render(<TestComponent />);

    expect(screen.getByTestId("loading").textContent).toBe("Loading");
  });

  it("should return an error if the mutation fails", () => {
    const mockErrorObject = new Error("Something went wrong");
    (useMutation as jest.Mock).mockReturnValue([
      mockAddReaction,
      { loading: mockLoading, error: mockErrorObject },
    ]);

    render(<TestComponent />);

    expect(screen.getByTestId("error").textContent).toBe(
      mockErrorObject.message
    );
  });
});
