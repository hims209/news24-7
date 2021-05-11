import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SendMailServiceService } from 'src/app/services/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})

export class ContactusComponent implements OnInit {
  //Variables
  alert : boolean = false;
  sndMessage: any = {};
  sendMessage = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl('')
  })

  constructor( private emailService: SendMailServiceService) { }

  ngOnInit(): void {
  }

  //On submit of contact us it will trigger alert and reset the sendMessage variable
  onSubmit() {
    this.emailService.sendEmail(this.sndMessage).subscribe((res) => {
      console.log("sendEmail Success",res);
    });
    this.alert = true;
    this.sendMessage.reset({});
  }
  //on the call of closeAlert method it will close the alert box
  closeAlert() {
    this.alert = false;
  }

}
