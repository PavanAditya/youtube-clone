import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { LmsHomeComponent } from './lms-home/lms-home.component';


const routes: Routes = [
  {
    path: '',
    component: LmsHomeComponent
  },
  {
    path: 'lms',
    component: LmsHomeComponent
  },
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'coursedetail/:id',
    component: CourseListComponent
  },
  {
    path: 'video/:id',
    component: VideoPlayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
