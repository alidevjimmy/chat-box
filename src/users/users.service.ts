import { HttpException, HttpStatus, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Hash } from "crypto";
import { Repository } from "typeorm";
import { AddUserInterface } from "./interfaces/addUser.interface";
import { LoginInterface } from "./interfaces/login.interface";
import { User } from "./users.entity";
import * as jwt from 'jsonwebtoken'
import { JwtService } from "@nestjs/jwt";
import {jwtContant} from '../shared/constants/auth.contant'
import * as bcrypt from 'bcryptjs'
import { check } from "prettier";
import { UserResponse } from "./interfaces/users.response";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        // private jwtService : JwtService
    ) { }

    async findAll(): Promise<UserResponse[]> {
        let users = await this.userRepository.find().catch(e => {throw new NotFoundException(e.message)})
        return users.map(user => user.toResponseObject())
    }

    async find(id: string): Promise<UserResponse> {
        let user = await this.userRepository.findOne({where : {id}}).catch(e => {throw new NotFoundException})
        return user.toResponseObject()
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id).catch(e => {throw new NotAcceptableException})
    }

    async register(user: AddUserInterface): Promise<UserResponse> {
        let checkUser = await this.userRepository.findOne({where : [
            {email : user.email}, {username : user.username}
        ]})
        if(checkUser) {
            throw new HttpException('user already exists' , HttpStatus.BAD_REQUEST)
        }
        let newUser = await this.userRepository.create(user)
        await this.userRepository.save(newUser)
        return newUser.toResponseObject(true)
    }

    async login(data : LoginInterface):Promise<UserResponse> {
        const {email , password} = data
        let user = await this.userRepository.findOne({where : {email}})
        if (!(await user.comparePassword(password)) || !user) {
            throw new HttpException("email or password incurrect!" , HttpStatus.BAD_REQUEST)
        }
        
        return user.toResponseObject(true)
    }


}