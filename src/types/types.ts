export interface Post {
    id:string
    content:string
    author:string
    comments?:Comment[]
}

export interface Comment {
    id:string
    name:string
    content:string
}

export interface User{
    name: string
    password: string
    email:string
    role:string
    avatar:string
}

export type State = {
    posts: Post[]
}


export type Action =
    | { type: 'ADD_USER', payload: User }
    | { type: 'CREATE_POST', payload: Post }
    | { type: 'CREATE_COMMENT', payload:Comment  }
    | { type: 'SET_USER', payload:User | null  }

