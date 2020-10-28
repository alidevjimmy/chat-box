import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "dgram";

@WebSocketGateway()
export class EventGateWay implements OnGatewayInit , OnGatewayConnection , OnGatewayDisconnect{

    afterInit(server: any) {
        throw new Error("Method not implemented.");
    }

    handleDisconnect(client: Socket) {
        throw new Error("Method not implemented.");
    }

    handleConnection(client: Socket, ...args: any[]) {
        throw new Error("Method not implemented.");
    }


    @SubscribeMessage('sendMessage')
    sendMessage(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket) {
        return { data, client }
    }

}