var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DataStore } from "./DataStore";
import { router } from "../main";
import { Router } from '@vaadin/router';
let Leaderboard = class Leaderboard extends LitElement {
    constructor() {
        super();
        this.errorMessage = {
            showErrorMessage: false,
            message: ''
        };
        this.dataStoreInstance = DataStore.getInstance();
        this.name = "";
    }
    async connectedCallback() {
        super.connectedCallback();
        await this.dataStoreInstance.getData();
        this.players = await this.dataStoreInstance.getPlayersDetails();
    }
    async handleMatchRequest(e) {
        const name = e.detail.name;
        try {
            const matchId = await this.dataStoreInstance.getMatchIdFromUsername(name);
            Router.go(router.urlForPath(`/match${matchId}`));
        }
        catch (error) {
            console.log('error handled');
            this.handleNoMatchError(error);
        }
    }
    handleNoMatchError(error) {
        this.errorMessage = {
            showErrorMessage: true,
            message: error.message
        };
        const timeout = setTimeout(this.removeMatchError, 3000);
    }
    removeMatchError() {
        this.errorMessage = {
            showErrorMessage: false,
            message: ''
        };
    }
    async handleInputChange(e) {
        this.name = e.target.value;
        this.players = await this.dataStoreInstance.getPlayersDetails(this.name);
    }
    render() {
        var _a;
        return html `
      <div class="leaderboard" @match-requested=${this.handleMatchRequest}>
        <h3 class="title">Leaderboard</h3>
        <input
          .value=${this.name}
          @input=${this.handleInputChange}
          placeholder="Search for a username"
        />
        ${this.errorMessage.showErrorMessage ? html `<error-view .message=${this.errorMessage.message}></error-view>` : nothing}
        <div class="scrollable-leaderboard-div">
          ${(_a = this.players) === null || _a === void 0 ? void 0 : _a.map((player) => {
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
};
Leaderboard.styles = css `
    .leaderboard {
      width: 50%;
      margin: auto;
    }
    .title {
      font-size: 3rem;
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
      /* display: none; */
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollable-leaderboard-div::-webkit-scrollbar {
      display: none;
    }
    svg {
      height: 5rem;
      width: auto;
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
], Leaderboard.prototype, "dataStoreInstance", void 0);
__decorate([
    property()
], Leaderboard.prototype, "name", void 0);
__decorate([
    state()
], Leaderboard.prototype, "errorMessage", void 0);
Leaderboard = __decorate([
    customElement("leader-dashboard")
], Leaderboard);
export { Leaderboard };
//# sourceMappingURL=leaderboard.js.map