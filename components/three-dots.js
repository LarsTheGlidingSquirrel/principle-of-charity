let svgPromise = null;

async function getSvg() {
  if (!svgPromise) {
    svgPromise = new Promise((resolve, reject) => {
      console.log("Fetching");
      fetch("/images/three-dots.svg").then((response) => {
        response.text().then(svgText => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgText, "image/svg+xml");
          const svg = doc.documentElement;
          svg.removeAttribute("width");
          svg.removeAttribute("height");
          svg.style.setProperty("height", "100%");
					svg.style.setProperty("display", "block");
          const pathElements = svg.querySelectorAll("path");
					pathElements.forEach(element => {
						element.style.setProperty("fill", "var(--with-background-color)");
					})
					resolve(svg)
        });
      }).catch(() => reject('Failed'));
    })
  }
  return svgPromise
}

class ThreeDots extends HTMLElement {
  color = "#f0d999";

  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("three-dots-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["color"];
  }

  connectedCallback() {
    this.addBackground();
  }

  async addBackground() {
    const container = this.shadowRoot.querySelector('.container');
    if (!container || !this.color) return;
    const svg = await getSvg()
    container.style.setProperty(
      "--with-background-color",
      this.color
    );
    container.append(svg.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "color" && oldValue !== newValue) {
      this.color = newValue;
    }
  }
}

customElements.define("three-dots", ThreeDots);
