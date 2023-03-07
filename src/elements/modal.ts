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
    this.username = "";
    console.log(`username is: ${this.username}`);
  }

  private closeModal2() {
    console.log('Close modal 2');
    this.dispatchEvent(new CustomEvent("close-modal"));
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.username) {
      document.addEventListener("click", this.closeModal2);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.closeModal2);
  }

  // handleClickOffModal() {
  //   this.username = "";
  //   this.dispatchEvent(
  //     new CustomEvent("close-modal", {
  //       detail: {
  //         clickOffModal: true,
  //       },
  //     })
  //   );
  // }

  // closeModal() {
  //   this.dispatchEvent(new CustomEvent("close-modal"));
  // }

  render() {
    console.log(this.username);
    const styles = { display: this.username.length > 1 ? "block" : "none" };
    return html`
      <div
        class="modal-container"
        style=${styleMap(styles)}
      >
        <div className="modal-content">
          ${ErrorSvg}
          <p>Sorry, there is no data for user "${this.username}"" available</p>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background-color: #fff;
      padding: 1rem;
      border-radius: 0.25rem;
    }
    svg {
      height: 3rem;
      width: auto;
    }
  `;
}
