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

  // Strips any existing transform segment, guaranteeing a genuinely bare URL.
  // Needed because the stored image_url/thumbnail_url/artist_avatar_url values
  // themselves now already carry a transform (the D1 rows were fixed directly) -
  // so a caller's "raw" variable is often actually that SAME transformed URL, not
  // a true original. Falling back to it would just retry the exact URL that just
  // failed and do nothing. cloudinaryFallback always strips first so it can never
  // fall back to a broken transform by accident, no matter what the caller passes.
  function stripTransform(url) {
    if (!url || typeof url !== 'string') return url;
    if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
    return url.replace(/\/upload\/[a-z_]+_[^/]+\//, '/upload/');
  }
  window.cloudinaryRaw = stripTransform;

  // Some Cloudinary accounts have "Strict Transformations" enabled (blocks any
  // on-the-fly transform that wasn't pre-approved), or show other intermittent
  // failures on transformed URLs even though the bare original loads fine -
  // confirmed live on this project's own accounts. Every <img> using the helpers
  // above must wire this in as its onerror handler so a blocked/failed transform
  // degrades to the real original image instead of breaking.
  window.cloudinaryFallback = function (el, url) {
    el.onerror = null;
    el.src = stripTransform(url);
  };
})();
