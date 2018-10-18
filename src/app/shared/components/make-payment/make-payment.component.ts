import { environment } from './../../../../environments/environment';
import { PaymentsService } from './../../services/payments.service';
import { Component, OnInit, HostListener } from '@angular/core';
import * as Stripe from 'stripe';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})

export class MakePaymentComponent implements OnInit {
  handler: any;

  constructor(public paymentsService: PaymentsService) { }

  ngOnInit() {
    this.configHandler();
  }

  private configHandler() {
    this.handler = (<any>window).StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://goo.gl/EJJYq8',
      locale: 'auto',
      token: token => {
        this.paymentsService.processPayment(token);
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'Habbit Subscription',
      amount: 1500
    });
  }

  // Is there a way to get the subscription status from the front end? 

  // handler: any;
  // amount = 1;
  // constructor(private paymentsSvc: PaymentsService ) { }

  // ngOnInit() {
  //   this.handler = (<any>window).StripeCheckout.configure({
  //     key: environment.stripeKey,
  //     image: '/your/awesome/logo.jpg',
  //     locale: 'auto',
  //     token: token => {
  //       this.paymentsSvc.processPayment(token, this.amount);
  //     }
  //   });
  // }

  // handlePayment() {
  //   this.handler.open({
  //     name: 'Subscription',
  //     amount: this.amount
  //   });
  // }

  // @HostListener('window:popstate')
  //   onPopstate() {
  //     this.handler.close();
  //   }
}
