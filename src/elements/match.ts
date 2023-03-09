import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { router } from "../main";
import { styleMap } from "lit/directives/style-map.js";
import { WhiteKingSvg, BlackKingSvg, BackButtonSvg } from "./svgs";
import { DataStore, MatchType } from "./DataStore";
import { Router } from "@vaadin/router";

@customElement("match-view")
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
    this.matchData = await this.dataStoreInstance.getMatchFromId(
      this.location.params.id.toString()
    );
  }

  handleBackButtonClick() {
    Router.go(router.urlForPath("/"));
  }

  text = `
    WIN: The player won by any method \n
    RESIGNED: The player lost by choosing to forfeit \n
    CHECKMATED: The player lost due to being checkmated \n
    TIMEOUT: The player lost due to running out of time \n
  `;

  render() {
    const whiteStyles = {
      color: this.matchData?.white.result === "win" ? "blue" : "red",
    };
    const blackStyles = {
      color: this.matchData?.black.result === "win" ? "blue" : "red",
    };
    return html`
      <div class="header">
        <button @click=${this.handleBackButtonClick}>${BackButtonSvg}</button>
        <h3 class="title">Match Details</h3>
      </div>
          <div class="grid-container">
            <div class="chess-piece-svg">${WhiteKingSvg}</div>
            <div class="user-data" style=${styleMap(whiteStyles)}>
              <p><b>${this.matchData?.white.username}</b></p>
              <p><span>${this.matchData?.white.result.toUpperCase()}
              <vaadin-icon id="tooltip-icon1" icon="vaadin:info-circle"></vaadin-icon>
              <vaadin-tooltip for="tooltip-icon1" slot="tooltip" text=${this.text}></vaadin-tooltip>
              </span></p>
              <p>Rating: ${this.matchData?.white.rating}</p>
            </div>
            <div class="user-data" style=${styleMap(blackStyles)}>
              <p><b>${this.matchData?.black.username}</b></p>
              <p><span>
                ${this.matchData?.black.result.toUpperCase()}
                <vaadin-icon id="tooltip-icon2" icon="vaadin:info-circle"></vaadin-icon>
                <vaadin-tooltip for="tooltip-icon2" slot="tooltip" text=${this.text}></vaadin-tooltip>
                </span>
              </p>
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
      min-width: 60vw;
    }
    .chess-piece-svg {
      margin: auto;
    }
    .user-data {
      display: inline-block;
    }
    svg {
      height: 5rem;
      width: auto;
    }
    vaadin-icon {
      height: 1rem;
      width: auto;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span > * {
      margin: 0 0.2rem;
    }
    /* vaadin-icon {
      display: inline-block;
      height: 3.5rem;
      width: auto;
      color: white;
    } */
    /* vaadin-tooltip-overlay::part() {
      white-space: pre-line;
    } */
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
