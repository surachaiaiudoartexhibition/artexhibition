/**
 * Master Portal Client API Helper
 */

const MasterPortalAPI = {
  async getArtworks(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.event_id) searchParams.append("event_id", params.event_id);
    if (params.q) searchParams.append("q", params.q);
    if (params.limit) searchParams.append("limit", params.limit);
    if (params.offset) searchParams.append("offset", params.offset);

    const queryString = searchParams.toString() ? `?${searchParams.toString()}` : "";
    const res = await fetch(`/api/artworks${queryString}`);
    return await res.json();
  },

  async getEvents() {
    const res = await fetch("/api/events");
    return await res.json();
  },

  async registerEvent(data, adminKey) {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async updateEvent(data, adminKey) {
    try {
      const res = await fetch("/api/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey
        },
        body: JSON.stringify(data)
      });
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch (parseErr) {
        return { success: false, error: `Server returned non-JSON response (${res.status}): ${text.slice(0, 100) || res.statusText}` };
      }
    } catch (netErr) {
      return { success: false, error: `Network connection error: ${netErr.message}` };
    }
  },

  async deleteEvent(eventId, adminKey) {
    try {
      const res = await fetch(`/api/events?event_id=${encodeURIComponent(eventId)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey
        }
      });
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch (parseErr) {
        return { success: false, error: `Server returned non-JSON response (${res.status}): ${text.slice(0, 100) || res.statusText}` };
      }
    } catch (netErr) {
      return { success: false, error: `Network connection error: ${netErr.message}` };
    }
  },

  async provisionEvent(data, adminKey) {
    try {
      const res = await fetch("/api/events/provision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey
        },
        body: JSON.stringify(data)
      });
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch (parseErr) {
        return { success: false, error: `Server returned non-JSON response (${res.status}): ${text.slice(0, 100) || res.statusText}` };
      }
    } catch (netErr) {
      return { success: false, error: `Network connection error: ${netErr.message}` };
    }
  },

  async pullArtworks(eventId = null, adminKey = "") {
    const res = await fetch("/api/sync/pull", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify(eventId ? { event_id: eventId } : {})
    });
    return await res.json();
  }
};

window.MasterPortalAPI = MasterPortalAPI;
