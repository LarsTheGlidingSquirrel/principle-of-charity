class ImportantBlock extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("important-block-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("important-block", ImportantBlock);
