import { AuthService } from './../../auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
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

  constructor(private fb: FormBuilder, private db: AngularFirestore, private authService: AuthService) {
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
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: ${email}</div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    console.log(html);
    let userId;
    if (this.authService.loggedInUserId !== undefined) {
      userId = this.authService.loggedInUserId;
    } else {
      userId = 'Guest';
    }
    const formRequest = { name, email, message, date, html, userId };
    this.db.collection('messages').add(formRequest);
    this.form.reset();
  }
}
