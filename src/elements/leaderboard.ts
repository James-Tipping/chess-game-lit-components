import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BackButtonSvg, WhiteKingSvg, BlackKingSvg } from './svgs';

export interface PlayerType {
  username: string,
  points: number,
  is_winner: boolean
};

export interface MatchType {
  white: {
    username: string,
    rating: number,
    result: string
  },
  black: {
    username: string,
    rating: number,
    result: string
  }
}

export interface DataType {
  games: [{
    white: {
      username: string,
      rating: number,
      result: string
    },
    black: {
      username: string,
      rating: number,
      result: string
    }
  }],
  players: [{
    username: string,
    points: number,
    is_winner: boolean
  }]
};


@customElement('leader-dashboard')
export class Leaderboard extends LitElement {

  @property({ type: Object })
  data!: DataType;

  @property({ type: Array })
  players: PlayerType[]; //= [];

  @state()
  private matchData: MatchType | undefined;

  constructor() {
    super();
    this.players = [] as PlayerType[];
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
      if (a.is_winner === true && b.is_winner === false) return -1
      if (b.is_winner === true && a.is_winner === false) return 1
      if (a.points > b.points) return -1
      if (a.points < b.points) return 1
      else return 0
    })
  }

  handleMatchRequest(e: CustomEvent) {
    console.log("Second handleclick fctn");
    console.log(e);
    this.matchData = this.data.games.filter((game) => e.detail.name === game.white.username || game.black.username)[0];
  }

  handleBackButtonClick() {
    this.matchData = undefined;
  }

  getTournamentHtml() {
    return html`
      <div @match-requested=${this.handleMatchRequest}>
        <h3 class="title">Leaderboard</h3>
        ${this.players.map(player => {
      return html`
            <person-details .playerData="${player}"></person-details>
          `;
    })}
      </div>
    `
  }

  getGameHtml() {
    return html`
      <div>
        <button @button=${this.handleBackButtonClick}>
          ${BackButtonSvg}
        </button>
        <div>
          ${WhiteKingSvg}
          <p>${this.matchData?.white.username}</p>
          <p>${this.matchData?.white.result}</p>
          <p>${this.matchData?.white.rating}</p>
        </div>
      </div>
    `
  }


  render() {
    return this.matchData ? this.getGameHtml() : this.getTournamentHtml()
  }
}