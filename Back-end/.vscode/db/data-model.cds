namespace my.events;

entity Evenementen {
  key eventID : UUID;
  naam   : String;
  beschrijving: String;
  datum    : DateTime;
  locatie: String;
  sessies: Association to many Sessies on sessies.event = $self;
}

entity Sessies {
  key sessieID : UUID;
  naam  : String;
  beschrijving: String;
  spreker: String;
  datum: DateTime;
  lokaalnummer: String;
  event : Association to Evenementen;
  aanwezigeGebruikers: Association to many Gebruikers //on aanwezigeGebruikers.sessie = $self;
}

entity Gebruikers {
  key mail: String(100) not null; // Mail als primaire sleutel
  voornaam: String(50);
  achternaam: String(50);
  bedrijf: String(100);
  titel: String(50);
  stad: String(50);
  rol: String;
}
