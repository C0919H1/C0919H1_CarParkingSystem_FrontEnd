import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

import { ForgotPasswordDialogComponent } from '../../loginn/forgot-password-dialog/forgot-password-dialog.component';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { AuthLoginInfo } from '../../../auth/login-info';
import { AuthJwtService } from '../../../auth/auth-jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  userInfo: AuthLoginInfo;
  private user: SocialUser;
  private loggedIn: boolean;
  private status: String;
  listError:any="";

  constructor(
    public dialog: MatDialog,
    private auth: AuthJwtService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private authService: AuthService,
    
  ) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(son => {
      this.tokenStorage.saveToken(this.user.idToken);
      this.tokenStorage.saveUsername(this.user.email);
      this.tokenStorage.saveNameEmployee(this.user.name);
      this.tokenStorage.savePhotoUrl(this.user.photoUrl);
      this.test();
    });

  }
  test(): void {
    this.router.navigateByUrl("/test-login");
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(son => {
      this.tokenStorage.saveToken(this.user.idToken);
      this.tokenStorage.saveUsername(this.user.email);
      this.tokenStorage.saveNameEmployee(this.user.name);
      this.tokenStorage.savePhotoUrl(this.user.photoUrl);
      this.test();
    });
  }

  signOut(): void {
    this.authService.signOut();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {

      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    // Lấy data ở trình duyệt liên kết
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.userInfo = new AuthLoginInfo(this.fusername.value, this.fpassword.value);
    this.login(this.userInfo);
  }

  get fusername() {
    return this.loginForm.get('username');
  }
  get fpassword() {
    return this.loginForm.get('password');
  }

  public login(userInfo) {

    //Khi đăng nhập thành công nó sẽ gói dữ liệu token, username, nameEMployee vào storage token. Rồi từ tokenStorage có thể lấy dữ liệu ra.
    console.log(userInfo)
    this.auth.attemptAuth(userInfo).subscribe(
      data => {
        console.log("hi")
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveNameEmployee(data.nameEmployee);
        console.log(data)
        this.router.navigateByUrl("/")
      },
      error => {
        console.log("Error ", error);
       this.listError="Tài khoản hoặc mật khẩu không đúng! Vui lòng nhập lại !!!";
      }
    );

  }

}
