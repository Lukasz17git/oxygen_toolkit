import { describe, expect, it } from "vitest";
import numberFormatter from "./numberFormatter";

describe("number formatter test", () => {

    it("should return empty string if it doesnt receive a string as input", () => {
        expect(numberFormatter(null)).toBe("");
        expect(numberFormatter({})).toBe("");
        expect(numberFormatter([])).toBe("");
        expect(numberFormatter(0)).toBe("");
        expect(numberFormatter(1)).toBe("");
        expect(numberFormatter(true)).toBe("");
        expect(numberFormatter(false)).toBe("");
        expect(numberFormatter(NaN)).toBe("");
        expect(numberFormatter(Infinity)).toBe("");
    })

    it("should only accept numbers and separators such as comma or dot, formatting it into dot", () => {
        expect(numberFormatter("")).toBe("");
        expect(numberFormatter("0,4,2")).toBe("0.42");
        expect(numberFormatter("1")).toBe("1");
        expect(numberFormatter("12345")).toBe("12345");
        expect(numberFormatter("test")).toBe("");
        expect(numberFormatter("test_01")).toBe("01");
        expect(numberFormatter("test0.1")).toBe("0.1");
        expect(numberFormatter("test0,1")).toBe("0.1");
        expect(numberFormatter("t1e1s1t0,12")).toBe("1110.12");
        expect(numberFormatter("t1e1s1t0,12345", 5)).toBe("1110.12345");
    })

    it("should add zero as integer if it doesnt have any integer before", () => {
        expect(numberFormatter(",1")).toBe("0.1");
        expect(numberFormatter(".1")).toBe("0.1");
        expect(numberFormatter("ssss.1")).toBe("0.1");
    })

    it("should only accept one separator (comma, dot, ...), the first one it finds", () => {
        expect(numberFormatter("12,1,2")).toBe("12.12");
        expect(numberFormatter("12,...1,2")).toBe("12.12");
        expect(numberFormatter("12,1,2,3,4.5")).toBe("12.12");
        expect(numberFormatter("12,1,2,3.4.5", 5)).toBe("12.12345");
    })
});
