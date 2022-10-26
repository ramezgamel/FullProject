export interface Replay {
  userId: string,
  body: string
}

export interface Comment {
  userId:string,
  body:string,
  replays: Replay[]
}

export interface Article {
  userId:string,
  title:string,
  body:string,
  photos:string[],
  likes:string[],
  comments:Comment[]
}
