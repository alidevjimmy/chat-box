import { IsDefined, IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsDefined()
    @IsString()
    email : string

    @IsString()
    @IsDefined()
    password : string

}