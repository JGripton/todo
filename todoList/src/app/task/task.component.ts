import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';


interface Message {
  message: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  profileJson: string = null!; //stores current users information in json string
  constructor(public http: HttpClient, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
  }
  

  createTask(task: {description: string, auth0_id: string}): void {
      task.auth0_id = JSON.parse(this.profileJson)["sub"]; //gets current users sub to send as auth0_id
      this.http.post(`http://localhost:3000/api/task/create`, task)
      .subscribe((result) => {
        console.log(result);
      });
    }

  getTasks(): void {
    var auth0_id = JSON.parse(this.profileJson)["sub"];
    this.http.get('http://localhost:3000/api/task/'+auth0_id)
    .subscribe((result) => {
      console.log(result);
    })
  }  

}