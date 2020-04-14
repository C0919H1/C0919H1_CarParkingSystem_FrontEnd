import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from "firebase";

import { AccountService } from '../../../service/account.service';
import { error } from 'util';
import { AuthJwtService } from 'src/app/auth/auth-jwt.service';
import { SMTP } from '../../../../assets/myjs/smtp.js';

declare let Email: any;

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {
  username: String;
  listNotify: any = "";
  email: any = "";


  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public accountService: AccountService,
    private router: Router,
    private authJwtService: AuthJwtService

  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  forgotPassword() {
    //Nêu backend Http.ok nó sẽ có dữ liệu ở data rồi thực hiện thông báo. Nêu Not_Found nó sẽ nhảy xuống error và hiển thị thông báo.
    this.authJwtService.forgotPassword(this.username).subscribe(data => {
      console.log(data)
      this.listNotify = "Vui lòng kiểm tra tin nhắn email để cài lại mật khẩu";
      this.email = this.data.email;
    },
      error => {
        this.listNotify = "Username không tồn tại trong hệ thống";
      }
    );
  }

  // forgot() {
  //   firebase.auth()
  //     .sendPasswordResetEmail(this.email)
  //     .then(function () {
  //       console.log("Success");
  //     })
  //     .catch(function (error) {
  //       //An error happend
  //       console.log("Error");
  //     });
  // }
  onSubmit() {

    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'carparkingc0919@gmail.com',
      Password: 'F5E8C018F1660C4E1B1255CE96D5B7F5D380',
      To: 'nguyenvthienduy@gmail.com',
      From: 'carparkingc0919@gmail.com',
      Subject: 'test mail',
      Body: '<i>This is sent as a feedback from my resume page.</i> <br/> <i>Link: http://localhost:4200/resetPassword/employeeId</i><br><br> <b>~End of Message.~</b> '
    }).then(message => {
      alert(message);
    });
  }

}
