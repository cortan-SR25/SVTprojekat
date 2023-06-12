import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

    constructor(
        private apiService: ApiService,
        private config: ConfigService
      ) {
      }

      create(type: any, reactorId: any, contentId: any) {

        var reaction = {"type": type,
                "reactorId": reactorId,
                "contentId": contentId          
        }

        const reactionHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this.apiService.post(this.config.create_reaction_url, JSON.stringify(reaction), reactionHeaders)
          .pipe(map(() => {
          }));
      }

    delete(type: any, reactorId: any, contentId: any){

        var reaction = {"type": type,
                "reactorId": reactorId,
                "contentId": contentId          
        }

        const reactionHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this.apiService.post(this.config.delete_reaction_url, JSON.stringify(reaction), reactionHeaders)
          .pipe(map(() => {
          }));
      }

}