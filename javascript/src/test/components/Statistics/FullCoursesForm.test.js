import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FullCoursesForm from "main/components/Statistics/FullCoursesForm";

describe("FullCoursesForm tests", () => {

    test("renders without crashing", () => {
        render(<FullCoursesForm />);
    });

    test("when I select a start quarter, the state for start quarter changes", () => {
        const { getByTestId } = render(<FullCoursesForm />);
        const selectQuarter = getByTestId("select-start-quarter")
        userEvent.selectOptions(selectQuarter, "3");
        expect(selectQuarter.value).toBe("3");
    });

    test("when I select a end quarter, the state for end quarter changes", () => {
        const { getByTestId } = render(<FullCoursesForm />);
        const selectQuarter = getByTestId("select-end-quarter")
        userEvent.selectOptions(selectQuarter, "3");
        expect(selectQuarter.value).toBe("3");
    });

    test("when I select a start quarter year, the state for start quarter year changes", () => {
        const { getByTestId } = render(<FullCoursesForm />);
        const selectQuarter = getByTestId("select-start-year")
        userEvent.selectOptions(selectQuarter, "2019");
        expect(selectQuarter.value).toBe("2019");
    });

    test("when I select a end quarter year, the state for end quarter year changes", () => {
        const { getByTestId } = render(<FullCoursesForm />);
        const selectQuarter = getByTestId("select-end-year")
        userEvent.selectOptions(selectQuarter, "2019");
        expect(selectQuarter.value).toBe("2019");
    });

    test("when I select a department, the state for department changes", () => {
        const { getByTestId } = render(<FullCoursesForm />);
        const selectDepartment = getByTestId("select-department")
        userEvent.selectOptions(selectDepartment, "CMPSC");
        expect(selectDepartment.value).toBe("CMPSC");
    });

    test("when I click submit, the right stuff happens", async () => {

        const sampleReturnValue = {
            "sampleKey": "sampleValue"
        };

        // Create spy functions (aka jest function, magic function)
        // The function doesn't have any implementation unless
        // we specify one.  But it does keep track of whether 
        // it was called, how many times it was called,
        // and what it was passed.

        const setCourseJSON = jest.fn();
        const fetchJSONSpy = jest.fn();

        fetchJSONSpy.mockResolvedValue(sampleReturnValue);

        const { getByText, getByTestId } = render(
            <FullCoursesForm setCourseJSON={setCourseJSON} fetchJSON={fetchJSONSpy} />
        );

        const expectedFields = {
            startQuarter: "20204",
            endQuarter: "20211",
            department: "CMPSC",
        };

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        // we need to be careful not to assert this expectation
        // until all of the async promises are resolved
        await waitFor(() => expect(setCourseJSON).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(fetchJSONSpy).toHaveBeenCalledTimes(1));

        // assert that ourSpy was called with the right value
        expect(setCourseJSON).toHaveBeenCalledWith(sampleReturnValue);
        expect(fetchJSONSpy).toHaveBeenCalledWith(expectedFields);

    });

});