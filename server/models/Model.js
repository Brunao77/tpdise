import { Model } from "sequelize";

Model.prototype.asociar = function(asoc, data){
  data = JSON.parse(JSON.stringify(data, (key, value) => {
    if(key == 'id') return undefined
    return value
  }))
  this.set(asoc, data);
}

export default Model;