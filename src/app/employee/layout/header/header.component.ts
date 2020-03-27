import { Component, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog} from '@angular/material';
import {LogoutDialogComponent} from '../logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { AccountService} from 'src/app/services/account.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String;
  nameEmployee: String;

  constructor(
    public dialog: MatDialog,
    private accountService: AccountService,
    private router:Router,
    private tokenStorageService:TokenStorageService,
  ) { }

  ngOnInit() {
    //Lấy dữ liệu được truyền lên khi đang nhập thành công ở Storage
    this.username = this.tokenStorageService.getUsername();
    this.nameEmployee = this.tokenStorageService.getNameEmployee();
    console.log(this.tokenStorageService.getNameEmployee())
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
