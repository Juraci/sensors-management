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
}
