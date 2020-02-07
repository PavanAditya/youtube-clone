import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideosService } from '../services/videos.service';
import { courseList } from '../courses/course-list.mock';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  constructor(
    private router: Router,
    private videosService: VideosService
  ) { }

  public youtubeList: any;

  ngOnInit() {
    this.getVideoList('alavaikunthapurramuloo');
  }

  public getVideoList(search: string): void {
    this.youtubeList = undefined;
    // this.videosService.getVideos(search, 50).subscribe(resp => {
    //   this.youtubeList = resp;
    //   console.log(this.youtubeList);
    // });

    // ? test code
    setTimeout(() => {
      this.youtubeList = courseList;
      console.log(this.youtubeList);
    }, 2000);
    // ? test code

  }

  public openYoutubeChannel(uri: string): void {
    window.open(uri, '_');
  }

  public navigateToVideo(id: string): void {
    this.router.navigate(['video', id]);
  }

}
