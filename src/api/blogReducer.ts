import {Action, State} from "@/types/types";

const blogReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "CREATE_POST": {
            return {
                ...state, posts: [...state.posts, action.payload]
            }
        }
        case "CREATE_COMMENT": {
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload.id
                        ? {...post, comments: [...post?.comments, action.payload]}
                        : post
                )
            };
        }
        default:
            throw new Error('Unhandled action');
    }
}

export default blogReducer