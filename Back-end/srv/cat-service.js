// srv/event-service.js

module.exports = (srv) => {
    const { Users } = srv.entities;

    srv.before('CREATE', 'Users', async (req) => {
        const { mail, wachtwoord } = req.data;
        if (!mail || !wachtwoord) {
            req.error(400, 'Email and password are required');
        }
    });

    srv.on('CREATE', 'Users', async (req) => {
        console.log('Request data:', req.data);
        const { mail, wachtwoord, voornaam, achternaam, bedrijf, titel, stad, rol } = req.data;
        const existingUser = await SELECT.one.from(Users).where({ mail });
        if (existingUser) {
          req.error(400, 'User already exists');
        } else {
          const newUser = await INSERT.into(Users).entries({
            mail,
            wachtwoord,
            voornaam,
            achternaam,
            bedrijf,
            titel,
            stad,
            rol
          });
          console.log('New user created:', newUser);
          return newUser;
        }
      });
    }
