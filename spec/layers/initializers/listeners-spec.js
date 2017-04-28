import listenersHub from '../../../app/services/listeners-hub';
import ListenersInitializer from '../../../app/initializers/listeners';

describe('listeners initializer', () => {
  const email = 'user-sample@sensors.com';
  const password = 'my-secret-password';

  beforeEach(() => setup()
    .then(() => listenersHub.reset()));

  describe('#load', () => {
    context('when there are persisted sensors in the database', () => {
      beforeEach(() => User.create({ email, password })
        .then(user => Sensor.create({ boardId: '0123', description: 'living room', UserId: user.id }))
        .then(sensor => Alert.create({ SensorId: sensor.id, message: 'Motion detected', seen: false })),
      );

      it('adds a listener for each sensor', () => {
        const listenersInitializer = new ListenersInitializer({ sensor: Sensor, alert: Alert });
        return listenersInitializer.load()
          .then(() => {
            expect(listenersHub.all()).to.have.length(1);
          });
      });
    });
  });
});
