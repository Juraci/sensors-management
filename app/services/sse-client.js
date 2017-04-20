import Es from 'eventsource';
import config from '../config/config';

export default class SseClient {
  constructor(boardId, EventSource = Es) {
    this.source = new EventSource(`${config.sse}/cards/${boardId}/stream`);
    this.boardId = boardId;
  }

  subscribe() {
    this.source.on('message', (e) => {
      if (e.data !== 'sse ready') {
        console.log(`${this.boardId} ${e.data}`);
      }
    });
  }

  close() {
    this.source.close();
  }

  getBoardId() {
    return this.boardId;
  }
}
