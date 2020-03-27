import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public httpClient: HttpClient) {

    var firebaseConfig = {
      apiKey: "AIzaSyCIrgUw-g6rHvgfZTJUGMNCk4Ic8vZu69A",
      authDomain: "test-d17da.firebaseapp.com",
      databaseURL: "https://test-d17da.firebaseio.com",
      projectId: "test-d17da",
      storageBucket: "test-d17da.appspot.com",
      messagingSenderId: "181165624603",
      appId: "1:181165624603:web:154cd9511d90fb7a5557be",
      measurementId: "G-36MEQP18TV"

    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


  }

  title = 'C0919H1-CarParkingSystem-FrontEnd';

}
