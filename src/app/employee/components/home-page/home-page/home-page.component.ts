import { Component, OnInit } from "@angular/core";

export interface Section {
  name: string;
  notification: string;
  updated: Date;
}

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  notification;
  folders: Section[] = [
    {
      name: 'Photos',
      notification:'Nội dung thông báo',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      notification:'Nội dung thông báo',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      notification:'Nội dung thông báo',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Recipes',
      notification:'Nội dung thông báo',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Recipes',
      notification:'Nội dung thông báo',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Recipes',
      notification:'Nội dung thông báo',
      updated: new Date('1/17/16'),
    },
  ];
  constructor() {}

  ngOnInit() {
  }
}
