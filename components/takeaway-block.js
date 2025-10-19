class TakeawayBlock extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("takeaway-block-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // const template = document.getElementById("speech-bubble-template");
    // console.log(template);
  }
}

customElements.define("takeaway-block", TakeawayBlock);
