import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
@Injectable({
  providedIn: 'root',
})
export class SignupGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: SignupComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true cho phép người dùng rời khỏi component

    // kiểm tra form bên trong đã bị thay đổi chưa
    const isDirty = component.signupForm.dirty;

    if (isDirty) {
      return window.confirm(
        'Nếu bạn ra khỏi trang này thì dữ liệu đã nhập sẽ bị mất'
      );
    }
    return true;
  }
}
