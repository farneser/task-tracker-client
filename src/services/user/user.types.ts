export interface PatchUserDto {
    isSubscribed: boolean;
}

export interface UserView extends PatchUserDto {
    id: number;
    email: string;
    registrationDate: Date;
}
