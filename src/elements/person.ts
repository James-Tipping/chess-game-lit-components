import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement('person-details')
export class Person extends LitElement {

  @property({ type: Object })
  personData!: {
    'username': string,
    'points': number,
    'is_winner': boolean
  };



}