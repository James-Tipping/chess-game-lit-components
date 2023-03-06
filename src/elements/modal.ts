import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { ErrorSvg } from "./svgs";

@customElement("no-data-modal")
export class Modal extends LitElement {
  @property()
  username!: string;

  static styles = css`
    .modal-container {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(0, 0, 0, 0.4);
    }
    .modal-content {
      margin: auto;
      padding: 1rem;
      width: 50%;
      height: auto;
    }
  `;

  handleClickOffModal(e: Event) {
    this.username = "";
    this.dispatchEvent(
      new CustomEvent("click-off-modal", {
        detail: {
          clickOffModal: true,
        },
      })
    );
  }

  render() {
    const styles = { display: this.username.length > 1 ? "block" : "none" };
    return html`
      <div class="modal-container" style=${styleMap(styles)}>
        <div className="modal-content">
          ${ErrorSvg}
          <p>Sorry, there is no data for "${this.username} available"</p>
        </div>
      </div>
    `;
  }
}
