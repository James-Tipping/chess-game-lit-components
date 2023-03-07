import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement('error-view')
export class ErrorView extends LitElement {

  @state()
  message!: string


  render() {
    return html`
      <div>
        <p>${this.message}</p>
      </div>
    `;
  }

}