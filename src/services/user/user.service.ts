import axiosInstance from "@/api/api.interceptor.ts";
import {PatchUserDto, UserView} from "@/services/user/user.types.ts";

export const userService = {
    async get(): Promise<UserView> {
        const data = await axiosInstance.get<UserView>("/api/v1/user");

        return data.data;
    },
    async patch(dto: PatchUserDto): Promise<UserView> {
        const data = await axiosInstance.patch<UserView>("/api/v1/user", {
            isSubscribed: dto.isSubscribed
        });

        return data.data;
    }
}
