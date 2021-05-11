import { Injectable } from '@angular/core';
import { io} from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable()
export class ChatService {
  //base url string
  private url:string = 'http://localhost:3000';
  private socket;

  constructor() { 
    this.socket = io(this.url);
  }

  //send message emit the message on the socket
  public sendMessage(message:string) {
    this.socket.emit('chat message', message);
  }

  //get message reserve the message on the socket
  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('chat message', function(msg){
          observer.next(msg)
        });
    });
}
}