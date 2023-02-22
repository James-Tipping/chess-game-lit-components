import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement('person-details')
export class Person extends LitElement {

  @property({ type: Object })
  playerData!: {
    'username': string,
    'points': number,
    'is_winner': boolean
  };

  // firstUpdated() {
  //   this.requestUpdate();
  // }

  dataComponent = () => {
    if(this.playerData.username) {
      return html `
      <p>${this.playerData.username}</p>
      <p>${this.playerData.points}</p>
      ${this.playerData.is_winner === true ? html`<img src="./winner.png">` : null}
      `;
    } else {
      return null
    }
  }
  

  render() {
    return html`
      <div>
        ${this.dataComponent()}
      </div>
    `;
  }

  //<a target="_blank" href="https://icons8.com/icon/33486/gold-medal">Gold Medal</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

}