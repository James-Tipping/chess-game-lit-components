var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { router } from "../main";
import { styleMap } from "lit/directives/style-map.js";
import { WhiteKingSvg, BlackKingSvg, BackButtonSvg } from "./svgs";
import { DataStore } from "./DataStore";
import { Router } from "@vaadin/router";
let MatchView = class MatchView extends LitElement {
    constructor() {
        super();
        this.location = router.location;
        this.text = `
    WIN: The player won by any method \n
    RESIGNED: The player lost by choosing to forfeit \n
    CHECKMATED: The player lost due to being checkmated \n
    TIMEOUT: The player lost due to running out of time \n
  `;
        this.dataStoreInstance = DataStore.getInstance();
        this.dataStoreInstance.getData();
    }
    async connectedCallback() {
        super.connectedCallback();
        this.location = router.location;
        this.matchData = await this.dataStoreInstance.getMatchFromId(this.location.params.id.toString());
    }
    handleBackButtonClick() {
        Router.go(router.urlForPath("/"));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const whiteStyles = {
            color: ((_a = this.matchData) === null || _a === void 0 ? void 0 : _a.white.result) === "win" ? "blue" : "red",
        };
        const blackStyles = {
            color: ((_b = this.matchData) === null || _b === void 0 ? void 0 : _b.black.result) === "win" ? "blue" : "red",
        };
        return html `
      <div class="header">
        <button @click=${this.handleBackButtonClick}>${BackButtonSvg}</button>
        <h3 class="title">Match Details</h3>
      </div>
          <div class="grid-container">
            <div class="chess-piece-svg">${WhiteKingSvg}</div>
            <div class="user-data" style=${styleMap(whiteStyles)}>
              <p><b>${(_c = this.matchData) === null || _c === void 0 ? void 0 : _c.white.username}</b></p>
              <p>${(_d = this.matchData) === null || _d === void 0 ? void 0 : _d.white.result.toUpperCase()}
              <vaadin-icon id="tooltip-icon1" icon="vaadin:info-circle"></vaadin-icon>
              <vaadin-tooltip for="tooltip-icon1" slot="tooltip" text=${this.text}></vaadin-tooltip>
              </p>
              <p>Rating: ${(_e = this.matchData) === null || _e === void 0 ? void 0 : _e.white.rating}</p>
            </div>
            <div class="user-data" style=${styleMap(blackStyles)}>
              <p><b>${(_f = this.matchData) === null || _f === void 0 ? void 0 : _f.black.username}</b></p>
              <p><span>
                ${(_g = this.matchData) === null || _g === void 0 ? void 0 : _g.black.result.toUpperCase()}
                <vaadin-icon id="tooltip-icon2" icon="vaadin:info-circle"></vaadin-icon>
                <vaadin-tooltip for="tooltip-icon2" slot="tooltip" text=${this.text}></vaadin-tooltip>
                </span>
              </p>
              <p>Rating: ${(_h = this.matchData) === null || _h === void 0 ? void 0 : _h.black.rating}</p>
            </div>
            <div class="chess-piece-svg">${BlackKingSvg}</div>
          </div>
        </div>
      </div>
      `;
    }
};
MatchView.styles = css `
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
    .user-data {
      display: inline-block;
    }
    svg {
      height: 5rem;
      width: auto;
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
__decorate([
    state()
], MatchView.prototype, "matchData", void 0);
__decorate([
    state()
], MatchView.prototype, "dataStoreInstance", void 0);
__decorate([
    property({ type: Object })
], MatchView.prototype, "location", void 0);
MatchView = __decorate([
    customElement("match-view")
], MatchView);
export { MatchView };
//# sourceMappingURL=match.js.map