import SensorsController from '../../../app/controllers/sensors';
import listenersHub from '../../../app/services/listeners-hub';
import SseClient from '../../../app/services/sse-client';

describe('SensosrsController', () => {
  let datasource;
  const email = 'user-sample@sensors.com';
  const password = 'my-secret-password';

  beforeEach(() => setupDatasource()
    .then((ds) => {
      datasource = ds;
    })
    .then(() => destroyAll(datasource))
    .then(() => listenersHub.reset()));

  describe('#findAll', () => {
    context('for an existing user that has one sensor', () => {
      let user;

      beforeEach(() => datasource.models.User.create({ email, password })
        .then((record) => {
          user = record;
        })
        .then(() => datasource.models.Sensor.create({ boardId: '0123', description: 'living room', UserId: user.id }))
        .then(sensor => datasource.models.Alert.create({ SensorId: sensor.id, message: 'Motion detected', seen: false })),
      );

      it('returns the sensors', () => {
        const sensorsController = new SensorsController(app);
        const query = { UserId: user.id };
        return sensorsController.findAll(query)
          .then((result) => {
            expect(result.status).to.be.equal(200);
            const body = result.data;
            expect(body.data).to.have.length(1);
            const record = body.data[0];
            expect(record.type).to.be.equal('sensors');
            expect(record.attributes).to.have.keys(['board-id', 'description']);
            expect(body).to.have.property('included');
          });
      });
    });
  });

  describe('#create', () => {
    const sensor = {
      data: {
        attributes: {
          description: 'Garage sensor',
          'board-id': '1231l23k12lkKÇLJKÇLSK230oKOKS93jnnJH',
        },
        type: 'sensors',
      },
    };

    let user;

    beforeEach(() => datasource.models.User.create({ email, password })
      .then((record) => {
        user = record;
      }),
    );

    it('creates the sensors', () => {
      const sensorsController = new SensorsController(app);
      const userId = user.id;
      return sensorsController.create(userId, sensor)
        .then((result) => {
          expect(result.status).to.be.equal(201);
          const body = result.data;
          expect(body.data.type).to.be.equal('sensors');
          expect(body.data.attributes).to.have.keys(['board-id', 'description']);
          expect(body.data.attributes['board-id']).to.be.equal(sensor.data.attributes['board-id']);
        });
    });

    it('creates a sse listener for this sensor', () => {
      const sensorsController = new SensorsController(app, listenersHub);
      const userId = user.id;
      return sensorsController.create(userId, sensor)
        .then((result) => {
          expect(result.status).to.be.equal(201);
          expect(listenersHub.all()).to.have.length(1);
        });
    });
  });

  describe('#deleteById', () => {
    let user;
    let sensor;

    beforeEach(() => datasource.models.User.create({ email, password })
      .then((record) => {
        user = record;
      })
      .then(() => datasource.models.Sensor.create({ boardId: '0123', description: 'living room', UserId: user.id }))
      .then((newSensor) => {
        sensor = newSensor;
      }),
    );

    it('deletes the sensor', () => {
      const sseC = new SseClient({
        boardId: '0123',
        sensorId: sensor.id,
        model: datasource.models.Alert,
      });
      listenersHub.add(sseC);
      const sensorsController = new SensorsController(app, listenersHub);
      return sensorsController.deleteById(user.id, sensor.id)
        .then((result) => {
          expect(result.status).to.be.equal(204);
          expect(listenersHub.all()).to.have.length(0);
        });
    });
  });
});
