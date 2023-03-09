var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ErrorSvg } from "./svgs";
let Modal = class Modal extends LitElement {
    constructor() {
        super();
        // this.username is the username of the player who has no match data
        this.username = "";
        console.log(`username is: ${this.username}`);
    }
    // private closeModal2(e: Event) {
    //   console.log('Close modal 2');
    //   console.log(`Event is: ${e.target}`);
    //   this.dispatchEvent(new CustomEvent("close-modal", {
    //     detail: 'Close modal',
    //     bubbles: true
    //   }));
    // }
    // callbacks add an event listener to the document for all clicks
    // These are then directed to this.closeModal, which assessed whether clicks were inside or outside of the modal.
    // connectedCallback() {
    //   super.connectedCallback();
    //   if (this.username) {
    //     // this.addEventListener("click", this.closeModal);
    //     document.addEventListener("click", this.closeModal);
    //   }
    // }
    // disconnectedCallback() {
    //   super.disconnectedCallback();
    //   // this.removeEventListener("click", this.closeModal);
    //   document.removeEventListener("click", this.closeModal);
    // }
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
    // If mouse click occurs outside modal, customEvent created which bubbles up.
    // This seems to function correctly up to line 60, as I can't find the right thing to equate it to, to check the element that was clicked on
    // It also seems to be called when the modal first appears
    closeModal(e) {
        console.log("Close model called");
        console.log(`Event is ${e.target.nodeValue}`);
        console.log("Event dispatched");
        this.dispatchEvent(new CustomEvent("close-modal", {
            bubbles: true,
        }));
    }
    // Prevents event propagating if the click occurs inside the modal area. There seems to be an automatic event on every mouse click within the app.
    // clickInside(e: Event) {
    //   e.stopPropagation();
    //   console.log('Click inside');
    // }
    render() {
        return html `
      <div class="background" @click=${this.closeModal}></div>
      <div class="modal-container">
        <div class="modal-content">
          ${ErrorSvg}
          <p>Sorry, there is no data for user "${this.username}" available</p>
        </div>
      </div>
    `;
    }
};
Modal.styles = css `
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
__decorate([
    property()
], Modal.prototype, "username", void 0);
Modal = __decorate([
    customElement("no-data-modal")
], Modal);
export { Modal };
//# sourceMappingURL=modal.js.map