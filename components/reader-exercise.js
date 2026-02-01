class ReaderExercise extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("reader-exercise-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("reader-exercise", ReaderExercise);
