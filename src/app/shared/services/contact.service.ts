import { ContactEmail } from './../types/contactEmail';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ContactService {

    constructor(private db: AngularFirestore) {}

    sendMessage(data: ContactEmail) {
        const html = `
            <div>From: ${data.name}</div>
            <div>Email: ${data.email}</div>
            <div>Date: ${data.date}</div>
            <div>UserId: ${data.userId}</div>
            <div>Message: ${data.message}</div>
        `;

        this.db.collection('messages').add({
            subject: data.subject,
            mailbox: data.mailbox,
            html: html
        });
    }

}
