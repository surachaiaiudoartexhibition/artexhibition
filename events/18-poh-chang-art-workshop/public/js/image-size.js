/**
 * Cloudinary size guard.
 *
 * Every submission's image_url/thumbnail_url/artist_avatar_url was found to be
 * byte-identical - no size/quality transform at all - meaning every thumbnail
 * grid was silently downloading the full-resolution original (verified: one
 * "thumbnail" was 204KB when a properly-sized one is ~28KB). The existing D1
 * rows were fixed directly, but nothing stopped a *future* import path from
 * writing untransformed URLs again. These helpers are the defensive guard:
 * called wherever a thumbnail/avatar is actually rendered, they add a Cloudinary
 * transform on the fly if the URL doesn't already have one - so a thumbnail is
 * never full-resolution again, regardless of how the underlying data got there.
 *
 * Safe no-op on anything that isn't a Cloudinary /upload/ URL (local /uploads/
 * paths, Unsplash fallbacks, etc.) - those pass through unchanged.
 */
(function () {
  function applyTransform(url, transform) {
    if (!url || typeof url !== 'string') return url;
    if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
    // Already has a transform segment (e.g. c_thumb,w_500 or f_auto,q_auto)? Leave it.
    if (/\/upload\/[a-z_]+_[^/]+\//.test(url)) return url;
    return url.replace('/upload/', `/upload/${transform}/`);
  }

  // For small display sizes: avatars, gallery grid thumbnails, list rows.
  window.cloudinaryThumb = function (url, width) {
    return applyTransform(url, `c_thumb,w_${width || 500},f_auto,q_auto`);
  };

  // For full-size viewing: bounds an oversized original and auto-optimizes
  // format/quality, without visibly degrading a normally-sized image.
  window.cloudinaryFull = function (url, maxWidth) {
    return applyTransform(url, `f_auto,q_auto,w_${maxWidth || 2000},c_limit`);
  };
})();
