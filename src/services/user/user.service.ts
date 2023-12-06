import axiosInstance from "@/api/api.interceptor.ts";
import {UserView} from "@/services/user/user.types.ts";

export const userService = {
    async get(): Promise<UserView> {
        const data = await axiosInstance.get<UserView>("/api/v1/user");

        return data.data;
    }
}
