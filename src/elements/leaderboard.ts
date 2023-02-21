import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface playerType {
  'username': string,
  'points': number,
  'is_winner': boolean
};

@customElement('leader-dashboard')
export class Leaderboard extends LitElement {

  @property({ type: Object })
  data!: {
    'games': [],
    'players': [{
      'username': string,
      'points': number,
      'is_winner': boolean
    }]
  };

  @property({ type: Array })
  players: Array<playerType> = [];

  constructor() {
    super();
    this.players = [] as Array<playerType>;
    this.fetchData();
  }

  async fetchData() {
    const response = await fetch('https://api.chess.com/pub/tournament/late-titled-tuesday-blitz-january-31-2023-3732262/11/1');
    console.log(`response = ${response}`);
    if (!response.ok) {
      throw new Error('Network error from API');
    }
    // const data = await response.json();
    this.data = await response.json();
    console.log(`this.data = ${this.data}`);
    await this.sortData();
    console.log(`this.players = ${this.players}`)
  }

  async sortData() {
    this.players = this.data.players;
    this.players.sort((a, b) => {
      if (a.is_winner === true && b.is_winner === true) return 1
      if (b.is_winner === true && a.is_winner === false) return -1
      if (a.points > b.points) return 1
      if (a.points < b.points) return -1
      else return 0
    })
  }

  render() {
    return html`
      <div>
        <h3 class="title">Leaderboard</h3>
        ${this.players.map(player => {
          return html`
            <person-details .player=${player}></person-details>
          `
        })}
      </div>
    `
  }
}