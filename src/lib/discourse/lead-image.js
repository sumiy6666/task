// A post's first picture, to show as a banner under the heading, and the
// post's HTML with it taken out so it doesn't show twice. Discourse wraps uploaded
// pictures in a "lightbox" link with a caption bar holding the file name.
export function takeLeadImage(html = '') {
  const lightbox = html.match(/<div class="lightbox-wrapper">[\s\S]*?<\/div>\s*<\/a>\s*<\/div>/);
  if (lightbox) {
    const src = lightbox[0].match(/<img[^>]*\ssrc="([^"]+)"/)?.[1];
    if (src) return { image: src, html: html.replace(lightbox[0], '').replace(/<p>\s*<\/p>/g, '') };
  }
  const img = html.match(/<img(?![^>]*class="[^"]*(emoji|avatar|site-icon)[^"]*")[^>]*src="([^"]+)"[^>]*>/);
  if (img) return { image: img[2], html: html.replace(img[0], '').replace(/<p>\s*(<br\s*\/?>\s*)*<\/p>/g, '') };
  return { image: null, html };
}

