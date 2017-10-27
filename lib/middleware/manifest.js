exports = module.exports = function(manifest) {
  
  return function manifestjson(page, next) {
    var json = {}
      , i, len, obj;
    
    json.name = manifest.name;
    json.description = manifest.description;
    
    if (manifest.icons) {
      json.icons = [];
      for (i = 0, len = manifest.icons.length; i < len; ++i) {
        obj = {};
        obj.src = manifest.icons[i].src;
        obj.sizes = manifest.icons[i].sizes;
        json.icons.push(obj);
      }
    }
    
    page.write(JSON.stringify(json, null, 2));
    page.end();
  };
};
