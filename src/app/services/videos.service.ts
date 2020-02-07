import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(
    private http: HttpClient
  ) { }

  private YOUTUBE_BASE_URL = environment.baseURL;
  private API_KEY = environment.apiKey;
  private SEARCH_URL = `search`;
  private VIDEOS_URL = `videos`;
  private SNIPPET_URL = `?part=snippet`;
  private CONTENT_DETAILS_URL = `&contentDetails`;
  private STATISTICS_URL = `&statistics`;
  private MAX_RESULTS_URL = `&maxResults=`;
  private QUERY_URL = `&q=`;
  private ID_URL = `&id=`;
  private TYPE_VIDEO_URL = `&type=video`;
  private API_KEY_URL = `&key=`;

  public getVideos(search: string, numOfResults: number): Observable<any> {
    return this.http.get<any>(`${this.YOUTUBE_BASE_URL + this.SEARCH_URL + this.SNIPPET_URL + this.QUERY_URL + search +
      this.MAX_RESULTS_URL + numOfResults + this.TYPE_VIDEO_URL + this.API_KEY_URL + this.API_KEY}`);
  }

  public getVideoData(videoId: string): Observable<any> {
    return this.http.get<any>(`${this.YOUTUBE_BASE_URL + this.VIDEOS_URL + this.SNIPPET_URL + this.CONTENT_DETAILS_URL
      + this.STATISTICS_URL + this.ID_URL + videoId + this.API_KEY_URL + this.API_KEY}`);
  }

}
