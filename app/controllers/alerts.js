import ApplicationController from './application';

export default class AlertsController extends ApplicationController {
  constructor(app) {
    const Alert = app.get('datasource').models.Alert;

    super({
      model: Alert,
    });
  }

  static destroyRecord(record) {
    return record.destroy();
  }

  deleteById(/* userId,*/ id) {
    return this.model.find({
      where: { id },
    })
      .then(AlertsController.throwIfNotFound)
      .then(AlertsController.destroyRecord)
      .then(AlertsController.noContent)
      .catch(AlertsController.notFound);
  }
}
