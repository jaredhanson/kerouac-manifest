var kerouac = require('kerouac')
  , fs = require('fs')
  , YAML = require('js-yaml');

exports = module.exports = function(file) {
  file = file || 'manifest.yaml';
  
  var site = kerouac();
  
  var text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (ex) {
    if (ex.code == 'ENOENT') { return site; }
    throw ex;
  }
  
  var manifest = YAML.safeLoad(text);
  
  site.page('/manifest.json', require('./middleware/manifest')(manifest));
  
  return site;
}
