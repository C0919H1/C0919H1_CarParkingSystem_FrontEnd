import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from "firebase";

import { AccountService } from '../../../service/account.service';
import { error } from 'util';
import { AuthJwtService } from 'src/app/auth/auth-jwt.service';


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

  ) {
    
   }

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
      firebase.auth()
        .sendPasswordResetEmail(this.email)
        .then(function () {
          console.log("Success");
        })
    },
      error => {
        this.listNotify = "Username không tồn tại trong hệ thống";
      }
    );
  }

  forgot() {
    firebase.auth()
      .sendPasswordResetEmail(this.email)
      .then(function () {
        console.log("Success");
      })
      .catch(function (error) {
        //An error happend
        console.log("Error");
      });
  }

}
