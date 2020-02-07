import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { avplVideo } from './video-detail.mock';
import { VideosService } from '../services/videos.service';
import { SafePipe } from '../pipes/safe.pipe';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  // ! 1. Some required variables which will be used by YT API
  public YT: any;
  public video: any;
  public player: any;
  public reframed = false;
  public isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  // ! 1. Some required variables which will be used by YT API

  public innerWidth = window.innerWidth;
  public innerHeight = window.innerHeight;
  public videoId: string;
  public toggleViewMore = true;
  public videoData: any; // TODO: model to be written
  public recommVideos: any; // TODO: model to be written


  // ? Injecting the document element for accessing document.getElement and similar things
  // ? in Angular way(best practice implemented)
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videosService: VideosService,
    private location: Location,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document
  ) {
    window.onresize = (e) => {
      // ? ngZone.run will help to run change detection
      this.ngZone.run(() => {
        this.setDimensions();
      });
    };
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.videoId = routeParams.id;
      console.log(this.videoId);
      this.getVideoData(this.videoId);
    });
  }

  public getVideoData(id: string): void {
    // this.videoData = avplVideo[1];
    setTimeout(() => {
      this.recommVideos = [avplVideo[0], avplVideo[2], avplVideo[4], avplVideo[1],
      avplVideo[3], avplVideo[2], avplVideo[4], avplVideo[1], avplVideo[0], avplVideo[3]];
      console.log(this.recommVideos);
    }, 2000);
    this.videosService.getVideoData(id).subscribe(resp => {
      this.videoData = resp;
      this.initVideo();
    });
  }

  public viewMoreDesc(): void {
    this.toggleViewMore = !this.toggleViewMore;
  }

  public navigateToVideo(id: string): void {
    this.router.navigate(['video', id]);
  }

  public openYoutubeChannel(uri: string): void {
    window.open(uri, '_');
  }

  public navigateToHome(): void {
    window[`YT`] = null;
    this.router.navigate(['']);
  }

  // ! Youtube Video tracking methods

  // ? 2. Initialize method for YT IFrame API
  public initVideo(): void {
    // ? Return if Player is already created
    if (window[`YT`]) {
      if (this.player) {
        this.player.loadVideoById(this.videoId);
        return;
      } else {
        window[`YT`] = null;
      }
      // this.getVideoData(this.videoId);
    }
    // ? Creating a script element using elementRef for running the required scripts supported by youtube js api
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // ? 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads.
    window[`onYouTubeIframeAPIReady`] = () => this.startVideo();
  }

  // ? Video player creation, styles and other params
  public startVideo(): void {
    console.log('iug');
    this.reframed = false;
    this.player = new window[`YT`].Player('youtube-player', {
      videoId: this.videoId,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 1,
        fs: 1,
        playsinline: 1,
        origin: window.location.href
      },
      height: this.innerWidth > 800 ? '600px' : this.innerWidth > 500 ? '60%' : this.innerWidth > 300 ? '50%' : '25%',
      width: '100%',
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this),
      }
    });
  }

  // ? 4. It will be called when the Video Player is ready
  public onPlayerReady(event): void {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  // ? 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED
  public onPlayerStateChange(event): void {
    console.log(event);
    switch (event.data) {
      case window[`YT`].PlayerState.PLAYING:
        if (this.cleanTime() === 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime());
        }
        break;
      case window[`YT`].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        }
        break;
      case window[`YT`].PlayerState.ENDED:
        console.log('ended ');
        break;
    }
  }

  public cleanTime(): number {
    return Math.round(this.player.getCurrentTime());
  }

  public onPlayerError(event): void {
    switch (event.data) {
      case 2:
        console.log('' + this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  // ! Youtube Video tracking methods

  public setDimensions(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

}
