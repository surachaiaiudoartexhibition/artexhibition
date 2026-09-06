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

  async getSubmissions(status = "approved", adminKey = null) {
    const headers = {};
    if (adminKey) {
      headers["x-admin-key"] = adminKey;
    }
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    const res = await fetch(`/api/submissions${query}`, { headers });
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

  async rejectArtwork(id, adminKey) {
    const res = await fetch(`/api/submissions/${encodeURIComponent(id)}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      }
    });
    return await res.json();
  }
};

window.EventAPI = EventAPI;
