var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { ErrorSvg } from "./svgs";
let Modal = class Modal extends LitElement {
    constructor() {
        super();
        this.username = "";
        console.log(`username is: ${this.username}`);
    }
    closeModal2() {
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
        return html `
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
};
Modal.styles = css `
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
__decorate([
    property()
], Modal.prototype, "username", void 0);
Modal = __decorate([
    customElement("no-data-modal")
], Modal);
export { Modal };
//# sourceMappingURL=modal.js.map