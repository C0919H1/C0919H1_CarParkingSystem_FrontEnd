import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { TokenStorageService } from '../../../auth/token-storage.service';
import { AccountService} from '../../../service/account.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorage: TokenStorageService,
    private accountService: AccountService,
    private router:Router
  ) { }

  ngOnInit() {
    //this.logout();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  logout(){
    this.tokenStorage.signOut();
    this.router.navigateByUrl("/login");
    this.dialogRef.close();    
  }
}
