import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { LoginComponent} from '../../loginn/login/login.component';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-test-login',
  templateUrl: './test-login.component.html',
  styleUrls: ['./test-login.component.css']
})
export class TestLoginComponent implements OnInit {

  email: String;
  name: String;
  photoUrl: String;

  constructor(
    private authService: AuthService,
    private tokenStorageService:TokenStorageService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.name = this.tokenStorageService.getNameEmployee();
    this.email = this.tokenStorageService.getUsername();
    this.photoUrl = this.tokenStorageService.getPhotoUrl();
  }

  signOut(): void {
    this.authService.signOut();
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
  }

}
