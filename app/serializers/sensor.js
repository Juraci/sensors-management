import ApplicationSerializer from './application';

export default class SensorSerializer extends ApplicationSerializer {
  constructor() {
    super({
      type: 'sensors',
      attributes: ['boardId', 'description'],
    });
  }
}
