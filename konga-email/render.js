/*
 * Konga daily email renderer.
 * Turns a plain data object (see defaultData) into Netcore-ready email HTML:
 * table layout, inline styles, no JavaScript in the output.
 * Discount % and "You save" are calculated here from price + oldPrice.
 * Works in the browser (window.KongaEmail) and in Node (require('./render.js')).
 */
(function (root) {
  var C = {
    pink: '#ED017F',
    text: '#111111',
    muted: '#9A9A9A',
    green: '#1E9E3E',
    greenBg: '#D7EEDC',
    border: '#D6D6D6',
    placeholder: '#D9D9D9',
    page: '#FFFFFF',
  };
  var FONT = "'Poppins', Arial, Helvetica, sans-serif";
  var WIDTH = 600;
  var GUTTER = 24;
  var INNER = WIDTH - GUTTER * 2; // 552
  var GAP = 12;
  var CARD = (INNER - GAP * 2) / 3; // 176

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function num(v) {
    var n = parseFloat(String(v == null ? '' : v).replace(/[^0-9.]/g, ''));
    return isFinite(n) ? n : 0;
  }

  function naira(n) {
    var s = String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '&#8358;' + s;
  }

  // price/oldPrice -> { price, oldPrice, save, pct, hasDiscount }
  function pricing(p) {
    var price = num(p.price);
    var oldPrice = num(p.oldPrice);
    var hasDiscount = price > 0 && oldPrice > price;
    var save = hasDiscount ? oldPrice - price : 0;
    var pct = hasDiscount ? Math.round((save / oldPrice) * 100) : 0;
    return { price: price, oldPrice: oldPrice, save: save, pct: pct, hasDiscount: hasDiscount && pct > 0 };
  }

  function truncate(s, max) {
    s = String(s || '').trim();
    if (!max || s.length <= max) return s;
    return s.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
  }

  function img(src, width, height, alt, extraStyle) {
    return (
      '<img src="' + esc(src) + '" width="' + width + '"' + (height ? ' height="' + height + '"' : '') +
      ' alt="' + esc(alt || '') + '" border="0" style="display:block;border:0;outline:none;text-decoration:none;' +
      'max-width:100%;' + (height ? '' : 'height:auto;') + (extraStyle || '') + '">'
    );
  }

  function link(href, inner, style) {
    return '<a href="' + esc(href || '#') + '" target="_blank" style="text-decoration:none;' + (style || '') + '">' + inner + '</a>';
  }

  // Grey box used when an image slot has not been filled yet.
  function placeholder(width, height, label) {
    return (
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td height="' + height + '" align="center" valign="middle" style="background:' + C.placeholder + ';height:' + height + 'px;' +
      'font-family:' + FONT + ';font-size:12px;color:#555555;line-height:16px;">' + (label || '&nbsp;') + '</td></tr></table>'
    );
  }

  function imageOrPlaceholder(src, width, height, alt, href, label) {
    var inner = src ? img(src, width, null, alt, 'width:100%;') : placeholder(width, height, label);
    return href ? link(href, inner) : inner;
  }

  function button(href, label, opts) {
    opts = opts || {};
    var pad = opts.pad || '9px 0';
    var size = opts.size || 11;
    return (
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td align="center" bgcolor="' + C.pink + '" style="background:' + C.pink + ';border-radius:6px;">' +
      '<a href="' + esc(href || '#') + '" target="_blank" style="display:block;padding:' + pad + ';font-family:' + FONT +
      ';font-size:' + size + 'px;line-height:' + (size + 4) + 'px;font-weight:500;color:#FFFFFF;text-decoration:none;' +
      'text-transform:uppercase;border-radius:6px;">' + esc(opts.label || label || 'Shop Now') + '</a></td></tr></table>'
    );
  }

  function priceBlock(pr, sizes) {
    var html =
      '<span style="font-family:' + FONT + ';font-size:' + sizes.price + 'px;font-weight:700;color:' + C.text + ';">' +
      naira(pr.price) + '</span>';
    if (pr.hasDiscount) {
      html +=
        '&nbsp;&nbsp;<span style="font-family:' + FONT + ';font-size:' + sizes.old + 'px;color:' + C.muted +
        ';text-decoration:line-through;white-space:nowrap;">' + naira(pr.oldPrice) + '</span>';
    }
    return html;
  }

  function savePill(pr, size) {
    if (!pr.hasDiscount) return '';
    return (
      '<span style="display:inline-block;background:' + C.greenBg + ';color:' + C.green + ';font-family:' + FONT +
      ';font-size:' + size + 'px;line-height:' + (size + 4) + 'px;padding:3px 7px;border-radius:5px;white-space:nowrap;">' +
      'You save ' + naira(pr.save) + '</span>'
    );
  }

  function badge(pr) {
    if (!pr.hasDiscount) return '&nbsp;';
    return (
      '<span style="display:inline-block;background:' + C.green + ';color:#FFFFFF;font-family:' + FONT +
      ';font-size:10px;line-height:14px;padding:2px 6px;border-radius:4px;">-' + pr.pct + '%</span>'
    );
  }

  // ---------- Product card (Top Deals grid) ----------
  function productCard(p, settings) {
    var pr = pricing(p);
    var inner = CARD - 18; // card padding + border
    var name = truncate(p.name, settings.nameMaxChars);
    var logos = '';
    if (p.campaignLogo || p.brandLogo) {
      logos =
        '<tr><td style="padding-bottom:6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
        '<td align="left" valign="middle" height="22" style="height:22px;">' + (p.campaignLogo ? img(p.campaignLogo, 48, null, '', 'max-height:22px;width:auto;') : '&nbsp;') + '</td>' +
        '<td align="right" valign="middle" height="22" style="height:22px;">' + (p.brandLogo ? img(p.brandLogo, 48, null, '', 'max-height:16px;width:auto;margin-left:auto;') : '&nbsp;') + '</td>' +
        '</tr></table></td></tr>';
    }
    return (
      '<table role="presentation" class="card" width="100%" cellpadding="0" cellspacing="0" border="0" ' +
      'style="border:1px solid ' + C.border + ';border-radius:8px;background:#FFFFFF;">' +
      '<tr><td style="padding:8px;">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
      logos +
      '<tr><td align="right" height="20" style="height:20px;padding-bottom:4px;">' + badge(pr) + '</td></tr>' +
      '<tr><td align="center">' + imageOrPlaceholder(p.image, inner, inner, p.name, p.link, 'Product image') + '</td></tr>' +
      '<tr><td style="padding-top:10px;padding-bottom:8px;border-bottom:1px solid #8C8C8C;">' +
      '<div style="font-family:' + FONT + ';font-size:11px;line-height:15px;color:' + C.text + ';height:30px;overflow:hidden;">' +
      link(p.link, esc(name || 'Product name'), 'color:' + C.text + ';') + '</div></td></tr>' +
      '<tr><td style="padding-top:8px;line-height:18px;">' + priceBlock(pr, { price: 14, old: 10 }) + '</td></tr>' +
      '<tr><td height="22" style="padding-top:6px;height:22px;">' + (savePill(pr, 9) || '&nbsp;') + '</td></tr>' +
      '<tr><td style="padding-top:10px;">' + button(p.link, 'Shop Now') + '</td></tr>' +
      '</table></td></tr></table>'
    );
  }

  function productGrid(products, settings) {
    var rows = '';
    for (var i = 0; i < products.length; i += 3) {
      var cells = '';
      for (var j = 0; j < 3; j++) {
        var p = products[i + j];
        if (j > 0) cells += '<td class="gap" width="' + GAP + '" style="width:' + GAP + 'px;font-size:0;">&nbsp;</td>';
        cells +=
          '<td class="col" width="' + CARD + '" valign="top" style="width:' + CARD + 'px;">' +
          (p ? productCard(p, settings) : '&nbsp;') + '</td>';
      }
      rows += '<tr>' + cells + '</tr>' + '<tr><td colspan="5" height="' + GAP + '" style="height:' + GAP + 'px;font-size:0;line-height:0;">&nbsp;</td></tr>';
    }
    return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' + rows + '</table>';
  }

  // ---------- Deal of the Day (wide card) ----------
  function dealOfDay(p) {
    var pr = pricing(p);
    return (
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ' +
      'style="border:1px solid ' + C.border + ';border-radius:8px;background:#FFFFFF;"><tr><td style="padding:12px;">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td class="col" width="200" valign="middle" style="width:200px;">' + imageOrPlaceholder(p.image, 200, 180, p.name, p.link, 'Product image') + '</td>' +
      '<td class="gap" width="24" style="width:24px;font-size:0;">&nbsp;</td>' +
      '<td class="col" valign="middle" style="padding:8px 0;">' +
      '<div style="font-family:' + FONT + ';font-size:12px;line-height:18px;color:' + C.text + ';">' + link(p.link, esc(p.name || 'Product name'), 'color:' + C.text + ';') + '</div>' +
      '<div style="padding-top:12px;line-height:22px;">' + priceBlock(pr, { price: 17, old: 11 }) + '</div>' +
      '<div style="padding-top:6px;">' + savePill(pr, 10) + '</div>' +
      '<table role="presentation" width="180" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;width:180px;"><tr><td>' +
      button(p.link, 'Shop Now', { pad: '10px 0', size: 12 }) + '</td></tr></table>' +
      '</td></tr></table></td></tr></table>'
    );
  }

  // ---------- Sections ----------
  function sectionTitle(title, linkLabel, href) {
    return (
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td align="left" style="font-family:' + FONT + ';font-size:18px;line-height:24px;color:#222222;padding-bottom:12px;">' + esc(title) + '</td>' +
      (linkLabel
        ? '<td align="right" style="font-family:' + FONT + ';font-size:13px;line-height:24px;padding-bottom:12px;">' +
          link(href, esc(linkLabel), 'color:' + C.pink + ';') + '</td>'
        : '') +
      '</tr></table>'
    );
  }

  function row(content, padTop, padBottom) {
    return (
      '<tr><td class="px" style="padding:' + (padTop || 0) + 'px ' + GUTTER + 'px ' + (padBottom || 0) + 'px ' + GUTTER + 'px;">' +
      content + '</td></tr>'
    );
  }

  function header(d) {
    var s = d.settings;
    var logo = s.logoUrl
      ? img(s.logoUrl, 140, null, 'Konga', 'margin:0 auto;width:140px;')
      : '<span style="font-family:' + FONT + ';font-size:40px;line-height:44px;font-weight:700;color:' + C.pink + ';">konga</span>';
    var nav = '';
    (d.nav || []).forEach(function (n, i) {
      if (i > 0) nav += '<td width="4" style="width:4px;font-size:0;">&nbsp;</td>';
      nav +=
        '<td align="center" bgcolor="#000000" style="background:#000000;border-radius:3px;">' +
        link(n.link, esc(n.label), 'display:block;padding:7px 2px;font-family:' + FONT + ';font-size:9px;line-height:12px;font-weight:700;color:#FFFFFF;text-transform:uppercase;') +
        '</td>';
    });
    return (
      row(
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">' +
          link(s.logoLink, logo) + '</td></tr>' +
          (s.tagline
            ? '<tr><td align="center" style="padding-top:4px;font-family:Georgia,serif;font-size:11px;line-height:14px;color:#222222;">' + esc(s.tagline) + '</td></tr>'
            : '') +
          '</table>',
        24, 16
      ) +
      (nav ? row('<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' + nav + '</tr></table>', 0, 16) : '')
    );
  }

  function banner(b, h, label) {
    if (!b || b.enabled === false) return '';
    return row(imageOrPlaceholder(b.image, INNER, h, b.alt, b.link, label), 0, 24);
  }

  function categories(c) {
    if (!c || c.enabled === false || !(c.items || []).length) return '';
    var n = c.items.length;
    var gap = 8;
    var w = Math.floor((INNER - gap * (n - 1)) / n);
    var cells = '';
    c.items.forEach(function (it, i) {
      if (i > 0) cells += '<td width="' + gap + '" style="width:' + gap + 'px;font-size:0;">&nbsp;</td>';
      cells +=
        '<td width="' + w + '" valign="top" align="center" style="width:' + (100 / n).toFixed(2) + '%;">' +
        imageOrPlaceholder(it.image, w, w, it.label, it.link, '') +
        '<div style="padding-top:8px;font-family:' + FONT + ';font-size:10px;line-height:14px;">' +
        link(it.link, esc(it.label), 'color:' + C.text + ';') + '</div></td>';
    });
    return row(
      sectionTitle(c.title || 'Shop By Category', c.shopMoreLabel || 'Shop More', c.shopMoreLink) +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' + cells + '</tr></table>',
      0, 28
    );
  }

  function brandsStrip(b) {
    if (!b || !b.image) return '';
    return row(
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-bottom:1px solid #EEEEEE;padding-bottom:20px;">' +
        imageOrPlaceholder(b.image, INNER, 40, 'Konga group brands', b.link) + '</td></tr></table>',
      0, 20
    );
  }

  function social(list) {
    if (!list || !list.length) return '';
    var cells = '';
    list.forEach(function (s) {
      var inner = s.icon
        ? img(s.icon, 32, 32, s.name, 'width:32px;height:32px;')
        : '<span style="display:inline-block;font-family:' + FONT + ';font-size:11px;line-height:14px;color:#FFFFFF;background:#222222;border-radius:4px;padding:6px 8px;">' + esc(s.name) + '</span>';
      cells += link(s.link, inner, 'display:inline-block;margin:4px 8px;vertical-align:middle;');
    });
    return row(
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="font-size:0;line-height:0;">' + cells + '</td></tr></table>' +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-bottom:1px solid #EEEEEE;padding-top:20px;font-size:0;line-height:0;">&nbsp;</td></tr></table>',
      0, 20
    );
  }

  function storeBadge(src, href, top, bottom) {
    var inner = src
      ? img(src, 130, null, bottom, 'width:130px;')
      : '<span style="display:inline-block;background:#000000;border-radius:7px;padding:6px 14px;text-align:left;font-family:' + FONT + ';color:#FFFFFF;">' +
        '<span style="display:block;font-size:8px;line-height:10px;">' + top + '</span>' +
        '<span style="display:block;font-size:15px;line-height:18px;font-weight:600;">' + bottom + '</span></span>';
    return link(href, inner);
  }

  function appDownload(a) {
    if (!a) return '';
    return row(
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
        '<td class="col center" align="left" valign="middle" style="font-family:' + FONT + ';font-size:16px;line-height:22px;color:#222222;padding:6px 0;">' + esc(a.title || 'Download Our App') + '</td>' +
        '<td class="col center" align="right" valign="middle" style="padding:6px 0;">' +
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;"><tr>' +
        '<td style="padding-right:10px;">' + storeBadge(a.googlePlayImg, a.googlePlayLink, 'GET IT ON', 'Google Play') + '</td>' +
        '<td>' + storeBadge(a.appStoreImg, a.appStoreLink, 'Download on the', 'App Store') + '</td>' +
        '</tr></table></td></tr></table>',
      0, 28
    );
  }

  function footer(f) {
    var small = 'font-family:' + FONT + ';font-size:10px;line-height:16px;color:#8A8A8A;';
    var year = new Date().getFullYear();
    return row(
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="' + small + '">' +
        'This email address is for outgoing emails only.<br>' +
        'If you wish to unsubscribe from this mailing list, please click ' +
        link(f.unsubscribeLink, 'Unsubscribe', 'color:' + C.pink + ';text-decoration:underline;font-weight:600;') +
        '<br><br>' +
        link(f.websiteLink, esc(f.websiteLabel), 'color:' + C.pink + ';text-decoration:underline;') +
        ' | WhatsApp: ' + esc(f.whatsapp) + ' | Email: ' +
        link('mailto:' + f.email, esc(f.email), 'color:' + C.pink + ';text-decoration:underline;') +
        '<br>Helpline: ' + esc(f.helpline) +
        '<br>&copy; 2013-' + year + ', Konga.com' +
        '<br>All Rights Reserved. Do not reply.' +
        '</td></tr></table>',
      0, 32
    );
  }

  // ---------- Full email ----------
  function render(d) {
    var s = d.settings || {};
    var top = d.topDeals || {};
    var dod = d.dealOfDay || {};
    var body =
      header(d) +
      banner(d.hero, 250, 'Hero banner<br>1200 &times; 700px') +
      (dod.enabled !== false && dod.product ? row(sectionTitle(dod.title || 'Deal Of The Day') + dealOfDay(dod.product), 0, 28) : '') +
      ((top.products || []).length
        ? row(sectionTitle(top.title || 'Top Deals', top.shopAllLabel || 'Shop All', top.shopAllLink) + productGrid(top.products, s), 0, 16)
        : '') +
      banner(d.promoBanner, 184, 'Banner Promotion<br>1500 &times; 500px') +
      categories(d.categories) +
      brandsStrip(d.brandsStrip) +
      social(d.social) +
      appDownload(d.app) +
      footer(d.footer || {});

    return (
      '<!DOCTYPE html>\n<html lang="en" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n' +
      '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<title>' + esc(s.subject || 'Konga') + '</title>\n' +
      '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">\n' +
      '<style>\n' +
      'body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}\n' +
      'table{border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;}\n' +
      'img{-ms-interpolation-mode:bicubic;}\n' +
      'a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}\n' +
      '@media only screen and (max-width:620px){\n' +
      '  .wrap{width:100%!important;}\n' +
      '  .px{padding-left:16px!important;padding-right:16px!important;}\n' +
      '  .col{display:block!important;width:100%!important;max-width:100%!important;box-sizing:border-box;}\n' +
      '  .col .card{margin-bottom:12px;}\n' +
      '  .gap{display:none!important;}\n' +
      '  .center{text-align:center!important;}\n' +
      '}\n' +
      '</style>\n</head>\n' +
      '<body style="margin:0;padding:0;background:' + C.page + ';">\n' +
      (s.previewText
        ? '<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">' + esc(s.previewText) + '&#847;&zwnj;&nbsp;'.repeat(40) + '</div>\n'
        : '') +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + C.page + ';"><tr><td align="center">\n' +
      '<table role="presentation" class="wrap" width="' + WIDTH + '" cellpadding="0" cellspacing="0" border="0" style="width:' + WIDTH + 'px;max-width:100%;background:#FFFFFF;">\n' +
      body +
      '\n</table>\n</td></tr></table>\n</body>\n</html>\n'
    );
  }

  function emptyProduct() {
    return { name: '', price: '', oldPrice: '', image: '', link: '', brandLogo: '', campaignLogo: '' };
  }

  function defaultData() {
    var sample = {
      name: 'Vivobook 14 X1404va Laptop - Intel Core 3-100u - 8gb Ddr5 Ram - 512gb SSD',
      price: 551825,
      oldPrice: 650000,
      image: '',
      link: 'https://www.konga.com/',
      brandLogo: '',
      campaignLogo: '',
    };
    var products = [];
    for (var i = 0; i < 9; i++) products.push(Object.assign({}, sample));
    return {
      settings: {
        subject: 'Konga Daily Deals',
        previewText: 'Today’s top deals on Konga, grab them before they’re gone.',
        logoUrl: '',
        logoLink: 'https://www.konga.com/',
        tagline: 'The E-commerce group you trust',
        nameMaxChars: 48,
      },
      nav: [
        { label: 'Phones', link: 'https://www.konga.com/' },
        { label: 'Computers', link: 'https://www.konga.com/' },
        { label: 'Electronics', link: 'https://www.konga.com/' },
        { label: 'Groceries', link: 'https://www.konga.com/' },
        { label: 'Home Essentials', link: 'https://www.konga.com/' },
      ],
      hero: { enabled: true, image: '', link: 'https://www.konga.com/', alt: 'Shop on the Konga App' },
      dealOfDay: {
        enabled: true,
        title: 'Deal Of The Day',
        product: {
          name: 'HP 240R G10 Notebook PC - Intel Core 7-150U, 14" FHD, 8GB RAM, 512GB SSD - C94G4ET',
          price: 6099,
          oldPrice: 9099,
          image: '',
          link: 'https://www.konga.com/',
        },
      },
      topDeals: { title: 'Top Deals', shopAllLabel: 'Shop All', shopAllLink: 'https://www.konga.com/', products: products },
      promoBanner: { enabled: true, image: '', link: 'https://www.konga.com/', alt: 'Promotion' },
      categories: {
        enabled: true,
        title: 'Shop By Category',
        shopMoreLabel: 'Shop More',
        shopMoreLink: 'https://www.konga.com/',
        items: [
          { label: 'Mobile Phones', image: '', link: 'https://www.konga.com/' },
          { label: 'Computing', image: '', link: 'https://www.konga.com/' },
          { label: 'Electronics', image: '', link: 'https://www.konga.com/' },
          { label: 'Home & Kitchen', image: '', link: 'https://www.konga.com/' },
          { label: 'Beauty Hub', image: '', link: 'https://www.konga.com/' },
        ],
      },
      brandsStrip: { image: '', link: 'https://www.konga.com/' },
      social: [
        { name: 'WhatsApp', icon: '', link: '' },
        { name: 'Instagram', icon: '', link: '' },
        { name: 'Facebook', icon: '', link: '' },
        { name: 'LinkedIn', icon: '', link: '' },
        { name: 'TikTok', icon: '', link: '' },
        { name: 'YouTube', icon: '', link: '' },
        { name: 'X', icon: '', link: '' },
      ],
      app: {
        title: 'Download Our App',
        googlePlayImg: '',
        googlePlayLink: '',
        appStoreImg: '',
        appStoreLink: '',
      },
      footer: {
        unsubscribeLink: '',
        websiteLabel: 'www.konga.com',
        websiteLink: 'https://www.konga.com',
        whatsapp: '09070038400',
        email: 'help@konga.com',
        helpline: '018883435, 07080635700 or 0809 460 5555',
      },
    };
  }

  var api = {
    render: render,
    pricing: pricing,
    truncate: truncate,
    defaultData: defaultData,
    emptyProduct: emptyProduct,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.KongaEmail = api;
})(this);
