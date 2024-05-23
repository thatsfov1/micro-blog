export interface Post {
    id:string
    content:string
    author:string
}

export type State = {
    posts: Post[]

}


export type Action =
    | { type: 'add', payload: string }
