import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { router } from "../main";
import { styleMap } from "lit/directives/style-map.js";
import { WhiteKingSvg, BlackKingSvg, BackButtonSvg } from "./svgs";
import { DataStore, MatchType } from "./DataStore";
import { Router } from "@vaadin/router";

@customElement('match-view')
export class MatchView extends LitElement {

  @state()
  private matchData: MatchType | undefined;

  @state()
  private dataStoreInstance: DataStore;

  @property({ type: Object })
  location = router.location;

  constructor() {
    super();
    this.dataStoreInstance = DataStore.getInstance();
    this.dataStoreInstance.getData();
  }

  async connectedCallback() {
    super.connectedCallback();
    this.location = router.location;
    this.matchData = await this.dataStoreInstance.getMatchFromId(this.location.params.id.toString());
  }

  handleBackButtonClick() {
    Router.go(router.urlForPath('/'));
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

  static styles = css`
    .header {
      margin-bottom: 2rem;
    }
    .header * {
      display: inline;
    }
    .title {
      font-size: 3rem;
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1rem;
      border: 0.2rem solid rgb(183, 68, 184);
      background-color: white;
      border-radius: 1rem;
    }
    .chess-piece-svg {
      margin: auto;
    }
    svg {
      height: 5rem;
      width: auto;
    }
    button {
      background-color: transparent;
      outline: none;
      border: none;
      text-align: start;
    }
    button svg {
      height: 2rem;
      width: auto;
    }
    button svg:hover {
      fill: gray;
    }
  `;

}