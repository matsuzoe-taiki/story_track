import type { AnimeRecord } from "./types.js";
import { loadInitialOperation } from "./index.js";

export function createRecord(recordId: string): void {
  const anime: AnimeRecord =
  {
      id: recordId,
      isCompleted: false,
      title: '',
      season: 0,
      episode: 0,
      startDate: null,
      lastWatchDate: null 
  };

  if (localStorage.length === 0) {
      const updatedAnimes: AnimeRecord[] = [];

      updatedAnimes.push(anime);
      localStorage.setItem("animes", JSON.stringify(updatedAnimes));
      return
  }

  const storageAnimes = localStorage.getItem("animes");

  if (storageAnimes === null) {
      return;
  }

  const animes: AnimeRecord[] = JSON.parse(storageAnimes);

  animes.push(anime);
  localStorage.setItem("animes", JSON.stringify(animes));
}

export function readRecord() {
  const storageAnimes = localStorage.getItem("animes");

  if (storageAnimes === null) {
      return;
  }

  const animes: AnimeRecord[] = JSON.parse(storageAnimes);

  return animes
}

export function updateRecord(
  id: string,
  columnName: string,
  information: string | boolean | number | Date
) {

  const animes = readRecord();
  const updatedAnimes: AnimeRecord[] = [];

  if (animes === undefined) {
      return;
  }

  for (const anime of animes) {
      if (id === anime.id) {
          switch (columnName) {
              case "isCompleted":
                  if (typeof information === "boolean") anime.isCompleted = information;
                  break;
              case "title":
                  if (typeof information === "string") anime.title = information;
                  break;
              case "season":
                  if (typeof information === "number") anime.season = information;
                  break;
              case "episode":
                  if (typeof information === "number") anime.episode = information;
                  break;
              case "startDate":
                  if (information instanceof Date) anime.startDate = information;
                  break;
              case "lastWatchDate":
                  if (information instanceof Date) anime.lastWatchDate = information;
                  break;
  
          }
          updatedAnimes.push(anime);
      } else {
          updatedAnimes.push(anime);
      }
  }

  localStorage.setItem("animes", JSON.stringify(updatedAnimes));
}

export function deleteRecord(id: string) {
    const animes = readRecord();

    if (animes === undefined) {
        throw new Error('animesが空です');
    }

    for (let index = 0; index < animes.length; index++) {
        if (id === animes[index]?.id) {
            animes.splice(index, 1);
            break;
        }
    }

    localStorage.setItem("animes", JSON.stringify(animes));

    loadInitialOperation();
}
