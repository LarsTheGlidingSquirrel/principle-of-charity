class ParagraphBlock extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("paragraph-block-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {
		const headingSlot = this.shadowRoot.querySelector(".paragraph-block-heading slot")
		headingSlot.addEventListener("slotchange", () => {
			const heading = this.shadowRoot.querySelector(".paragraph-block-heading")
			heading.style.display = headingSlot.assignedNodes().length === 0 ? 'none' : 'block'
		})
	}
}

customElements.define("paragraph-block", ParagraphBlock);
