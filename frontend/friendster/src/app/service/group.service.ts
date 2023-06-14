import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Group } from '../model/group';

@Injectable({
  providedIn: 'root'
})

export class GroupService {

    constructor(
        private apiService: ApiService,
        private config: ConfigService
      ) {
      }

      getGroups(){
        return this.apiService.get(this.config.all_groups_url);
      }

      getGroup(id: string){
        return this.apiService.get(this.config.group_url + id);
      }

      delete(group: Group){

        var groupDTO = {
            "id": group.id,
            "name": group.name,
            "description": group.description,
            "adminId": group.groupAdmin.id
        }

        const postHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this.apiService.post(this.config.delete_group_url, JSON.stringify(groupDTO), postHeaders)
          .pipe(map(() => {
          }));
      }

      create(group: Group){

        var groupDTO = {
            "name": group.name,
            "description": group.description,
            "adminId": group.groupAdmin.id
        }

        const postHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this.apiService.post(this.config.create_group_url, JSON.stringify(groupDTO), postHeaders)
          .pipe(map(() => {
          }));
      }

      edit(group: Group){

        var groupDTO = {
            "id": group.id,
            "name": group.name,
            "description": group.description,
            "adminId": group.groupAdmin.id
        }

        const postHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this.apiService.post(this.config.edit_group_url, JSON.stringify(groupDTO), postHeaders)
          .pipe(map(() => {
          }));
      }
}