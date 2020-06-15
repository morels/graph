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

  it("should return the subset of data when the series does not contain start_date", () => {
    const input = {
      end_date: "2015-11-13T09:39:16.580000Z",
    };
    const expectedOutput = [
      {
        y: 282,
        x: "2015-08-19T14:00:19.352000Z",
      },
      {
        y: 227,
        x: "2015-10-08T14:45:31.991000Z",
      },
      {
        y: 185,
        x: "2015-10-12T07:27:47.493000Z",
      },
      {
        y: 162,
        x: "2015-11-13T09:32:26.980000Z",
      },
      {
        y: 171,
        x: "2015-11-13T09:39:16.580000Z",
      },
    ];

    expect(search(input.start_date, input.end_date)).toEqual(expectedOutput);
  });

  it("should return the subset of data when the series does not contain end_date", () => {
    const input = {
      start_date: "2019-11-12T13:52:42.502002Z",
    };
    const expectedOutput = [
      {
        y: 308,
        x: "2019-11-12T13:52:42.502002Z",
      },
      {
        y: 308,
        x: "2019-11-18T10:51:01.240772Z",
      },
      {
        y: 308,
        x: "2019-11-19T17:14:34.796982Z",
      },
    ];

    expect(search(input.start_date, input.end_date)).toEqual(expectedOutput);
  });
});
