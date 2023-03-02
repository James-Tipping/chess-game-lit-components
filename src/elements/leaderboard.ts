import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DataStore, MatchType, PlayerType, DataType } from "./DataStore";
import { router } from "../main";
import {Router} from '@vaadin/router';

@customElement("leader-dashboard")
export class Leaderboard extends LitElement {

  @property({ type: Object })
  data!: DataType;

  @property({ type: Array })
  players!: PlayerType[]

  @state()
  private dataStoreInstance: DataStore;

  @property()
  name: string;

  @state()
  errorMessage = {
    showErrorMessage: false,
    message: ''
  };

  constructor() {
    super();
    this.dataStoreInstance = DataStore.getInstance();
    this.name = "";
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.dataStoreInstance.getData();
    this.players = await this.dataStoreInstance.getPlayersDetails();
  }

  async handleMatchRequest(e: CustomEvent) {
    const name = e.detail.name as string;
    try {
      const matchId = await this.dataStoreInstance.getMatchIdFromUsername(name);
      Router.go(router.urlForPath(`/match${matchId}`));
    } catch (error) {
      console.log('error handled');
      this.handleNoMatchError(error as Error);
    }
  }

  handleNoMatchError(error: Error) {
    this.errorMessage = {
      showErrorMessage: true,
      message: error.message
    }
    const timeout = setTimeout(this.removeMatchError, 3000);
  }

  removeMatchError() {
    this.errorMessage = {
      showErrorMessage: false,
      message: ''
    };
  }

  async handleInputChange(e: InputEvent) {
    this.name = (e.target as HTMLInputElement).value;
    this.players = await this.dataStoreInstance.getPlayersDetails(this.name);
  }

  render() {
    return html`
      <div class="leaderboard" @match-requested=${this.handleMatchRequest}>
        <h3 class="title">Leaderboard</h3>
        <input
          .value=${this.name}
          @input=${this.handleInputChange}
          placeholder="Search for a username"
        />
        ${this.errorMessage.showErrorMessage ? html`<error-view .message=${this.errorMessage.message}></error-view>` : nothing}
        <div class="scrollable-leaderboard-div">
          ${this.players?.map((player) => {
            return html`
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

  static styles = css`
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

}
