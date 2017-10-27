exports = module.exports = function(manifest) {
  
  console.log(manifest);
  
  return function manifestjson(page, next) {
    var json = {};
    json.name = manifest.name;
    
    page.write(JSON.stringify(json, null, 2));
    page.end();
  };
};
