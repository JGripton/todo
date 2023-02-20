import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';

interface User {
  id: number;
  auth0_id: string;
  nickname: string;
  has_translated: boolean;
  is_admin: boolean;
}
interface Task {
  id: number;
  description: string;
  is_completed: boolean;
  auth0_id: string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{
  profileJson: string = null!; //stores current users information in json string
  userNicknameList: string[] = [];
  userTranslationStatusList: boolean[] = [];
  userAdminStatusList: boolean[] = [];
  userAuth0List: string[] = [];
  taskDescription: string[] = [];//Initialise arrays to store task information
  taskCompleted: boolean[] = [];

  constructor(public http: HttpClient, public auth: AuthService) {}
  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)), //gets user information and stores it in profileJson
       
    )
    this.auth.user$.subscribe(
      (profile) => (this.getUsers()), //Calls getUsers function once user data is loaded
       
    )
  }

  getUsers(): void {
    var auth0_id = JSON.parse(this.profileJson)["sub"];
    this.http.get(env.dev.APIserverUrl+'/api/user/'+auth0_id)
    .subscribe((result) => {
      //console.log(result)
      const json = JSON.stringify(result, null, 4);
      let user: User[] = JSON.parse(json);//Converts results to User object
      for (let i = 0; i < user.length; i++){
        this.userNicknameList.push(user[i].nickname)
        this.userTranslationStatusList.push(user[i].has_translated)
        this.userAdminStatusList.push(user[i].is_admin)
        this.userAuth0List.push(user[i].auth0_id)
      }
    })
  }

  getTasks(index: number): void {
    this.taskDescription = [] //Clears arrays so updated data can be pushed
    this.taskCompleted = []
    var auth0_id = this.userAuth0List[index];
    this.http.get(env.dev.APIserverUrl+'/api/task/'+auth0_id)
    .subscribe((result) => {
      //console.log(result)
      const json = JSON.stringify(result, null, 4);
      let obj: Task[] = JSON.parse(json);//Converts results to Task object
      for (let i = 0; i < obj.length; i++){
        this.taskDescription.push(obj[i].description)
        this.taskCompleted.push(obj[i].is_completed)
      }
    })
  }



}
