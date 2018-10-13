import { ContactService } from './../../shared/services/contact.service';
import { ContactEmail } from '../../shared/types/contactEmail';
import { AuthService } from './../../auth/auth.service';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private contactService: ContactService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  onSubmit() {
    const {name, email, message} = this.form.value;
    const date: string = Date().toString();
    const mailbox = 'Test';

    let userId;
    if (this.authService.loggedInUserId !== undefined) {
      userId = this.authService.loggedInUserId;
    } else {
      userId = 'Guest';
    }
    let userEmail;
    if (this.authService.loggedInUserEmail !== undefined) {
      userEmail = this.authService.loggedInUserEmail;
    } else {
      userEmail =  email;
    }

    const newMessage: ContactEmail = {
      name: name,
      email: userEmail,
      mailbox: mailbox,
      message: message,
      date: date,
      userId: userId
    };

    this.contactService.sendMessage(newMessage);
    this.form.reset();
  }
}
