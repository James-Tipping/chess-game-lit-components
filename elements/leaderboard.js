var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BackButtonSvg, WhiteKingSvg } from './svgs';
;
;
let Leaderboard = class Leaderboard extends LitElement {
    constructor() {
        super();
        this.players = [];
        this.fetchData();
        this.matchData = undefined;
    }
    async fetchData() {
        const response = await fetch('https://api.chess.com/pub/tournament/late-titled-tuesday-blitz-january-31-2023-3732262/11/1');
        console.log(`response = ${response}`);
        if (!response.ok) {
            throw new Error('Network error from API');
        }
        this.data = await response.json();
        console.log(`this.data = ${this.data}`);
        this.sortData();
        console.log(`this.players = ${this.players}`);
    }
    sortData() {
        this.players = this.data.players;
        this.players.sort((a, b) => {
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
    }
    handleMatchRequest(e) {
        this.matchData = this.data.games.filter((game) => e.detail.name === game.white.username || game.black.username)[0];
    }
    handleBackButtonClick() {
        this.matchData = undefined;
    }
    getTournamentHtml() {
        return html `
      <div @match-requested=${this.handleMatchRequest}>
        <h3 class="title">Leaderboard</h3>
        ${this.players.map(player => {
            return html `
            <person-details .playerData="${player}"></person-details>
          `;
        })}
      </div>
    `;
    }
    getGameHtml() {
        var _a, _b, _c;
        return html `
      <div>
        <button @button=${this.handleBackButtonClick}>
          ${BackButtonSvg}
        </button>
        <div>
          ${WhiteKingSvg}
          <p>${(_a = this.matchData) === null || _a === void 0 ? void 0 : _a.white.username}</p>
          <p>${(_b = this.matchData) === null || _b === void 0 ? void 0 : _b.white.result}</p>
          <p>${(_c = this.matchData) === null || _c === void 0 ? void 0 : _c.white.rating}</p>
        </div>
      </div>
    `;
    }
    render() {
        return this.matchData ? this.getGameHtml() : this.getTournamentHtml();
    }
};
__decorate([
    property({ type: Object })
], Leaderboard.prototype, "data", void 0);
__decorate([
    property({ type: Array })
], Leaderboard.prototype, "players", void 0);
__decorate([
    state()
], Leaderboard.prototype, "matchData", void 0);
Leaderboard = __decorate([
    customElement('leader-dashboard')
], Leaderboard);
export { Leaderboard };
//# sourceMappingURL=leaderboard.js.map