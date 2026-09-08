export type AnimeRecord = {
  id: string,
  isCompleted: boolean,
  title: string,
  season: number,
  episode: number,
  startDate: Date | null,
  lastWatchDate: Date | null
}
