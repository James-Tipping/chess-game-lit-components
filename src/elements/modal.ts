import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { ErrorSvg } from "./svgs";

@customElement("no-data-modal")
export class Modal extends LitElement {
  @property()
  username!: string;

  constructor() {
    super();
    // this.username is the username of the player who has no match data
    this.username = "";
  }

  closeModal(e: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent("close-modal", {
        bubbles: true,
      })
    );
  }

  render() {
    return html`
      <div class="background" @click=${this.closeModal}></div>
      <div class="modal-container">
        <div class="modal-content">
          ${ErrorSvg}
          <p>Sorry, there is no data for user "${this.username}" available</p>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .background {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
    }
    .modal-container {
      z-index: 2;
      background-color: white;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 1rem;
      border: 0.1rem solid black;
      padding: 1rem;
    }
    /* .modal-content {
      background-color: #fff;
      padding: 1rem;
      border-radius: 0.25rem;
    } */
    svg {
      height: 3rem;
      width: auto;
    }
  `;
}
