import ApplicationController from './application';
import SensorSerializer from '../serializers/sensor';
import listenersHub from '../services/listeners-hub';
import SseClient from '../services/sse-client';

export default class SensorsController extends ApplicationController {
  constructor(app, listenersManager = listenersHub, SseConsumer = SseClient) {
    const Sensor = app.get('datasource').models.Sensor;
    const Alert = app.get('datasource').models.Alert;
    const sensorSerializer = new SensorSerializer();

    super({
      model: Sensor,
      serializer: sensorSerializer.buildSerializer(true),
      deserializer: SensorSerializer.buildDeserializer(),
      relations: [{ model: Alert, as: 'alerts' }],
    });

    this.Sensor = Sensor;
    this.Alert = Alert;
    this.listenersHub = listenersManager;
    this.SseClient = SseConsumer;
  }

  static mountObj(userId, data) {
    return { description: data.description, boardId: data['board-id'], UserId: userId };
  }

  static destroyRecord(record) {
    return record.destroy();
  }

  createListener(record) {
    const sseClient = new this.SseClient({
      boardId: record.boardId,
      sensorId: record.id,
      model: this.Alert,
    });
    this.listenersHub.add(sseClient);
    return record;
  }

  removeListener(record) {
    this.listenersHub.remove(record.boardId);
    return record;
  }

  create(userId, data) {
    return this.deserialize(data)
      .then(dsData => SensorsController.mountObj(userId, dsData))
      .then(mountedObj => this.model.create(mountedObj))
      .then(record => this.createListener(record))
      .then(record => this.serialize(record))
      .then(ApplicationController.created)
      .catch(err => ApplicationController.jsonApiError(400, err));
  }

  deleteById(userId, id) {
    return this.model.find({
      where: { id, UserId: userId },
    })
      .then(SensorsController.throwIfNotFound)
      .then(record => this.removeListener(record))
      .then(SensorsController.destroyRecord)
      .then(SensorsController.noContent)
      .catch(SensorsController.notFound);
  }
}
