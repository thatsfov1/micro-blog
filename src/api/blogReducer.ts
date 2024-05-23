import {Action, State} from "@/types/types";

const blogReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "add": {
            return {
                ...state
            }
        }
        default:
            throw new Error('Unhandled action');
    }
}

export default blogReducer