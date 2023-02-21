var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Leaderboard = class Leaderboard extends LitElement {
    constructor() {
        super();
        this.fetchData();
        this.sortData();
    }
    fetchData() {
        fetch('https://api.chess.com/pub/tournament/late-titled-tuesday-blitz-january-31-2023-3732262/11/1')
            .then(response => {
            if (!response.ok) {
                throw new Error('Network error from API');
            }
            return response.json();
        })
            .then(data => {
            console.log(`Success! Data = ${this.data}`);
            this.data = data;
        })
            .catch(error => console.log(error));
    }
    sortData() {
        this.players = this.data.players;
        this.players.sort((a, b) => {
            if (a.is_winner === true && b.is_winner === true)
                return 1;
            if (b.is_winner === true && a.is_winner === false)
                return -1;
            if (a.points > b.points)
                return 1;
            if (a.points < b.points)
                return -1;
            else
                return 0;
        });
    }
    render() {
        return html `
      <div>
        <h3 class="title">Leaderboard</h3>
        
      </div>
    `;
    }
};
__decorate([
    property({ type: Object })
], Leaderboard.prototype, "data", void 0);
__decorate([
    property({ type: Array })
], Leaderboard.prototype, "players", void 0);
Leaderboard = __decorate([
    customElement('leaderboard')
], Leaderboard);
export { Leaderboard };
//# sourceMappingURL=leaderboard.js.map