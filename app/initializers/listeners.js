import listenersHub from '../services/listeners-hub';
import SseClient from '../services/sse-client';

export default class ListenersInitializer {
  constructor({ sensor, alert }, listenersManager = listenersHub, SseConsumer = SseClient) {
    this.Sensor = sensor;
    this.Alert = alert;
    this.listenersHub = listenersManager;
    this.SseClient = SseConsumer;
  }

  load() {
    return this.Sensor.findAll({})
      .then((records) => {
        records.forEach((record) => {
          console.log(`Starting listener for card: ${record.boardId} id: ${record.id}`);
          const sseClient = new this.SseClient({
            boardId: record.boardId,
            sensorId: record.id,
            model: this.Alert,
          });

          this.listenersHub.add(sseClient);
        });
      });
  }
}
