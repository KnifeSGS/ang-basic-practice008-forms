import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { last, switchMap, toArray } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  // 1. Kiolvasni az id paramétert az url-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap(params => this.eventService.get(params.id))
  );
  updating: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) {

  }

  //   A listázó komponensben legyen egy nagy gomb a táblázat felett, az új esemény 
  // létrehozásához. Ha rákattintanak, akkor nyissa meg az editort 0 id -vel.  
  // > Az EditorComponent osztályában az onUpdate metódusban vizsgáld meg, hogy 
  // 0 -e az id -je az eseménynek, és ha igen, akkor az EventService create metódusát 
  // hívd meg, átadva neki az esemény adatait.

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, event: Event): void {
    this.updating = true;
    if (event.id === 0) {
      this.eventService.create(event);
      this.router.navigate(['']);
    } else {
      this.eventService.update(event).subscribe(
        ev => this.router.navigate([''])
      );
    }
  }

}
