import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';
import { PlanService } from '../shared/services/plan.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrackingService } from '../shared/services/tracking.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { UserData } from './userData.model';

@Injectable()
export class AuthService {
  private loggedInUser: UserData;
  public loggedInUserChanged: BehaviorSubject<UserData> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trackingService: TrackingService,
    private planService: PlanService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
    private db: AngularFirestore
  ) {
    this.loggedInUserChanged.subscribe(userData => {
      this.loggedInUser = userData;
    });
  }

  initAuthListener(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userData: UserData = {
          userId: user.uid,
          email: user.email
        };
        this.loggedInUserChanged.next(userData);
        this.hydrateDependentServices(userData);
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/']);
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/']);
      }
    });
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.planService.createPlan(result.user.uid);
        this.store.dispatch(new UI.StopLoading());
        this.createSubscriptionTables();
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  createSubscriptionTables(): void {
    this.db.collection('customers').doc(this.loggedInUser.userId).set({
      token: null,
      customerId: null,
      subscription: null
    });
  }

  hydrateDependentServices(data): void {
    this.planService.fetchPlanByUserId(data.userId);
    this.trackingService.fetchHistoryByUserId(data.userId);
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }
}
