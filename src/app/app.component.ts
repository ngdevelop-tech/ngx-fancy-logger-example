import { Component } from '@angular/core';
import { NgxFancyLoggerService, LogLevel } from 'ngx-fancy-logger';
import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private logger: NgxFancyLoggerService){
    logger.header('App Component Loaded...')
  }
  
  showHeaderLog(){
    this.logger.header('NgxFancyLogger Header Log with configured color and fontSize', {color: 'red', fontSize: 30})
  }

  showDifferentLogLevels(){
    this.logger.info('This is a info log', {data: {a: 20, b:30 }});
    this.logger.debug('This is a debug log', {data: {a: 20, b:30 }});
    this.logger.warning('This is a warning log', {data: {a: 20, b:30 }});
    this.logger.error('This is a error log', {data: {a: 20, b:30 }});
  }

  debugRxJSStream(){
    let source$ = interval(1000);
    source$.pipe(
      this.logger.debugOperator(),
      map<number, number>(data => data*100),
      this.logger.debugOperator('Result', LogLevel.INFO),
      take(5),
    ).subscribe();
  }
}
