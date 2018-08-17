import { LogEvent } from "hapi"
import * as assign from "object-assign";
import * as Hapi from "hapi"

export class Log {
    event: string;
    timestamp: number;
    pid: number
    
    tags: string[];
    data: object;
    error: object;

    constructor(init?: { tags: string[], data: object, error: object }){
        this.event = "log";
        this.pid = process.pid;
        this.timestamp = Date.now();
        if(init) {
            this.tags = init.tags;
            this.data = init.data;
            this.error = init.error;
        }
    }
}