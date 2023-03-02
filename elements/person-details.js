var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from "lit";
import { property, customElement } from "lit/decorators.js";
let Person = class Person extends LitElement {
    constructor() {
        super(...arguments);
        this.dataComponent = () => {
            if (this.playerData.username) {
                return html `
        ${this.playerData.is_winner === true ? html `<img src="/winner.png">` : nothing}
        <div class="user-data">
          <p>${this.playerData.username}</p>
          <p>Score: <b>${this.playerData.points}</b></p>
        </div>
      `;
            }
            else {
                return nothing;
            }
        };
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
        return html `
      <div class="person" @click=${this.handleClick}>
        ${this.dataComponent()}
      </div>
    `;
    }
};
Person.styles = css `
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
__decorate([
    property({ type: Object })
], Person.prototype, "playerData", void 0);
Person = __decorate([
    customElement('person-details')
], Person);
export { Person };
//# sourceMappingURL=person-details.js.map