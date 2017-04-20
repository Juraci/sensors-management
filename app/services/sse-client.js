import Es from 'eventsource';

export default class SseClient {
  constructor(boardId, EventSource = Es) {
    this.source = new EventSource(`https://nodemcu-listener.herokuapp.com/cards/${boardId}/stream`);
    this.boardId = boardId;
  }

  subscribe() {
    this.source.on('message', (e) => {
      if (e.data !== 'sse ready') {
        console.log(e.data);
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
