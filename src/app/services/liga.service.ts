import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Liga } from '../models/liga';

@Injectable()
export class LigaService {

    private readonly API_URL = 'http://localhost:8083/liga/';
    private readonly API_URLL = 'http://localhost:8083/lige/';
    dataChange: BehaviorSubject<Liga[]> = new BehaviorSubject<Liga[]>([]);

    constructor(private httpClient: HttpClient) { }
    public getAllLige(): Observable<Liga[]> {
        this.httpClient.get<Liga[]>(this.API_URLL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addLiga(liga: Liga): void {
        this.httpClient.post(this.API_URL, liga).subscribe();
    }

    public updateLiga(liga: Liga): void {
        this.httpClient.put(this.API_URL, liga).subscribe();
    }

    public deleteLiga(id: number): void {
        console.log(this.API_URL + id);
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}