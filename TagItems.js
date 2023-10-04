import { DataViewer } from "https://pathall.net/data-viewer/v2.0.0/DataViewer.js"

class TagItems extends HTMLElement {
  #data = null
  #ItemView = DataViewer

  constructor() {
    super()
    this.innerHTML = `
        <header>
          <input type="file" id="load" accept=".json" />
          <button id="export">Export</button>
        </header>
        
        <div id="tags"></div>
        <div id="items"></div>
      `
  }

  static get observedAttributes() {
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute == "src") {
      this.fetch(newValue)
    }
  }

  async fetch(src) {
    const response = await fetch(src)
    const data = await response.json()
    this.data = data
    this.render()
  }

  connectedCallback() {
    this.listen()
  }

  listen() {
    this.querySelector("#load").addEventListener("change",
      clickEvent => this.loadFile(clickEvent)
    )
    this.querySelector("#export").addEventListener("click",
      clickEvent => this.exportFile(clickEvent)
    )
  }

  loadFile(event) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      this.data = JSON.parse(e.target.result)
      this.render()
    }
    reader.readAsText(file)
  }

  set data(data) {
    data.items.forEach((item) => {
      if (!item.tags) item.tags = []
    })
    this.#data = data
  }

  get data() {
    return this.#data
  }

  set ItemView(ItemView) {
    this.#ItemView = ItemView
    if(this.data){ 
      this.render()
    }
  }

  get ItemView() {
    return this.#ItemView
  }

  render() {
    const tagsContainer = this.querySelector("#tags")
    const itemsContainer = this.querySelector("#items")
    tagsContainer.innerHTML = ""
    itemsContainer.innerHTML = ""

    this.data.tags.forEach((tag) => {
      const tagEl = document.createElement("div")
      tagEl.textContent = tag
      tagEl.draggable = true
      tagEl.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", tag)
      })
      tagsContainer.appendChild(tagEl)
    })

    this.data.items.forEach((item, index) => {
      const itemView = new this.ItemView()

      itemView.data = item
      
      itemView.addEventListener("dragover", (e) => {
        e.preventDefault()
      })

      itemView.addEventListener("drop", (e) => {
        e.preventDefault()
        const tag = e.dataTransfer.getData("text/plain")
        if (!item.tags.includes(tag)) {
          item.tags.push(tag)
        }
        itemView.render()
      })

      itemsContainer.appendChild(itemView)
    })
  }

  exportFile() {
    const blob = new Blob([JSON.stringify(this.data, null, 2)], {
      type: "application/json",
    })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "data.json"
    a.click()
    URL.revokeObjectURL(a.href)
  }
}

customElements.define("tag-items", TagItems)

export { TagItems }
