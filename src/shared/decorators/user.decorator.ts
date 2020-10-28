import { SetMetadata } from "@nestjs/common";

export const UserDecorator = (...roles : string[]) => SetMetadata('roles' , roles)