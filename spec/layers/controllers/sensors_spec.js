import SensorsController from '../../../app/controllers/sensors';

describe('SensosrsController', () => {
  let datasource;
  const email = 'user-sample@sensors.com';
  const password = 'my-secret-password';

  beforeEach(() => setupDatasource()
    .then((ds) => {
      datasource = ds;
    })
    .then(() => destroyAll(datasource)));

  describe('#findAll', () => {
    context('for an existing user that has one sensor', () => {
      let user;

      beforeEach(() => datasource.models.User.create({ email, password })
        .then((record) => {
          user = record;
        })
        .then(() => datasource.models.Sensor.create({ boardId: '0123', description: 'living room', UserId: user.id })),
      );

      it('returns the sensors', () => {
        const sensorsController = new SensorsController(app);
        const query = { UserId: user.id };
        return sensorsController.findAll(query)
          .then((result) => {
            expect(result.status).to.be.equal(200);
            const body = result.data;
            expect(body.data).to.have.length(1);
            expect(body.data[0].type).to.be.equal('sensors');
            expect(body.data[0].attributes).to.have.keys(['board-id', 'description']);
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
        });
    });
  });
});
