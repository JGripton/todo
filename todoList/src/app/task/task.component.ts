import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import {MatListModule} from '@angular/material/list';
import { waitForAsync } from '@angular/core/testing';
import {MatCheckboxModule} from '@angular/material/checkbox';

interface Task {
  id: number;
  description: string;
  is_completed: boolean;
  auth0_id: string;
}


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  profileJson: string = null!; //stores current users information in json string

  constructor(public http: HttpClient, public auth: AuthService) {}
  taskList: string[] = [];
  taskCompleted: boolean[] = [];
  taskIDs: number[] = [];
  displayedColumns: string[] = ['Description', 'Complete?', 'Delete'];
  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
       
    )
    this.auth.user$.subscribe(
      (profile) => (this.getTasks()),
       
    )
  }
 
  createTask(task: {description: string, auth0_id: string}): void {
      task.auth0_id = JSON.parse(this.profileJson)["sub"]; //gets current users sub to send as auth0_id
      this.http.post(`http://localhost:3000/api/task/create`, task)
      .subscribe((result) => {
        console.log(result);
      });
      setTimeout(() => this.getTasks(), 250) //waits 250ms to ensure database has updated then reloads tasks list
    }
    

  getTasks(): void {
    console.log(this.profileJson)
    this.taskList = [] //Clears arrays so updated data can be pushed
    this.taskCompleted = []
    this.taskIDs = []
    var auth0_id = JSON.parse(this.profileJson)["sub"];
    this.http.get('http://localhost:3000/api/task/'+auth0_id)
    .subscribe((result) => {
      const json = JSON.stringify(result, null, 4);
      let obj: Task[] = JSON.parse(json);//Converts results to Task object
      for (let i = 0; i < obj.length; i++){
        this.taskList.push(obj[i].description)
        this.taskCompleted.push(obj[i].is_completed)
        this.taskIDs.push(obj[i].id)
      }
    })
  }

  deleteTask(id: number): void {
    const task = {id: id, auth0_id: JSON.parse(this.profileJson)["sub"]}
    this.http.post(`http://localhost:3000/api/task/delete`, task)
    .subscribe((result) => {
      console.log(result);
    });
  }
  deleteThenUpdate(id: number): void { //calls deleteTask API then manually updates table to avoid calling getTasks()
    this.deleteTask(id);
    let index = this.taskIDs.indexOf(id);
    this.taskList.splice(index, 1);
    this.taskCompleted.splice(index, 1);
    this.taskIDs.splice(index, 1);
  }

  updateStatus(e: any, index: number): void {
    const task = {id: this.taskIDs[index], auth0_id: JSON.parse(this.profileJson)["sub"], is_completed: true}
    if(e == false){
      task.is_completed = true;
    }
    else {
      task.is_completed = false;
    }
    this.http.post(`http://localhost:3000/api/task/updateStatus`, task)
    .subscribe((result) => {
      console.log(result);
      console.log(task.is_completed)
      console.log(e)
    });
    
  }


  
  

}


