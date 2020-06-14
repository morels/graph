import search from "./search";
import { describe, expect, it } from "@jest/globals";

describe("Testing the search function", () => {
  it("should print 'hello world'", () => {
    expect(search()).toBe("hello world");
  });
});
