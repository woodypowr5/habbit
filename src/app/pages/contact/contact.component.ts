import { UserData } from './../../auth/userData.model';
import { ContactService } from './../../shared/services/contact.service';
import { ContactEmail } from '../../shared/types/contactEmail';
import { AuthService } from './../../auth/auth.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private form: FormGroup;
  private mailboxes = ['Report a Problem', 'Technical Support', 'General Questions', 'Account/Billing'];
  private mailbox: string;
  private userData: UserData;

  constructor(
    private authService: AuthService,
    private contactService: ContactService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.authService.loggedInUserChanged.subscribe(userData => {
      this.userData = userData;
    });
  }

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, []),
      'subject': new FormControl(null, [Validators.required]),
      'mailbox': new FormControl(null, [Validators.required]),
      'message': new FormControl(null, [Validators.required])
    });
  }
  onSubmit() {
    const {name, subject, mailbox, message} = this.form.value;
    const date: string = Date().toString();

    let userId;
    if (this.userData.userId !== undefined) {
      userId = this.userData.userId;
    } else {
      userId = 'Guest';
    }
    let userEmail;
    if (this.userData.email !== undefined) {
      userEmail = this.userData.email;
    } else {
      userEmail =  'Guest';
    }

    const newMessage: ContactEmail = {
      name: name,
      email: userEmail,
      mailbox: mailbox,
      message: message,
      date: date,
      userId: userId,
      subject: subject
    };

    this.contactService.sendMessage(newMessage);
    this.form.reset();
  }
}
