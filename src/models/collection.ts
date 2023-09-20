export class Collection {
  constructor(app, routeName) {
    this.routeModel(app, routeName); // Player.routeModel(app, 'player');
  }

  async create(req, res) { // json
    console.log(`RESTER ROLE: ${req.user.role}`);
    if (req.user?.role === 'admin' || req.user?.role === 'editor' || req.user?.role === 'writer') {
      try {
        //TODO: create file
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    } else {
      res.status(403).send('Unauthorized action');
    }
  }
  //cosmic python book
  async read(req, res) {
    if (req.user?.role === 'user') {
      let records = null;
      const options = {};
      const id = req.params.id;
      try {
        if (id) {
          options['where'] = { id };
          records = 'found stuff'//TODO: read singular
        } else {
          records = 'found stuff'//TODO: read plural
        } 
        res.status(200).send(records);
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(403).send('Unauthorized action');
    }
  }

  async update(req, res) {
    if (req.user?.role === 'admin' || req.user?.role === 'editor') {
      const id = req.params.id;
      try {
        if (!id) throw new Error('No target ID');
        //TODO: update file
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(403).send('Unauthorized action');
    }
  }

  async delete(req, res) {
    if (req.user?.role == 'admin') {
      const id = req.params.id;
      try {
        if (!id) throw new Error('No target ID');
        //TODO: delete file
        res.status(200).send('destroyed');
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(403).send('Unauthorized action');
    }
  }

  routeModel = (app, routeName) => { // app.get('/player', (req, res) => Player.read(req, res));
    app.get(`/${routeName}`, (req, res) => this.read(req, res)); // callback needs an arrow function to capture this
    app.post(`/${routeName}`, (req, res) => this.create(req, res));
    app.get(`/${routeName}/:id`, (req, res) => this.read(req, res));
    app.put(`/${routeName}/:id`, (req, res) => this.update(req, res));
    app.delete(`/${routeName}/:id`, (req, res) => this.delete(req, res));
  };
}
//module.exports = Collection;