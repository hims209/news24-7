import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import io from 'socket.io-client';
import jwt_decode from 'jwt-decode';
import { DatePipe } from '@angular/common';
import { ElementAst } from '@angular/compiler';
const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})

export class ChatboxComponent implements OnInit {
  //Variables
  socket;
  message: string;
  lastMessage: any = {
    name: '',
    time: null,
    message: '',
  };
  name: string;

  //Send message method to emit the message on the socket
  SendMessage() {
    this.socket.emit('message', {
      name: this.name,
      message: this.message,
      time: new Date(),
    });
     

     const MsgName = document.createElement('h6');
        MsgName.innerText = this.name;

        //paragraph message element
        const Msg = document.createElement('p');
        Msg.innerHTML = this.message;

        const time = document.createElement('p');
        time.innerHTML = this.datePipe.transform(
          new Date(),
          'medium',
          this.locale
        );
        time.className = 'text-muted';
        const element = document.createElement('li');
        var classes;
        
          console.log("here me")
          classes = 'list-group-item ms-5 mt-2 me-1';
          element.style.backgroundColor = '#a1dfec';
        

        element.className = classes;

        element.appendChild(MsgName);
        element.appendChild(Msg);
        element.appendChild(time);

        document.getElementById('msgList').appendChild(element);
        // this.lastMessage = data;

        this.message = '';
  }

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private datePipe: DatePipe
  ) {}

  //onInit it will call setupSocket Connection
  ngOnInit() {
    const token = localStorage.token;
    const decodedToken: any = jwt_decode(token);
    this.name = decodedToken.name;
    console.log(decodedToken.name)

    this.setupSocketConnection();
  }

  //In this method it will set the socket and create a new component with the text message of user.
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: any) => {
      if (data) {
        //name header element
        const MsgName = document.createElement('h6');
        MsgName.innerText = data.name;

        //paragraph message element
        const Msg = document.createElement('p');
        Msg.innerHTML = data.message;

        const time = document.createElement('p');
        time.innerHTML = this.datePipe.transform(
          data.time,
          'medium',
          this.locale
        );
        time.className = 'text-muted';
        const element = document.createElement('li');
        var classes;
        if (data.name == this.name) {
          console.log("here me")
          classes = 'list-group-item ms-5 mt-2 me-1';
          element.style.backgroundColor = '#a1dfec';
        } else {
          console.log("here not me")
          classes = 'list-group-item me-5 mt-2 ms-1';
          element.style.backgroundColor = '#d3cfcf';
        }

        element.className = classes;

        element.appendChild(MsgName);
        element.appendChild(Msg);
        element.appendChild(time);

        document.getElementById('msgList').appendChild(element);
        this.lastMessage = data;
      }
    });
  }
}
