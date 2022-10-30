export interface Replay {
  _id?:string,
  userId: string,
  body: string
}

export interface Comment {
  _id?:string,
  userId:string,
  body:string,
  replays?: Replay[]
}

export interface Article {
  _id?:string,
  userId:string,
  title:string,
  body:string,
  category?:string,
  photos?:string[],
  likes?:string[],
  comments?:Comment[]
}
