// import {} from 'class'

import { IsByteLength, IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AddUserTdo {
    @IsString()
    @IsDefined()
    username : string

    @IsString()
    @IsEmail()
    @IsDefined()
    email : string

    @IsString()
    @IsDefined()
    password : string
}