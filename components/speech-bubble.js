const colors = {
  green: "#2c6c1280",
  blue: "#114b6780",
};

class SpeechBubble extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("speech-bubble-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // const template = document.getElementById("speech-bubble-template");
    // console.log(template);
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return ["color"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "color" && oldValue !== newValue) {
      const withBackgroundElement = this.shadowRoot.querySelector(
        "with-background"
      );
      withBackgroundElement.setAttribute('color', colors[newValue])
    }
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}

customElements.define("speech-bubble", SpeechBubble);
