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
  connectedCallback() {
    super.connectedCallback();
    if (this.username) {
      // this.addEventListener("click", this.closeModal);
      document.addEventListener("click", this.closeModal);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // this.removeEventListener("click", this.closeModal);
    document.removeEventListener("click", this.closeModal);
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

  // If mouse click occurs outside modal, customEvent created which bubbles up.
  // This seems to function correctly up to line 60, as I can't find the right thing to equate it to, to check the element that was clicked on
  // It also seems to be called when the modal first appears
  closeModal(e: MouseEvent) {
    console.log('Close model called');
    console.log(`Event is ${(e.target as HTMLElement).nodeValue}`)
    if ((e.target as HTMLElement) === this) { //also tried if ((e.target as HTMLElement).innerText / .nodeValue === 'leader-dashboard')
      console.log('Event dispatched');
      this.dispatchEvent(
        new CustomEvent("close-modal", {
          bubbles: true,
        })
      );
    }
  }

  // Prevents event propagating if the click occurs inside the modal area. There seems to be an automatic event on every mouse click within the app.
  clickInside(e: Event) {
    e.stopPropagation();
    console.log('Click inside');
  }

  render() {
    return html`
      <div class="modal-container">
        <div className="modal-content" @click=${this.clickInside}>
          ${ErrorSvg}
          <p>Sorry, there is no data for user "${this.username}" available</p>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }
    .model-container,
    :host {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
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
