import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Videos } from '../mocks/videos.mock';
import { Courses } from '../mocks/courses.mock';
import { VideosService } from '../services/videos.service';
import { CoursesService } from '../services/courses.service';
import { courseList } from '../courses/course-list.mock';

@Component({
  selector: 'app-lms-home',
  templateUrl: './lms-home.component.html',
  styleUrls: ['./lms-home.component.scss']
})
export class LmsHomeComponent implements OnInit {

  public load = true;
  public videosCount: number;
  public videosList = Videos;
  public courseList = Courses;
  public courseVideosList = courseList;
  public youtubeList: any;

  constructor(
    private router: Router,
    private videosService: VideosService,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.getVideoList('alavaikunthapurramuloo');
    this.videosCount = 0;
    setTimeout(() => {
      this.load = false;
    }, 2000);
  }

  public getVideoList(search: string): void {
    this.youtubeList = undefined;
    // this.videosService.getVideos(search, 9).subscribe(resp => {
    //   this.youtubeList = resp.items;
    //   console.log(this.youtubeList);
    // });

    // ? test code
    setTimeout(() => {
      this.youtubeList = this.courseVideosList.items.slice(0, 9);
      console.log(this.youtubeList);
    }, 2000);
    // ? test code

  }

  public navigateToVideo(id: string): void {
    this.router.navigate(['video', id]);
  }

  public navigateToCourse(id: string): void {
    this.router.navigate(['coursedetail', id]);
  }

  public openYoutubeChannel(uri: string): void {
    window.open(uri, '_');
  }

  public navigateTo(route: string): void {
    this.load = true;
    this.videosCount++;
    setTimeout(() => {
      this.youtubeList = this.courseVideosList.items.slice(0, (9 + (this.videosCount * 10)));
      console.log(this.youtubeList);
      this.load = false;
    }, 2000);
    // this.router.navigate([route]);
  }

}
