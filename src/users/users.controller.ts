import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AddUserTdo } from "./dto/addUser.tdo";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "./users.service";
import {env} from '../shared/constants/app.constant'
import { AuthGuard } from "src/shared/guards/auth.guard";
import {UserDecorator} from '../shared/decorators/user.decorator'

@Controller()
export class UserController {
    constructor(private readonly userService : UserService) {}

    @UseGuards(AuthGuard)
    @UserDecorator('admin')
    @Get(`${env.version}/users`)
    async findAll(){
        return await this.userService.findAll()
    }

    @UseGuards(AuthGuard)    
    @Get(`${env.version}/users/:id`)
    @UsePipes(new ValidationPipe)
    async find(@Param('id') id : string) {
        return await this.userService.find(id)
    }

    @Post('register')
    @UsePipes(new ValidationPipe)
    async register(@Body() user : AddUserTdo){
        return await this.userService.register(user)
    }

    @Post('login')
    @UsePipes(new ValidationPipe)
    async login(@Body() data : LoginDto) {
        return await this.userService.login(data)
    }
}