export type RegisterDto = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export type UserDto = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    created_at: string;
    updated_at: string;
};

export type AuthResponse = {
    token: string;
    user: UserDto;
};
