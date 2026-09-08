/**
 * Event Webapp Client API Helper
 */

const EventAPI = {
  async getConfig() {
    try {
      const res = await fetch("/api/config");
      return await res.json();
    } catch (err) {
      console.error("Failed to load event config", err);
      return {
        eventId: "printmaking-2026",
        eventTitle: "International Contemporary Printmaking 2026",
        cloudinaryCloudName: "",
        cloudinaryUploadPreset: ""
      };
    }
  },

  async getSubmissions(status = "approved", adminKey = null, limit = 500) {
    const headers = {};
    if (adminKey) {
      headers["x-admin-key"] = adminKey;
    }
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (limit) params.set("limit", limit);
    params.set("_t", Date.now());
    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`/api/submissions${query}`, {
      headers,
      cache: "no-store"
    });
    return await res.json();
  },

  async getArtwork(id) {
    const res = await fetch(`/api/submissions/${encodeURIComponent(id)}`);
    return await res.json();
  },

  async submitArtwork(data) {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async createSubmission(data) {
    return await this.submitArtwork(data);
  },

  async approveArtwork(id, adminKey) {
    const res = await fetch(`/api/submissions/${encodeURIComponent(id)}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      }
    });
    return await res.json();
  },

  async updateArtwork(id, data, adminKey) {
    const res = await fetch(`/api/submissions/${encodeURIComponent(id)}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async updateArtworkImage(id, imageDataUrl, adminKey) {
    const res = await fetch(`/api/submissions/${encodeURIComponent(id)}/update-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify({ image_data: imageDataUrl })
    });
    return await res.json();
  },

  async translateText(text, from = "auto", to = "en") {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, from, to })
    });
    return await res.json();
  },

  async rejectArtwork(id, adminKey) {
    const res = await fetch(`/api/submissions/${encodeURIComponent(id)}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      }
    });
    return await res.json();
  },

  async deleteArtwork(id, adminKey) {
    const res = await fetch(`/api/submissions/${encodeURIComponent(id)}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      }
    });
    return await res.json();
  },

  async deleteArtist(artistName, adminKey) {
    const res = await fetch(`/api/artists/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify({ artist_name: artistName })
    });
    return await res.json();
  },

  async updateArtist(oldArtistName, data, adminKey) {
    const res = await fetch(`/api/artists/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify({ old_artist_name: oldArtistName, ...data })
    });
    return await res.json();
  },

  async getCatalogConfig() {
    const res = await fetch("/api/catalog-config?_t=" + Date.now());
    return await res.json();
  },

  async saveCatalogConfig(config, adminKey) {
    const res = await fetch("/api/catalog-config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify({ config })
    });
    return await res.json();
  }
};

window.EventAPI = EventAPI;
