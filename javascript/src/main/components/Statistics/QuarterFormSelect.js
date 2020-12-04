import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
// hard coded depts from mongodb
// can be dynamically fetched!

const quarters = [
    "WINTER",
    "SPRING",
    "SUMMER",
    "FALL"
];

const range = [...Array(13).keys()].map((key) => key + 2009);

const QuarterFormSelect = ({ handleSelect, initialQuarter = null, initialYear = null, testId}) => {

    const [quarter, setQuarter] = useState(initialQuarter);
    const [year, setYear] = useState(initialYear);

    const toQueryParam = (quarter, year) => {
        return year.toString() + (parseInt(quarter)).toString();
    }

    const handleQuarter = (event) => {
        setQuarter(event.target.value);
        if (year) handleSelect(toQueryParam(event.target.value, year));
    };

    const handleYear = (event) => {
        setYear(event.target.value);
        if (quarter) handleSelect(toQueryParam(quarter, event.target.value));
    };

    return (
        <Form.Row>
            <Col>
            <Form.Control as="select" onChange={handleQuarter} value={quarter} data-testid={testId + "-quarter"}>
                {
                    Object.keys(quarters).map((key) => {
                        return (<option key={key} value={parseInt(key) + 1}>{quarters[key]}</option>);
                    })
                }
            </Form.Control>
            </Col>
            <Col>
            <Form.Control as="select" onChange={handleYear} value={year} data-testid={testId + "-year"}>
                {
                    range.map((year, index) => {
                        return (<option key={index} value={year}>{year}</option>)
                    })
                }
            </Form.Control>
            </Col>
        </Form.Row>
    );
};

export default QuarterFormSelect;
