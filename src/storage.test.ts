// @vitest-environment jsdom

import { test, expect } from "vitest";
import { readRecord } from "./storage";

test("animes equal storageAnimes", () => {
  const animes = [
    {
      id: "test-anime-1",
      isCompleted: false,
      title: 'ナルト疾風伝',
      season: 3,
      episode: 32,
      startDate: new Date(),
      lastWatchDate: new Date()
    }
  ]
  
  localStorage.setItem("animes", JSON.stringify(animes));
  
  const storageAnimes = readRecord()
  
  expect(storageAnimes).toEqual(animes);
});
