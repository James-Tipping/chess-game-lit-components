import { router } from "../main";
import { Router, RouterLocation } from "@vaadin/router";
import { html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement('match-route-controller')
export class MatchController extends LitElement {

  @property()
  private matchId!: string;

  connectedCallback() {
    super.connectedCallback();
    const location: RouterLocation = router.location;
    this.matchId = location.params.id.toString();
  }

  goBackHandler() {
    Router.go(router.urlForPath('/'));
  }

  render() {
    return html`
      <match-view @go-back=${this.goBackHandler}
        .matchId=${this.matchId}>
      </match-view>
    `;
  }

}