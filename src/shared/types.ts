export enum State {
    CLOSED,
    LOBBY,
    BETTING,
    PLAYING,
    RESULTS,
    CREDITS,
  }

export interface User {
  id: string,
  display_name: string
}