// const template = document.createElement("template");

// template.innerHTML = `
//   <div style="position: relative; width: fit-content; color: white">
//     <div
//       style="
//         border-radius: 5px;
//         background-color: #2c6c1280;
//         height: calc(100% - 3px);
//         width: calc(100% - 3px);
//         position: absolute;
//         bottom: 0;
//         left: 0;
//       "
//       class="speech-bubble-background"
//     ></div>
//     <div
//       style="
//         border-radius: 5px;
//         background-color: #2c6c1280;
//         height: calc(100% - 3px);
//         width: calc(100% - 3px);
//         position: absolute;
//         top: 0;
//         right: 0;
//       "
//       class="speech-bubble-background"
//     ></div>
//     <div
//       style="color: white; position: relative; padding: 0.7rem; margin: 0"
//     >
//       <slot></slot>
//     </div>
//   </div>
// `;

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
      const backgrounds = this.shadowRoot.querySelectorAll(
        ".speech-bubble-background"
      );
      backgrounds.forEach(
        (background) => (background.style.backgroundColor = colors[newValue])
      );
    }
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}

customElements.define("speech-bubble", SpeechBubble);
