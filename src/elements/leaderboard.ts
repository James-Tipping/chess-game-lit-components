import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement('leaderboard')
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
  players!: [{
    'username': string,
    'points': number,
    'is_winner': boolean
  }];

  constructor() {
    super()
    this.fetchData();
    this.sortData();
  }

  fetchData() {
    fetch('https://api.chess.com/pub/tournament/late-titled-tuesday-blitz-january-31-2023-3732262/11/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error from API');
        }
        return response.json()
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
        
      </div>
    `
  }









}