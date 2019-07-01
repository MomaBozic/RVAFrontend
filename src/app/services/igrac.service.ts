import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Igrac } from '../models/igrac';

@Injectable()
export class IgracService {
    private readonly API_URL = 'http://localhost:8083/igraci/';
    private readonly API_URLL = 'http://localhost:8083/igrac/';
    private readonly API_URL_BYID = 'http://localhost:8083/igracTimId/';
    dataChange: BehaviorSubject<Igrac[]> = new
         BehaviorSubject<Igrac[]>([]);

    constructor(private httpClient: HttpClient) {}
    public getIgracTimId(idTim): Observable<Igrac[]> {
        this.httpClient.get<Igrac[]>(this.API_URL_BYID + idTim)
            .subscribe(data => {
                this.dataChange.next(data);
            },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
            return this.dataChange.asObservable();
    }

    public addIgrac(igrac: Igrac): void {
        this.httpClient.post(this.API_URLL, igrac).subscribe();
    }

    public updateIgrac(igrac: Igrac): void {
        this.httpClient.put(this.API_URLL, igrac).subscribe();
    }
    
    public deleteIgrac(id: number): void {
        this.httpClient.delete(this.API_URLL + id).subscribe();
    }
}