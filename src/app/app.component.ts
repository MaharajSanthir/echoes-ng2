/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
// import { FORM_DIRECTIVES } from '@angular/common';
import { AppState } from './app.service';

// SERVICES
import { YoutubeSearch, YoutubePlayerService, NowPlaylistService } from './core/services';

import { EchoesState } from './core/store';
import { YoutubePlayerState, PlayerActions } from './core/store/youtube-player.ts';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { YoutubeMediaPlaylist } from './core/store/now-playlist';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  // directives: [ FORM_DIRECTIVES ],
  //   './app.style.css'
  // ],
  template: require('./app.html')
})
export class App {
  public start = true;
  public player: Observable<YoutubePlayerState>;

  constructor(
    private store: Store<EchoesState>,
    public youtubeSearch: YoutubeSearch,
    public playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService,
    private playerActions: PlayerActions
  ) {
    this.player = this.playerService.player$;
  }

  onScroll () {
    if (this.start) {
      this.start = false;
      return;
    }
    this.youtubeSearch.searchMore();
  }

  selectVideo (media: GoogleApiYouTubeVideoResource) {
    // this.playerService.playVideo(media);
    this.store.dispatch(this.playerActions.playVideo(media));
    this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  handleVideoEnded (state) {
    if (!this.isLastIndex()) {
      this.playNextVideo(state);
    }
  }

  playNextVideo (player) {
    this.nowPlaylistService.selectNextIndex();
    this.playerService.playVideo(this.nowPlaylistService.getCurrent());
  }

  sortVideo (media: GoogleApiYouTubeSearchResource) {

  }

  isLastIndex() {

  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

 // const futureApp = {
 // template: `
 // <section class="sidebar">
 //   <app-nav></app-nav>
 //   <div class="sidebar-pane">
 //     <now-playlist
 //       [playlist]="nowPlaylist"
 //       (select)="selectVideo($event)"
 //       (sort)="sortVideo($event)"
 //     ></now-playlist>
 //   </div>
 // </section>
 // <app-loader></app-loader>
 // <content-viewer></content-viewer>
 // <youtube-player
 //   id="youtube-player-container"
 //   [player]="player"
 //   (ended)="handleVideoEnded($event)"
 //   (playNext)="playNextVideo($event)"
 //   player-id="player"
 //   auto-next
 // ></youtube-player>`
 // }
