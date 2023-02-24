import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";

export interface PlayerType {
  username: string,
  points: number,
  is_winner: boolean
};

@customElement('person-details')
export class Person extends LitElement {

  @property({ type: Object })
  playerData!: PlayerType;

  dataComponent = () => {
    if (this.playerData.username) {
      return html`
      <p>${this.playerData.username}</p>
      <p>${this.playerData.points}</p>
      ${this.playerData.is_winner === true ? html`<img src="./winner.png">` : null}
      `;
    } else {
      return null
    }
  }

  handleClick() {
    console.log("handleClick");
    this.dispatchEvent(new CustomEvent('match-requested', {
      detail: {
        name: this.playerData.username
      }
    }));
  }


  render() {
    return html`
      <div>
        <button @click=${this.handleClick}>
        ${this.dataComponent()}
        </button>
      </div>
    `;
  }
}