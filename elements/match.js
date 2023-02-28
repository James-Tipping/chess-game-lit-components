var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { router } from "../main";
import { styleMap } from "lit/directives/style-map.js";
import { WhiteKingSvg, BlackKingSvg, BackButtonSvg } from "./svgs";
let MatchView = class MatchView extends LitElement {
    constructor() {
        super(...arguments);
        this.location = router.location;
    }
    handleBackButtonClick() {
        router.render(router.urlForPath('/'));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const whiteStyles = { color: ((_a = this.matchData) === null || _a === void 0 ? void 0 : _a.white.result) === 'win' ? 'blue' : 'red' };
        const blackStyles = { color: ((_b = this.matchData) === null || _b === void 0 ? void 0 : _b.black.result) === 'win' ? 'blue' : 'red' };
        return html `
      <div class="header">
        <button @click=${this.handleBackButtonClick}>${BackButtonSvg}</button>
        <h3 class="title">Match Details</h3>
      </div>
          <div class="grid-container">
            <div class="chess-piece-svg">${WhiteKingSvg}</div>
            <div class="user-data" style=${styleMap(whiteStyles)}>
              <p><b>${(_c = this.matchData) === null || _c === void 0 ? void 0 : _c.white.username}</b></p>
              <p>${(_d = this.matchData) === null || _d === void 0 ? void 0 : _d.white.result.toUpperCase()}</p>
              <p>Rating: ${(_e = this.matchData) === null || _e === void 0 ? void 0 : _e.white.rating}</p>
            </div>
            <div class="user-data" style=${styleMap(blackStyles)}>
              <p><b>${(_f = this.matchData) === null || _f === void 0 ? void 0 : _f.black.username}</b></p>
              <p>${(_g = this.matchData) === null || _g === void 0 ? void 0 : _g.black.result.toUpperCase()}</p>
              <p>Rating: ${(_h = this.matchData) === null || _h === void 0 ? void 0 : _h.black.rating}</p>
            </div>
            <div class="chess-piece-svg">${BlackKingSvg}</div>
          </div>
        </div>
      </div>
      `;
    }
};
__decorate([
    property()
], MatchView.prototype, "matchData", void 0);
__decorate([
    property({ type: Object })
], MatchView.prototype, "location", void 0);
MatchView = __decorate([
    customElement('match-view')
], MatchView);
export { MatchView };
//# sourceMappingURL=match.js.map