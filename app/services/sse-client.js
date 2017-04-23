import Es from 'eventsource';
import config from '../config/config';

export default class SseClient {
  constructor({ boardId, sensorId, model }, EventSource = Es) {
    this.source = new EventSource(`${config.sse}/cards/${boardId}/stream`);
    this.boardId = boardId;
    this.sensorId = sensorId;
    this.model = model;
  }

  subscribe() {
    this.source.on('message', (e) => {
      if (e.data !== 'sse ready') {
        this.model.create({ SensorId: this.sensorId, message: e.data, seen: false });
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
