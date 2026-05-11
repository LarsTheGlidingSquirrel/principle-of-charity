const layoutMainTemplate = document.createElement('template');
layoutMainTemplate.innerHTML = /* html */`
  <!-- minmax(X, Y) - Below X a horizontal scroll bar will appear. Above Y empty space will be added to the left and right of the content. -->
  <div
    style="display: grid; grid-template-columns: 1fr minmax(20rem, 64rem) 1fr"
  >
    <main
      style="
        grid-column-start: 2;
        grid-column-end: 3;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18rem; /* Sections gap */
      "
    >
      <slot></slot>
    </main>
  </div>
`;

class LayoutMain extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(layoutMainTemplate.content.cloneNode(true))
  }


  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    
  }
}

customElements.define("layout-main", LayoutMain);
