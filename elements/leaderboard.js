var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { BackButtonSvg, WhiteKingSvg, BlackKingSvg } from "./svgs";
import { styleMap } from 'lit/directives/style-map.js';
let Leaderboard = class Leaderboard extends LitElement {
    constructor() {
        super();
        this.players = [];
        this.fetchData();
        this.matchData = undefined;
        this.name = "";
    }
    async fetchData() {
        const response = await fetch("https://api.chess.com/pub/tournament/late-titled-tuesday-blitz-january-31-2023-3732262/11/1");
        console.log(`response = ${response}`);
        if (!response.ok) {
            throw new Error("Network error from API");
        }
        this.data = await response.json();
        this.sortData();
    }
    sortData() {
        this.data.players.sort((a, b) => {
            if (a.is_winner === true && b.is_winner === false)
                return -1;
            if (b.is_winner === true && a.is_winner === false)
                return 1;
            if (a.points > b.points)
                return -1;
            if (a.points < b.points)
                return 1;
            else
                return 0;
        });
        this.players = this.data.players;
    }
    handleMatchRequest(e) {
        // console.log("Second handleclick fctn");
        // console.log(e);
        this.matchData = this.data.games.filter((game) => e.detail.name === game.white.username || game.black.username)[0];
    }
    handleBackButtonClick() {
        console.log("back button clicked");
        this.matchData = undefined;
        // this.requestUpdate();
    }
    handleInputChange(e) {
        this.name = e.target.value;
        this.players = this.data.players.filter((player) => player.username.includes(this.name));
    }
    getTournamentHtml() {
        return html `
      <div class="leaderboard" @match-requested=${this.handleMatchRequest}>
        <h3 class="title">Leaderboard</h3>
        <input
          .value=${this.name}
          @input=${this.handleInputChange}
          placeholder="Search for a username"
        />
        <div class="scrollable-leaderboard-div">
          ${this.players.map((player) => {
            return html `
              <person-details
                class="player-container"
                .playerData=${player}
              ></person-details>
            `;
        })}
        </div>
      </div>
    `;
    }
    getGameHtml() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const whiteStyles = { color: ((_a = this.matchData) === null || _a === void 0 ? void 0 : _a.white.result) === 'win' ? 'blue' : 'red' };
        const blackStyles = { color: ((_b = this.matchData) === null || _b === void 0 ? void 0 : _b.black.result) === 'win' ? 'blue' : 'red' };
        return html `
      <div class="header">
        <button @click=${this.handleBackButtonClick}>${BackButtonSvg}</button>
        <h3 class="title">Match Details</h3>
      </div>
          <div class="grid-container">
            <div class="chess-piece-svg">${WhiteKingSvg}</div>
            <div class="user-data" style=${styleMap(whiteStyles)}>
              <p><b>${(_c = this.matchData) === null || _c === void 0 ? void 0 : _c.white.username}</b></p>
              <p>${(_d = this.matchData) === null || _d === void 0 ? void 0 : _d.white.result.toUpperCase()}</p>
              <p>Rating: ${(_e = this.matchData) === null || _e === void 0 ? void 0 : _e.white.rating}</p>
            </div>
            <div class="user-data" style=${styleMap(blackStyles)}>
              <p><b>${(_f = this.matchData) === null || _f === void 0 ? void 0 : _f.black.username}</b></p>
              <p>${(_g = this.matchData) === null || _g === void 0 ? void 0 : _g.black.result.toUpperCase()}</p>
              <p>Rating: ${(_h = this.matchData) === null || _h === void 0 ? void 0 : _h.black.rating}</p>
            </div>
            <div class="chess-piece-svg">${BlackKingSvg}</div>
          </div>
        </div>
      </div>
    `;
    }
    render() {
        return this.matchData ? this.getGameHtml() : this.getTournamentHtml();
    }
};
Leaderboard.styles = css `
    .leaderboard {
      width: 50%;
      margin: auto;
    }
    .title {
      font-size: 3rem;
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
    .header {
      margin-bottom: 2rem;
    }
    .header * {
      display: inline;
    }
    input {
      font-family: "Poppins", sans-serif;
      width: 80%;
      border-radius: 0.5rem;
      color: var(--pink-custom);
    }
    input:focus {
      border-color: var(--pink-custom);
      border-style: solid;
      outline: none;
    }
    .scrollable-leaderboard-div {
      margin-top: 3rem;
      overflow-y: auto;
      max-height: 70vh;
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
    .username {

    }
    .win {
      color: red
    }
    .lose {
      color: blue;
    }
  `;
__decorate([
    property({ type: Object })
], Leaderboard.prototype, "data", void 0);
__decorate([
    property({ type: Array })
], Leaderboard.prototype, "players", void 0);
__decorate([
    state()
], Leaderboard.prototype, "matchData", void 0);
__decorate([
    property()
], Leaderboard.prototype, "name", void 0);
Leaderboard = __decorate([
    customElement("leader-dashboard")
], Leaderboard);
export { Leaderboard };
//# sourceMappingURL=leaderboard.js.map