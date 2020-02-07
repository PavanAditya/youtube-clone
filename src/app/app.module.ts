import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { LmsHomeComponent } from './lms-home/lms-home.component';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './pipes/safe.pipe';
import { ViewMorePipe } from './pipes/view-more.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    VideoPlayerComponent,
    CoursesComponent,
    CourseListComponent,
    LmsHomeComponent,
    SafePipe,
    ViewMorePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
