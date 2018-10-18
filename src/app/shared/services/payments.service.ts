import { UserData } from './../../auth/userData.model';
import { AuthService } from './../../auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class PaymentsService {
  private userData: UserData;
  membership: any;


  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.authService.loggedInUserChanged.subscribe(userData => {
      this.userData = userData;
    });
  }

  processPayment(token: any) {
    this.db.collection(`customers`).doc(`${this.userData.userId}`).set({token: token});

    // const path = `customers/${this.userId}`;
    // const userDocument = this.db.doc<any>(path);
    // userDocument.update(token);
    // return this.db.doc(`/customers/${this.userId}`)
    //   .update({ token: token.id });
  }
 
  createNewUser() {
    
  }

  // const path = `plans/${this.userId}`;
  // const userDocument = this.db.doc<any>(path);
  // userDocument.update(this.plan);

  // userId: string;

  // constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
  //   this.afAuth.authState.subscribe((auth) => {
  //     if (auth) {
  //       this.userId = auth.uid;
  //     }
  //     {}});
  // }

  // processPayment(token: any) {
  //   const payment = { token, amount };
  //   return this.db.collection('payments')
  //    .doc(this.userId)
  //    .set(payment);
  // }
}

// firebase functions:config:set stripe.testkey="pk_test_JcxDwMOwS2qiHbqvBuQtkPVj"
