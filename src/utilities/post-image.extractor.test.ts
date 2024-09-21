import { describe, expect } from "@jest/globals";

import extractPostImageUrl from "./post-image-extractor";

describe("extractPostImageUrl", () => {
  it("should return undefined when input is undefined", () => {
    expect(extractPostImageUrl(undefined)).toBeUndefined();
  });

  it("should return undefined when input is an empty string", () => {
    expect(extractPostImageUrl("")).toBeUndefined();
  });

  it("should return correct URL with different image IDs", () => {
    const jsonWithDifferentId = JSON.stringify({
      id: "67890",
      relation: "image",
    });
    const expectedUrl =
      "https://tribe-s3-production.imgix.net/67890?fit=max&w=200&auto=compress,format";
    expect(extractPostImageUrl(jsonWithDifferentId)).toBe(expectedUrl);
  });
});
