import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList: BehaviorSubject<Event[]> = this.eventService.list$;
  testEvent: Observable<Event> = this.eventService.get(1);

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void { }

  onDelete(event: Event): void {
    this.eventService.remove(event);
    this.showWarning();
  }

  showWarning() {
    this.toastr.warning('Event deleted', '', { timeOut: 3000, easing: 'ease-in', easeTime: 300, tapToDismiss: true });
  }
}
