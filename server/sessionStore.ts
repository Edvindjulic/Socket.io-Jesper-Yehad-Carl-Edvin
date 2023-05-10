import { SocketData } from "./communication";

export default class InMemorySessionStore {
  private sessions = new Map<string, SocketData>();
  constructor() {
    this.sessions = new Map();
  }

  findSession(id: string) {
    return this.sessions.get(id);
  }

  saveSession(id: string, session: SocketData) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}
