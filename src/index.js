export default class DocsTool{

  constructor(content){
    this.content = content;
  }

  preview(elem){
    elem.innerHTML = "Loading...";
    elem.innerHTML = this.content;
  }

}
