class ThoughtBubble extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("thought-bubble-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const headingSlot = this.shadowRoot.querySelector(
      ".thought-blubble-heading slot"
    );
    headingSlot.addEventListener("slotchange", () => {
      const heading = this.shadowRoot.querySelector(".thought-blubble-heading");
      heading.style.display =
        headingSlot.assignedNodes().length === 0 ? "none" : "block";
    });
  }
}

customElements.define("thought-bubble", ThoughtBubble);
