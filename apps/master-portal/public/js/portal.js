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

  async provisionEvent(data, adminKey) {
    const res = await fetch("/api/events/provision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async pullArtworks(eventId = null) {
    const res = await fetch("/api/sync/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventId ? { event_id: eventId } : {})
    });
    return await res.json();
  }
};

window.MasterPortalAPI = MasterPortalAPI;
