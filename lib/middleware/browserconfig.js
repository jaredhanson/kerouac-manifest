var builder = require('xmlbuilder');

/**
 * Browser configuration middleware.
 *
 * This middleware generates a browser configuration file (also known as
 * browserconfig), which is primarily used by Internet Explorer when websites
 * are pinned to the Windows taskbar or Start screen.
 *
 * References:
 *   - [Pinned Sites](https://msdn.microsoft.com/en-us/library/hh772707(v=vs.85).aspx)
 *   - [Browser configuration schema reference](https://msdn.microsoft.com/library/dn320426(v=vs.85).aspx)
 *   - [Introduction to Pinned Sites](https://msdn.microsoft.com/en-us/library/gg491738(v=vs.85).aspx)
 *   - [Pinned Sites Developer Documentation](https://msdn.microsoft.com/en-us/library/gg491731(v=vs.85).aspx)
 *   - [Pinned Sites in Windows 8](https://blogs.msdn.microsoft.com/ie/2012/04/03/pinned-sites-in-windows-8/)
 *   - [RealFaviconGenerator](https://realfavicongenerator.net/)
 */
exports = module.exports = function(manifest) {
  
  return function browserconfig(page, next) {
    var config, msapp, tile, xml
      , i, len, icon, size;
    
    config = builder.create('browserconfig', { version: '1.0', encoding: 'UTF-8' });
    msapp = config.e('msapplication');
    
    if (manifest.icons) {
      tile = msapp.e('tile');
      
      for (i = 0, len = manifest.icons.length; i < len; ++i) {
        icon = manifest.icons[i];
        size = icon.sizes.length == 1 ? icon.sizes[0] : undefined;
        switch (size) {
        case '70x70':
          tile.e('square70x70logo', { src: icon.src });
          break;
        case '150x150':
          tile.e('square150x150logo', { src: icon.src });
          break;
        case '310x150':
          tile.e('wide310x150logo', { src: icon.src });
          break;
        case '310x310':
          tile.e('square310x310logo', { src: icon.src });
          break;
        case '144x144':
          // https://blogs.msdn.microsoft.com/ie/2012/06/08/high-quality-visuals-for-pinned-sites-in-windows-8/
          tile.e('TileImage', { src: icon.src });
          break;
        }
      }
    }
    
    if (manifest.themeColor) {
      tile = tile || msapp.e('tile');
      tile.e('TileColor', manifest.themeColor);
    }
    
    var xml = config.end({ pretty: true });
    page.write(xml);
    page.end();
  };
};
