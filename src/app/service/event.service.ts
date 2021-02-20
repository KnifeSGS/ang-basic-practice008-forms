import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  eventsUrl: string = "http://localhost:3000/list";

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll(): void {
    this.http.get<Event[]>(this.eventsUrl).subscribe(ev => this.list$.next(ev))
  }

  get(id: number): Observable<Event> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    const ev: Event | undefined = this.list$.value.find(item => item.id === id);
    if (ev) {
      return of(ev);
    }
    return of(new Event());
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(`${this.eventsUrl}/${event.id}`, event);
  }

  create(event: Event): void {
    this.http.post<Event>(this.eventsUrl, event).subscribe(
      () => this.getAll()
    );
  }

  remove(event: Event): void {
    this.http.delete(`${this.eventsUrl}/${event.id}`).subscribe(
      () => this.getAll()
    );
  }
}
