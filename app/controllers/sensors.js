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
    return { description: data.description, UserId: userId };
  }

  create(userId, data) {
    return this.deserialize(data)
      .then(dsData => SensorsController.mountObj(userId, dsData))
      .then(mountedObj => this.model.create(mountedObj))
      .then(record => this.serialize(record))
      .then(serializedObj => ApplicationController.created(serializedObj))
      .catch(err => ApplicationController.jsonApiError(400, err));
  }
}
