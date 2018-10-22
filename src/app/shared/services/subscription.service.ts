import { Customer } from './../types/customer.model';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/observable';
import { UserData } from '../../auth/userData.model';
import { AuthService } from '../../auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMapTo, switchMap } from 'rxjs/operators';


@Injectable()
export class SubscriptionService {
  private userData: UserData;
  private hasSubscription = false;
  private userId: number;
  private customer: Customer;
  customerChanged = new BehaviorSubject<Customer>(null);
  private customerValueSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.authService.loggedInUserChanged.subscribe((userData: UserData) => {
      this.userData = userData;
      if (userData !== null) {
        this.fetchCustomer();
      }
    });
  }

  fetchCustomer() {
    const customerRef = this.db.collection('customers').doc(this.userData.userId);
    customerRef
      .valueChanges().subscribe((customer: Customer) => {
        this.customer = customer;
        this.customerChanged.next(this.customer);
      });
  }

  processPayment(source: any) {
    this.db.collection(`customers`).doc(`${this.userData.userId}`).update({
      source: source
    });
  }
}

// firebase functions:config:set stripe.testkey="pk_test_JcxDwMOwS2qiHbqvBuQtkPVj"
