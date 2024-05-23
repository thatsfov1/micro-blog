"use client"
import {createContext, Dispatch, ReactNode, useContext, useReducer} from 'react'
import {posts,users} from "./data";
import {Action, State} from "@/types/types";
import blogReducer from "./blogReducer";

type BlogProviderProps = {
    children: ReactNode
}

type ContextType = {
    state: State
    dispatch: Dispatch<Action>
}

export const BlogContext = createContext<ContextType | undefined>(undefined)

export function useBlogContext() {
    const context = useContext(BlogContext);
    if (context === undefined) {
        throw new Error("useCompanyContext must be used with a CompanyContext")
    }
    return context
}

const ContextProvider = ({children}: BlogProviderProps) => {

    const [state, dispatch] = useReducer(blogReducer, {
        posts:posts,
        users:users,
        user:null
    })
    return (
        <BlogContext.Provider value={{state, dispatch}}>
            {children}
    </BlogContext.Provider>
)
}

export default ContextProvider