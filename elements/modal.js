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
    handleClickOffModal(e) {
        this.username = "";
        this.dispatchEvent(new CustomEvent("click-off-modal", {
            detail: {
                clickOffModal: true,
            },
        }));
    }
    render() {
        const styles = { display: this.username.length > 1 ? "block" : "none" };
        return html `
      <div class="modal-container" style=${styleMap(styles)}>
        <div className="modal-content">
          ${ErrorSvg}
          <p>Sorry, there is no data for "${this.username} available"</p>
        </div>
      </div>
    `;
    }
};
Modal.styles = css `
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
__decorate([
    property()
], Modal.prototype, "username", void 0);
Modal = __decorate([
    customElement("no-data-modal")
], Modal);
export { Modal };
//# sourceMappingURL=modal.js.map