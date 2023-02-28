import { LitElement, html, css, nothing } from "lit";
import { property, customElement } from "lit/decorators.js";

export interface PlayerType {
  username: string,
  points: number,
  is_winner: boolean
};

@customElement('person-details')
export class Person extends LitElement {

  static styles = css`
    .person {
      background-color: var(--dark-purple-custom);
      border-radius: 1rem;
      border-color: var(--pink-custom);
      border-width: 0.1rem;
      border-style: solid;
      margin: 0 0 2rem 0;
      padding: 0 1rem;
      color: white;
    }
    .person:hover {
      background-color: var(--hover-purple-custom);
      cursor: pointer;
    }
    .user-data {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  `;

  @property({ type: Object })
  playerData!: PlayerType;

  dataComponent = () => {
    if (this.playerData.username) {
      return html`
        ${this.playerData.is_winner === true ? html`<img src="./winner.png">` : nothing}
        <div class="user-data">
          <p>${this.playerData.username}</p>
          <p>Score: <b>${this.playerData.points}</b></p>
        </div>
      `;
    } else {
      return nothing
    }
  }


  handleClick() {
    console.log("handleClick");
    this.dispatchEvent(new CustomEvent('match-requested', {
      detail: {
        name: this.playerData.username
      },
      bubbles: true
    }));
  }


  render() {
    return html`
      <div class="person" @click=${this.handleClick}>
        ${this.dataComponent()}
      </div>
    `;
  }
}