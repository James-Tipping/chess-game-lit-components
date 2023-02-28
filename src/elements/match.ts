import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { router } from "../main";
import { styleMap } from "lit/directives/style-map.js";
import { WhiteKingSvg, BlackKingSvg, BackButtonSvg } from "./svgs";

export interface MatchType {
  white: {
    username: string;
    rating: number;
    result: string;
  };
  black: {
    username: string;
    rating: number;
    result: string;
  };
}

@customElement('match-view')
export class MatchView extends LitElement {

  @property()
  matchData: MatchType | undefined;

  @property({ type: Object })
  location = router.location;

  handleBackButtonClick() {
    router.render(router.urlForPath('/'));
  }

  render() {
    const whiteStyles = { color: this.matchData?.white.result === 'win' ? 'blue' : 'red'}
    const blackStyles = { color: this.matchData?.black.result === 'win' ? 'blue' : 'red'}
    return html`
      <div class="header">
        <button @click=${this.handleBackButtonClick}>${BackButtonSvg}</button>
        <h3 class="title">Match Details</h3>
      </div>
          <div class="grid-container">
            <div class="chess-piece-svg">${WhiteKingSvg}</div>
            <div class="user-data" style=${styleMap(whiteStyles)}>
              <p><b>${this.matchData?.white.username}</b></p>
              <p>${this.matchData?.white.result.toUpperCase()}</p>
              <p>Rating: ${this.matchData?.white.rating}</p>
            </div>
            <div class="user-data" style=${styleMap(blackStyles)}>
              <p><b>${this.matchData?.black.username}</b></p>
              <p>${this.matchData?.black.result.toUpperCase()}</p>
              <p>Rating: ${this.matchData?.black.rating}</p>
            </div>
            <div class="chess-piece-svg">${BlackKingSvg}</div>
          </div>
        </div>
      </div>
      `;

  }

}