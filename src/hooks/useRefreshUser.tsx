"use client";
import { useBlogContext } from "@/api/context";
import { getProfile } from "@/api/api";
import { useEffect } from "react";

const useRefreshUser = () => {
    const { state: { user }, dispatch } = useBlogContext();
    const token = localStorage.getItem('token');

    const fetchProfile = async () => {
        if (token) {
            try {
                const userProfile = await getProfile(token);
                dispatch({ type: 'SET_USER', payload: userProfile });
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        }
    };

    useEffect(() => {
        if (!user) {
            fetchProfile();
        }
    }, [user]);

    return null
};

export default useRefreshUser;
