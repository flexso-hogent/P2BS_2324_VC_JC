namespace my.events;

entity Events {
  key eventID      : Integer @cds.autoincrement;
      naam         : String;
      beschrijving : String;
      datum        : Date;
      beginTijd    : Time;
      eindTijd     : Time;
      locatie      : String;
      sessies      : Association to many Sessions
                       on sessies.event = $self;
}

entity Sessions {
  key sessieID     : Integer @cds.autoincrement;
      naam         : String;
      type         : String;
      beschrijving : String;
      spreker      : String;
      datum        : Date;
      beginTijd    : Time;
      eindTijd     : Time;
      lokaalnummer : String;
      event        : Association to Events;
      //deelnemers   : Association to many Users on deelnemers.sessies = $self;
}

entity SessionParticipants {
  key participantID : Integer @cds.autoincrement;
      sessieID     : Integer;
      userEmail    : String(100);
      sessies      : Association to Sessions on sessies.sessieID = sessieID;
      deelnemers  : Association to Users on deelnemers.mail = userEmail;
}
entity Users {
  key mail       : String(100) not null; // Mail als primaire sleutel
      voornaam   : String(50);
      achternaam : String(50);
      bedrijf    : String(100);
      titel      : String(50);
      stad       : String(50);
      rol        : String;
      //sessies    : Association to many Sessions on sessies.deelnemers = $self;
}
