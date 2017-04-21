import ApplicationSerializer from './application';

export default class AlertSerializer extends ApplicationSerializer {
  constructor() {
    super({
      type: 'alerts',
      attributes: ['message', 'seen'],
    });
  }

  static buildDeserializer() {
    return ApplicationSerializer.buildDeserializer({
      sensors: {
        valueForRelationship: relationship => ({ id: relationship.id }),
      },
    });
  }
}
