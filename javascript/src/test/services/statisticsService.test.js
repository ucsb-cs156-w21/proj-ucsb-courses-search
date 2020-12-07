import { fetchFullCourses } from "main/services/statisticsService";

import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

describe("courseCount tests",  () => {
  test("fetchFullCourses", async () => {

    const sampleReturnValue = {
        "sampleKey": "sampleValue"
    };

    fetch.mockResolvedValue({
        status: 200,
        json: () => {
          return sampleReturnValue;
        },
      });

    const expectedFields = {
        startQuarter: "20201",
        endQuarter: "20204",
        department: "MATH "
    };

    const result = await fetchFullCourses(expectedFields);
    expect(result).toBe(sampleReturnValue);

  });
});
