var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { property, customElement } from "lit/decorators.js";
let Person = class Person extends LitElement {
    constructor() {
        super(...arguments);
        // firstUpdated() {
        //   this.requestUpdate();
        // }
        this.dataComponent = () => {
            if (this.playerData.username) {
                return html `
      <p>${this.playerData.username}</p>
      <p>${this.playerData.points}</p>
      ${this.playerData.is_winner === true ? html `<img src="./winner.png">` : null}
      `;
            }
            else {
                return null;
            }
        };
        //<a target="_blank" href="https://icons8.com/icon/33486/gold-medal">Gold Medal</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    }
    render() {
        return html `
      <div>
        ${this.dataComponent()}
      </div>
    `;
    }
};
__decorate([
    property({ type: Object })
], Person.prototype, "playerData", void 0);
Person = __decorate([
    customElement('person-details')
], Person);
export { Person };
//# sourceMappingURL=person.js.map