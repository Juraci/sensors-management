import ApplicationSerializer from './application';
import AlertSerializer from './alert';

export default class SensorSerializer extends ApplicationSerializer {
  constructor() {
    super({
      type: 'sensors',
      attributes: ['boardId', 'description'],
      relationships: [new AlertSerializer()],
    });
  }
}
