import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Players } from '../models/players.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isUserAuthenticated=false;
  selectedPlayerData: any;
  playersData: Players[] = [];
  @Output() playersUpdated = new EventEmitter<Players[]>();

  constructor(private http:HttpClient, private router:Router) { }

  getPlayersList() {
   return this.http.get(environment.postUrl);

  }

  setPlayersData(playersData: Players[]) {
    this.playersData = playersData;
  }

  updatePlayersData(index, playersData) { 
    playersData['index'] = index;
    this.playersData[index] = playersData;
    return this.http.put(environment.postUrl, this.playersData);

  }

  addNewPlayer(playersData) {
    playersData.photo = './assets/images/' + playersData.name.toLowerCase() + '.jpg';
    let index = this.playersData.length;
    playersData['index'] = index;
    this.playersData.push(playersData);
    
    return this.http.put(environment.postUrl, this.playersData);
  }

  deletePlayer(index) {
    this.playersData.splice(index, 1);
    return this.http.put(environment.postUrl, this.playersData);
  }


}
