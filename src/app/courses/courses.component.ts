import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { courseList } from './course-list.mock';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(
    private router: Router,
    private coursesService: CoursesService
  ) { }

  public youtubeCoursesList: any; // TODO: model to be written

  ngOnInit() {
    this.getCoursesList('alavaikunthapurramuloo');
  }

  public getCoursesList(search: string): void {
    this.youtubeCoursesList = undefined;
    // this.coursesService.getVideos(search, 10).subscribe(resp => {
    //   this.youtubeCoursesList = resp;
    //   console.log(this.youtubeCoursesList);
    // });

    // ? test code
    setTimeout(() => {
      this.youtubeCoursesList = courseList.items.slice(0, 10);
      console.log(this.youtubeCoursesList);
    }, 2000);
    // ? test code

  }

  public openYoutubeChannel(uri: string): void {
    window.open(uri, '_');
  }

  public navigateToCourse(id: string): void {
    this.router.navigate(['coursedetail', id]);
  }

}
