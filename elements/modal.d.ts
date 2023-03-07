import { LitElement } from "lit";
export declare class Modal extends LitElement {
    username: string;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    closeModal(e: MouseEvent): void;
    clickInside(e: Event): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=modal.d.ts.map