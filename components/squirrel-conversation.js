const colors = {
  green: "#2c6c1280",
  blue: "#114b6780",
};

class SquirrelConversation extends HTMLElement {
  messages = [];

  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("squirrel-conversation-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const speechBubbleContainer =
      this.shadowRoot.querySelector(".speech-bubble");
    if (!this.messages || !speechBubbleContainer) return;
		// Clear container content
    speechBubbleContainer.innerHTML = "";
		// Add messages
    this.messages.forEach((messageObject) => {
			const speechBubble = document.createElement("speech-bubble");
      speechBubble.textContent = messageObject.message;
			speechBubble.setAttribute("color", messageObject.leftOrRight === "left" ? "green" : "blue")
			speechBubble.style.marginLeft = messageObject.leftOrRight === "left" ? "0" : "4rem"
			speechBubble.style.marginRight = messageObject.leftOrRight === "right" ? "0" : "4rem"
			speechBubble.style.alignSelf = messageObject.leftOrRight === "left" ? "start" : "end"
      speechBubbleContainer.appendChild(speechBubble);
    });
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return ["messages"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "messages" && oldValue !== newValue) {
      this.messages = JSON.parse(newValue);
    }
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}

customElements.define("squirrel-conversation", SquirrelConversation);
