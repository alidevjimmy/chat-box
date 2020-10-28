import { Body, Controller, Post } from "@nestjs/common";
import {  } from "dgram";

@Controller('events')

export class EventController {
    @Post('send')
    send(@Body('message') message : string) {
        Socket.
    }   
}