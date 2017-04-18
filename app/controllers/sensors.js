import ApplicationController from './application';
import SensorSerializer from '../serializers/sensor';

export default class SensorsController extends ApplicationController {
  constructor(app) {
    const Sensor = app.get('datasource').models.Sensor;
    const sensorSerializer = new SensorSerializer();

    super({
      model: Sensor,
      serializer: sensorSerializer.buildSerializer(),
      deserializer: SensorSerializer.buildDeserializer(),
    });

    this.Sensor = Sensor;
  }

  static mountObj(userId, data) {
    return { description: data.description, boardId: data['board-id'], UserId: userId };
  }

  create(userId, data) {
    return this.deserialize(data)
      .then(dsData => SensorsController.mountObj(userId, dsData))
      .then(mountedObj => this.model.create(mountedObj))
      .then(record => this.serialize(record))
      .then(ApplicationController.created)
      .catch(err => ApplicationController.jsonApiError(400, err));
  }

  deleteById(userId, id) {
    return this.model.destroy({
      where: { id, UserId: userId },
    })
      .then(SensorsController.throwIfNotDeleted)
      .then(SensorsController.noContent)
      .catch(SensorsController.notFound);
  }
}
