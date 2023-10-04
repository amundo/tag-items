class TaggedEmoji extends HTMLElement {
  #emoji = null
  
  constructor(){
    super()
    this.listen()
  }

  async fetch(url){
    let response = await fetch(url)
    let data = await response.json()
    this.data = data
  }

  connectedCallback(){

  }

  static get observedAttributes(){
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "src"){
      this.fetch(newValue)
    }
  }
  
  set data(data){
    this.#emoji = data
    this.render()
  }

  get data(){
    return this.#emoji
  }

  render(){
    this.innerHTML = `
    <span class=emoji>${this.data.emoji}</span>
    <span class=translation>${this.data.translation}</span>
    <span class=tags>${this.data.tags.map(tag => `<span class=tag>#${tag}</span>`).join(', ')}</span>
    `
  }

  listen(){
  }
}

export {TaggedEmoji}
customElements.define('tagged-emoji', TaggedEmoji)
