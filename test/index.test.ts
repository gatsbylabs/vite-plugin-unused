import { expect, it } from "vitest";
import { filterExcluded } from "../src/plugin";

it("Filters excluded", () => {
  const res = filterExcluded(["1", "2", "3", "4"], ["2", "4"]);
  expect(res).toEqual(["1", "3"]);
});
