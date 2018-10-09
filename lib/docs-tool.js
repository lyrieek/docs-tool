var DocsTool = (function () {
var DocsTool = function DocsTool(content){
  this.content = content || '';
  this.result = '';
  this.analysisEnd = false;
};

DocsTool.prototype.analysis = function analysis (){
    var this$1 = this;

  if (this.analysisEnd) {
    return;
  }
  this.result = '';
  this.content.split('\n').map(function (e) {
    this$1.result += '<p>';
    this$1.result += e;
    this$1.result += '</p>';
  });
  this.analysisEnd = true;
};

DocsTool.prototype.preview = function preview (elem){
  elem.innerHTML = "Loading...";
  this.analysis();
  elem.innerHTML = this.result;
};

return DocsTool;

}());
