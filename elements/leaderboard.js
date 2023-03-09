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
import { Router } from "@vaadin/router";
let Leaderboard = class Leaderboard extends LitElement {
    constructor() {
        super();
        this.dataStoreInstance = DataStore.getInstance();
        this.name = "";
        this.modalStatus = {
            isModalOpen: false,
            usernameNoMatchData: "",
        };
    }
    async connectedCallback() {
        super.connectedCallback();
        await this.dataStoreInstance.getData();
        this.players = await this.dataStoreInstance.getPlayersDetails();
        this.playerScores = await this.getPlayerScores();
    }
    async handleMatchRequest(e) {
        const name = e.detail.name;
        const matchId = await this.dataStoreInstance.getMatchIdFromUsername(name);
        if (matchId !== "None") {
            Router.go(router.urlForPath(`/match${matchId}`));
        }
        else {
            this.modalStatus = {
                isModalOpen: true,
                usernameNoMatchData: name,
            };
        }
    }
    //
    closeModal() {
        console.log("Leadberoard.ts close modal");
        this.modalStatus = {
            isModalOpen: false,
            usernameNoMatchData: "",
        };
    }
    async handleInputChange(e) {
        this.name = e.target.value;
        this.players = await this.dataStoreInstance.getPlayersDetails(this.name);
    }
    async getPlayerScores() {
        const playerScores = [...await this.dataStoreInstance.getPlayerScores()];
        return playerScores;
    }
    render() {
        var _a;
        return html `
      ${this.modalStatus.isModalOpen
            ? html ` <no-data-modal
            .username=${this.modalStatus.usernameNoMatchData}
            @close-modal=${this.closeModal}
          ></no-data-modal>`
            : nothing}
      <div class="leaderboard" @match-requested=${this.handleMatchRequest}>
        <h3 class="title">Leaderboard</h3>
        <vaadin-text-field
          .value=${this.name}
          @input=${this.handleInputChange}
          placeholder="Search Username"
          clear-button-visible
        >
          <vaadin-icon
            icon="vaadin:search"
            aria-label="search"
            slot="prefix"
            stroke="white"
          ></vaadin-icon>
        </vaadin-text-field>
        <vaadin-multi-select-combo-box .items=${this.playerScores} clear-button-visible>
          
        </vaadin-multi-select-combo-box>
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
    vaadin-text-field {
      width: 80%;
      margin: auto;
    }
    input {
      font-family: "Poppins", sans-serif;
      /* border-radius: 0.5rem; */
      /* color: var(--pink-custom); */
    }
    /* input:focus {
      border-color: var(--pink-custom);
      border-style: solid;
      outline: none;
    } */
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
    property()
], Leaderboard.prototype, "playerScores", void 0);
__decorate([
    property({ type: Array })
], Leaderboard.prototype, "players", void 0);
__decorate([
    state()
], Leaderboard.prototype, "dataStoreInstance", void 0);
__decorate([
    state()
], Leaderboard.prototype, "modalStatus", void 0);
__decorate([
    property()
], Leaderboard.prototype, "name", void 0);
Leaderboard = __decorate([
    customElement("leader-dashboard")
], Leaderboard);
export { Leaderboard };
//# sourceMappingURL=leaderboard.js.map