class TagItems extends HTMLElement {
  #data = null

  constructor() {
      super();
      this.innerHTML = `
      <header>
        <input type="file" id="load" accept=".json" />
        <button id="export">Export</button>
      </header>
        <div id="tags"></div>
        <div id="items"></div>

      
      `
  }

  connectedCallback() {
      this.render();
  }

  render() {
      this.querySelector('#load').addEventListener('change', this.loadFile.bind(this));
      this.querySelector('#export').addEventListener('click', this.exportFile.bind(this));
  }

  loadFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
          this.data = JSON.parse(e.target.result);
          this.displayData();
      };
      reader.readAsText(file);
  }

  set data(data){
    console.log(data)
    data.items.forEach(item => {
      if(!item.tags){ item.tags = [] }
    })
    this.#data = data
  }

  get data(){
    return this.#data
  }

  displayData() {
      const tagsContainer = this.querySelector('#tags');
      const itemsContainer = this.querySelector('#items')
      tagsContainer.innerHTML = '';
      itemsContainer.innerHTML = '';

      this.data.tags.forEach(tag => {
          const tagEl = document.createElement('div');
          tagEl.textContent = tag;
          tagEl.draggable = true;
          tagEl.addEventListener('dragstart', (e) => {
              e.dataTransfer.setData('text/plain', tag);
          });
          tagsContainer.appendChild(tagEl);
      });

      this.data.items.forEach((item, index) => {
          const itemEl = document.createElement('div');
          itemEl.textContent = 'Item ' + (index + 1); // Modify this as per your needs
          itemEl.addEventListener('dragover', (e) => {
              e.preventDefault();
          });
          itemEl.addEventListener('drop', (e) => {
              e.preventDefault();
              const tag = e.dataTransfer.getData('text/plain');
              if (!item.tags.includes(tag)) {
                  item.tags.push(tag);
              }
          });
          itemsContainer.appendChild(itemEl);
      });
  }

  exportFile() {
      const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'data.json';
      a.click();
      URL.revokeObjectURL(a.href);
  }
}

customElements.define('tag-items', TagItems);

export {TagItems}