/**
 * Cloudinary Direct Unsigned Upload Utility
 * Zero-budget architecture: Direct from browser to Cloudinary without hitting Worker CPU.
 */

class CloudinaryUploader {
  /**
   * Upload image file directly to Cloudinary using an Unsigned Upload Preset
   * @param {File} file - Image file from file input
   * @param {Object} options - Configuration options
   * @param {string} options.cloudName - Cloudinary cloud name
   * @param {string} options.uploadPreset - Unsigned upload preset name
   * @param {Function} [options.onProgress] - Optional upload progress callback (percent: number)
   * @returns {Promise<{ imageUrl: string, thumbnailUrl: string, publicId: string }>}
   */
  static async uploadDirect(file, options = {}) {
    const { cloudName, uploadPreset, onProgress } = options;

    // Fallback: If running in local demo without live Cloudinary account, support a simulated upload
    if (!cloudName || cloudName === "event-demo-account" || !uploadPreset) {
      console.warn("[Cloudinary] No live cloudName/preset configured. Using local demo simulation mode.");
      return this.simulateDemoUpload(file, onProgress);
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", uploadUrl, true);

      if (onProgress && xhr.upload) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            const publicId = data.public_id;
            const version = data.version ? `v${data.version}/` : "";
            const format = data.format || "jpg";

            // Specification-compliant transformations:
            // Large display: f_auto,q_auto,w_2000,c_limit
            const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_2000,c_limit/${version}${publicId}.${format}`;
            
            // Thumbnail display: c_thumb,w_600
            const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/image/upload/c_thumb,w_600/${version}${publicId}.${format}`;

            resolve({
              publicId,
              imageUrl,
              thumbnailUrl,
              raw: data
            });
          } catch (err) {
            reject(new Error("Failed to parse Cloudinary response: " + err.message));
          }
        } else {
          try {
            const errData = JSON.parse(xhr.responseText);
            reject(new Error(errData.error?.message || `Upload failed with status ${xhr.status}`));
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => reject(new Error("Network error during Cloudinary upload"));
      xhr.send(formData);
    });
  }

  /**
   * Generates mock URLs for local zero-config testing
   */
  static async simulateDemoUpload(file, onProgress) {
    // Simulate upload progress
    for (let p = 25; p <= 100; p += 25) {
      await new Promise(r => setTimeout(r, 50));
      if (onProgress) onProgress(p);
    }

    const demoPublicId = `demo_${Date.now()}`;
    // Read the user's selected file as DataURL so the exact uploaded image is displayed locally
    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });

    const finalUrl = dataUrl || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80";

    return {
      publicId: demoPublicId,
      imageUrl: finalUrl,
      thumbnailUrl: finalUrl,
      isDemo: true
    };
  }
}

window.CloudinaryUploader = CloudinaryUploader;
