var DocsTool = (function () {
var DocsTool = function DocsTool(content){
  this.content = content;
};

DocsTool.prototype.preview = function preview (elem){
  elem.innerHTML = "Loading...";
  elem.innerHTML = this.content;
};

return DocsTool;

}());
