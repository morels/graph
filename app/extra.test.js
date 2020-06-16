import { getExtra } from "./search";
import { describe, expect, it } from "@jest/globals";
import DecoratedSeries from "./DecoratedSeries";

describe("Testing getExtra function", () => {
  it("should return extra data for selected 'x'", () => {
    const inputSeries = new DecoratedSeries(
      [
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
      ],
      1083
    );
    const inputIndex = 0;

    const expectedOutput = {
      quiz_session_type: "Test",
      priority: 0,
      score_delta: 0,
      quiz_session: 830282,
      quiz_config: 35004,
      quiz_config_title: "Azure Backup",
    };

    expect(getExtra(inputSeries, inputIndex)).toEqual(expectedOutput);
  });
});
