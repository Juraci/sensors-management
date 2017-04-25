import ApplicationController from './application';

export default class AlertsController extends ApplicationController {
  constructor(app) {
    const Alert = app.get('datasource').models.Alert;
    const Sensor = app.get('datasource').models.Sensor;

    super({
      model: Alert,
    });

    this.Sensor = Sensor;
  }

  static destroyRecord(record) {
    return record.destroy();
  }

  deleteById(userId, id) {
    return this.model.find({
      where: { id },
      include: [{ model: this.Sensor, where: { UserId: userId } }],
    })
      .then(AlertsController.throwIfNotFound)
      .then(AlertsController.destroyRecord)
      .then(AlertsController.noContent)
      .catch(AlertsController.notFound);
  }
}
