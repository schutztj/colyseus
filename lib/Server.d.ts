/// <reference types="node" />
import * as http from 'http';
import * as net from 'net';
import * as WebSocket from 'ws';
import { ServerOptions as IServerOptions } from 'ws';
import { MatchMaker } from './MatchMaker';
import { RegisteredHandler } from './matchmaker/RegisteredHandler';
import { Presence } from './presence/Presence';
import { Client } from './index';
import { RoomConstructor } from './Room';
export declare type ServerOptions = IServerOptions & {
    seatReserveationTime?: number;
    verifyClient?: WebSocket.VerifyClientCallbackAsync;
    presence?: any;
    engine?: any;
    ws?: any;
};
export declare class Server {
    matchMaker: MatchMaker;
    protected server: WebSocket.Server;
    protected httpServer: net.Server | http.Server;
    protected presence: Presence;
    protected pingInterval: NodeJS.Timer;
    protected onShutdownCallback: () => void | Promise<any>;
    constructor(options?: ServerOptions);
    attach(options: ServerOptions): void;
    listen(port: any, hostname?: string, backlog?: number, listeningListener?: Function): void;
    register(name: string, handler: RoomConstructor, options?: any): RegisteredHandler;
    onShutdown(callback: () => void | Promise<any>): void;
    protected verifyClient: (info: any, next: any) => Promise<any>;
    protected onConnection: (client: Client, req?: any) => void;
    protected onMessageMatchMaking(client: Client, message: any): void;
    protected shutdown(): void | Promise<any>;
}
