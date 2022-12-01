var rUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/;

/**
 * Fancybox tag
 *
 * Syntax:
 *   {% fancybox /path/to/image [/path/to/thumbnail] [title] %}
 */

hexo.extend.tag.register('fancybox', function(args){
  var original = args.shift(),
    thumbnail = '';

  if (args.length && rUrl.test(args[0])){
    thumbnail = args.shift();
  }

  var title = args.join(' ');

  return `<a data-fancybox="gallery" href="${original}" data-caption="${title}">
    <img src="${thumbnail || original}" alt="${title}">
    </a>
    ${title ? `<span class="caption">${title}</span>` : ''}`;
});

/**
 * Generates a canonical URL <link> tag
 *
 * Usage:
 *   <%- canonicalLink(config, page) %>
 *
 * Copied from https://github.com/tarunbatra/hexo-canonical-link
 */
hexo.extend.helper.register('canonicalLink', (config, page) => {
  let canonical_url = page.canonical_url;
  if (!canonical_url) {
      var base_url = config.url;
      if (config.url.charAt(config.url.length - 1) !== '/') base_url += '/';
      canonical_url = (base_url + page.canonical_path).replace('index.html', '')
  }
  return `<link rel="canonical" href="${canonical_url}"/>`;
});
