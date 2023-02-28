import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('test-component')
export class TestComponent extends LitElement {

  @property() 


  render() {
    return html`
      <p>Test element</p>
    `;
  }


}