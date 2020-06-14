import { search } from "./search";
import { describe, expect, it } from "@jest/globals";

describe("Testing the search function", () => {
  it("should return the subset of data included between the two for the slug 'aggregation-overall' and for the key 'score'", () => {
    const input = {
      start_date: "2015-08-19T14:00:19.352000Z",
      end_date: "2015-10-12T07:27:47.493000Z",
    };
    const expectedOutput = [
      { y: 282, x: "2015-08-19T14:00:19.352000Z" },
      { y: 227, x: "2015-10-08T14:45:31.991000Z" },
      { y: 185, x: "2015-10-12T07:27:47.493000Z" },
    ];

    expect(search(input.start_date, input.end_date)).toEqual(expectedOutput);
  });
});
