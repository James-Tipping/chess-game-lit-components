var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { router } from "../main";
import { Router } from "@vaadin/router";
import { html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
let MatchController = class MatchController extends LitElement {
    connectedCallback() {
        super.connectedCallback();
        const location = router.location;
        this.matchId = location.params.id.toString();
    }
    goBackHandler() {
        Router.go(router.urlForPath('/'));
    }
    render() {
        return html `
      <match-view @go-back=${this.goBackHandler}
        .matchId=${this.matchId}>
      </match-view>
    `;
    }
};
__decorate([
    property()
], MatchController.prototype, "matchId", void 0);
MatchController = __decorate([
    customElement('match-route-controller')
], MatchController);
export { MatchController };
//# sourceMappingURL=match-route-controller.js.map