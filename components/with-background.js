let svgPromise = null;

async function getSvg() {
  if (!svgPromise) {
    svgPromise = new Promise((resolve, reject) => {
      console.log("Fetching");
      fetch("/images/text-block.svg").then((response) => {
        response.text().then(svgText => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgText, "image/svg+xml");
          const svg = doc.documentElement;
          svg.removeAttribute("width");
          svg.removeAttribute("height");
          svg.setAttribute("preserveAspectRatio", "none");
          svg.style.setProperty("width", "100%");
          svg.style.setProperty("height", "100%");
          const firstPathElement = svg.querySelector("path");
          firstPathElement.style.setProperty("fill", "var(--with-background-color)");
          resolve(svg)
        });
      }).catch(() => reject('Failed'));
    })
  }
  return svgPromise
}

class WithBackground extends HTMLElement {
  color = "#f0d999";

  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("with-background-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["color"];
  }

  connectedCallback() {
    this.addBackground();
  }

  async addBackground() {
    const backgroundContainer = this.shadowRoot.querySelector(".background");
    if (!backgroundContainer || !this.color) return;
    const svg = await getSvg()
    backgroundContainer.style.setProperty(
      "--with-background-color",
      this.color
    );
    backgroundContainer.append(svg.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "color" && oldValue !== newValue) {
      this.color = newValue;
    }
  }
}

customElements.define("with-background", WithBackground);
