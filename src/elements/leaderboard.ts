import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { BackButtonSvg, WhiteKingSvg, BlackKingSvg } from "./svgs";
import {styleMap} from 'lit/directives/style-map.js';
// import { router } from "../main";

export interface PlayerType {
  username: string;
  points: number;
  is_winner: boolean;
}

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

export interface DataType {
  games: [
    {
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
  ];
  players: [
    {
      username: string;
      points: number;
      is_winner: boolean;
    }
  ];
}

@customElement("leader-dashboard")
export class Leaderboard extends LitElement {
  // @property({ type: Object })
  // location = router.location;

  @property({ type: Object })
  data!: DataType;

  @property({ type: Array })
  players: PlayerType[]; //= [];

  @state()
  private matchData: MatchType | undefined;

  @property()
  name: string;

  static styles = css`
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
      /* display: none; */
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollable-leaderboard-div::-webkit-scrollbar {
      display: none;
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
    .win {
      color: red
    }
    .lose {
      color: blue;
    }
  `;


  constructor() {
    super();
    this.players = [] as PlayerType[];
    this.fetchData();
    this.matchData = undefined;
    this.name = "";
  }

  async fetchData() {
    const response = await fetch(
      "https://api.chess.com/pub/tournament/late-titled-tuesday-blitz-january-31-2023-3732262/11/1"
    );
    console.log(`response = ${response}`);
    if (!response.ok) {
      throw new Error("Network error from API");
    }
    this.data = await response.json();
    this.sortData();
  }

  sortData() {
    this.data.players.sort((a, b) => {
      if (a.is_winner === true && b.is_winner === false) return -1;
      if (b.is_winner === true && a.is_winner === false) return 1;
      if (a.points > b.points) return -1;
      if (a.points < b.points) return 1;
      else return 0;
    });
    this.players = this.data.players;
  }

  handleMatchRequest(e: CustomEvent) {
    // console.log("Second handleclick fctn");
    // console.log(e);
    const name = e.detail.name as string;
    this.matchData = this.data.games.filter(
      (game) => name.toLowerCase() === game.white.username.toLowerCase() || name.toLowerCase() === game.black.username.toLowerCase()
    )[0];
    // console.log(this.data.games.filter(
    //   (game) => e.detail.name === game.white.username || game.black.username
    // ).length)
    // console.log(e.detail.name);
    // console.log(this.matchData);
  }

  handleBackButtonClick() {
    console.log("back button clicked");
    this.matchData = undefined;
    // this.requestUpdate();
  }

  handleInputChange(e: InputEvent) {
    this.name = (e.target as HTMLInputElement).value;
    this.players = this.data.players.filter((player) =>
      player.username.includes(this.name)
    );
  }

  getTournamentHtml() {
    return html`
      <div class="leaderboard" @match-requested=${this.handleMatchRequest}>
        <h3 class="title">Leaderboard</h3>
        <input
          .value=${this.name}
          @input=${this.handleInputChange}
          placeholder="Search for a username"
        />
        <div class="scrollable-leaderboard-div">
          ${this.players.map((player) => {
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

  getGameHtml() {
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

  render() {
    return this.matchData ? this.getGameHtml() : this.getTournamentHtml();
  }
}
