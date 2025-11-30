const colors = {
  green: "#2c6c1280",
  blue: "#114b6780",
};

// material-symbols:thumb-up-rounded
const thumbUpSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="rgb(107, 179, 86)" d="M21 8q.8 0 1.4.6T23 10v2q0 .175-.038.375t-.112.375l-3 7.05q-.225.5-.75.85T18 21h-8q-.825 0-1.412-.587T8 19V8.825q0-.4.163-.762t.437-.638l5.425-5.4q.375-.35.888-.425t.987.175t.688.7t.087.925L15.55 8zM4 21q-.825 0-1.412-.587T2 19v-9q0-.825.588-1.412T4 8t1.413.588T6 10v9q0 .825-.587 1.413T4 21"/></svg>
`;

// material-symbols:thumb-down-rounded
const thumbDownSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="rgb(183, 81, 81)" d="M3 16q-.8 0-1.4-.6T1 14v-2q0-.175.037-.375t.113-.375l3-7.05q.225-.5.75-.85T6 3h8q.825 0 1.413.587T16 5v10.175q0 .4-.162.763t-.438.637l-5.425 5.4q-.375.35-.887.425t-.988-.175t-.687-.7t-.088-.925L8.45 16zM20 3q.825 0 1.413.588T22 5v9q0 .825-.587 1.413T20 16t-1.412-.587T18 14V5q0-.825.588-1.412T20 3"/></svg>
`;

class SquirrelConversation extends HTMLElement {
  messages = [];
  positiveOrNegative = null;
  squirrelImage = {
    'left': 'null',
    'right': 'null',
  }

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
    const positiveOrNegativeContainer = this.shadowRoot.querySelector(
      ".positive-or-negative-container"
    );
    if (
      !this.messages ||
      !speechBubbleContainer ||
      !positiveOrNegativeContainer
    )
      return;
    // Clear container content
    speechBubbleContainer.innerHTML = "";
    // Add messages
    this.messages.forEach((messageObject) => {
      const speechBubble = document.createElement("speech-bubble");
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.gap = ".5rem";
      container.style.justifyContent =
        messageObject.leftOrRight === "left" ? "start" : "end";
      container.style.alignItems = "center";
      speechBubble.textContent = messageObject.message;
      speechBubble.setAttribute(
        "color",
        messageObject.leftOrRight === "left" ? "green" : "blue"
      );
      container.style.paddingLeft =
        messageObject.leftOrRight === "left" ? "0" : "4rem";
      container.style.paddingRight =
        messageObject.leftOrRight === "right" ? "0" : "4rem";
      // container.style.alignSelf =
      messageObject.leftOrRight === "left" ? "start" : "end";
      // if (messageObject.thumb) {
      //   container.innerHTML =
      //     messageObject.thumb === "up" ? thumbUpSvg : thumbDownSvg;
      // }
      container.appendChild(speechBubble);
      speechBubbleContainer.appendChild(container);
    });

    positiveOrNegativeContainer.innerHTML = "";
    positiveOrNegativeContainer.style.display = "none";
    if (this.positiveOrNegative === "positive") {
      positiveOrNegativeContainer.innerHTML = thumbUpSvg;
      positiveOrNegativeContainer.style.display = "flex";
    } else if (this.positiveOrNegative === "negative") {
      positiveOrNegativeContainer.innerHTML = thumbDownSvg;
      positiveOrNegativeContainer.style.display = "flex";
    }

    // Squirrel mood
    setSquirrelImage('right', this.shadowRoot, this.squirrelImage)
    setSquirrelImage('left', this.shadowRoot, this.squirrelImage)
    function setSquirrelImage(leftOrRight, shadowRoot, squirrelImage) {
      const squirrelContainer = shadowRoot.querySelector(`.squirrel-${leftOrRight}`)
      squirrelContainer.innerHTML = ""
      const squirrelImageFile = `media/squirrel/${squirrelImage[leftOrRight]}.svg`
      const image = document.createElement("img");
      image.setAttribute('src', squirrelImageFile)
      image.style.height = '100%'
      squirrelContainer.appendChild(image)
    }
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return ["messages", "positive-or-negative", "squirrel-left", "squirrel-right"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "messages" && oldValue !== newValue) {
      this.messages = JSON.parse(newValue);
    }
    if (name === "positive-or-negative" && oldValue !== newValue) {
      this.positiveOrNegative = newValue;
    }
    if (name === "squirrel-left" && oldValue !== newValue) {
      this.squirrelImage['left'] = newValue
    }
    if (name === "squirrel-right" && oldValue !== newValue) {
      this.squirrelImage['right'] = newValue
    }
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}

customElements.define("squirrel-conversation", SquirrelConversation);
