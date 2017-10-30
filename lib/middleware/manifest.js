exports = module.exports = function(manifest) {
  
  // https://w3c.github.io/manifest/
  // https://www.w3.org/TR/appmanifest/
  // https://developer.mozilla.org/en-US/docs/Web/Manifest
  
  return function webmanifest(page, next) {
    var json = {}, obj
      , i, len, icon;
    
    json.name = manifest.name;
    json.description = manifest.description;
    
    if (manifest.icons) {
      json.icons = [];
      for (i = 0, len = manifest.icons.length; i < len; ++i) {
        icon = manifest.icons[i];
        if (icon.platform) continue;
        
        obj = {};
        obj.src = icon.src;
        obj.sizes = icon.sizes.join(' ');
        if (icon.type) { obj.type = icon.type; }
        if (icon.platform) { obj.platform = icon.platform; }
        json.icons.push(obj);
      }
    }
    
    page.write(JSON.stringify(json, null, 2));
    page.end();
  };
};
