using my.events as my from '../db/data-model';

service EventService {
  entity Evenementen @readonly as projection on my.Evenementen;
  entity Sessies @readonly as projection on my.Sessies;
  entity Gebruikers @readonly as projection on my.Gebruikers;
}





/* service CatalogService {
  entity Evenement {
    key eventID : UUID;
    naam   : String;
    beschrijving: String;
    datum    : DateTime;
    locatie: String;
    sessies: Association to Sessie;
  }

  entity Sessie {
    key sessieID : UUID;
    naam  : String;
    beschrijving: String;
    spreker: String;
    datum: DateTime;
    lokaalnummer: String;
    event : Association to Evenement;
    aanwezigeGebruikers: Association to Gebruiker;
  }

  entity Gebruiker {
    key mail: String(100) not null; // Mail als primaire sleutel
    voornaam: String(50);
    achternaam: String(50);
    bedrijf: String(100);
    titel: String(50);
    stad: String(50);
    rol: String;
    }

}
 */