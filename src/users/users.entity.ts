import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs"
import { Exclude } from "class-transformer";
import * as jwt from 'jsonwebtoken'
import { jwtContant } from '../shared/constants/auth.contant'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true
    })
    @Index({ unique: true })
    username: string

    @Column('text')
    password: string

    @Column({
        unique: true
    })
    email: string

    @Column({ default: false })
    isActive: boolean

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @DeleteDateColumn()
    deleted?: Date


    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    toResponseObject(showToken: boolean = false) {
        const { id, username, email, isActive, created, updated, deleted, token } = this
        const res = {
            id , username , email , token : null
        }
        if (showToken) {
            res.token = token
        }
        return res
    }

    private get token() {
        const { id, username, email } = this
        return jwt.sign({
            id, username, email
        }, jwtContant.secretKey, {
            expiresIn: '7d'
        })
    }

    async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password)
    }

}