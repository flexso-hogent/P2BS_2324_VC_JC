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
      deelnemers   : Association to SessionParticipants on deelnemers.sessieID = $self.sessieID;
      feedback     : Association to Feedback on feedback.sessieID = $self.sessieID;
}

entity SessionParticipants {
  key participantID : Integer @cds.autoincrement;
      sessieID     : Integer;
      userEmail    : String(100);
      sessies      : Association to Sessions on sessies.sessieID = $self.sessieID;
      user  : Association to Users on user.mail = $self.userEmail;
}
entity Users {
  key mail       : String(100) not null; // Mail als primaire sleutel
      voornaam   : String(50);
      achternaam : String(50);
      bedrijf    : String(100);
      titel      : String(50);
      stad       : String(50);
      wachtwoord : String(50);
      rol        : String;
      sessies    : Association to SessionParticipants on sessies.userEmail = $self.mail;
      feedback   : Association to Feedback on feedback.userEmail = $self.mail ;
}
entity Feedback {
  key feedbackID : Integer @cds.autoincrement;
      sessieID    : Integer;
      userEmail   : String(100);
      aantalSterren : Decimal(5);
      inhoud      : String;
      sessie      : Association to Sessions on sessie.sessieID = $self.sessieID;
      user        : Association to Users on user.mail = $self.userEmail;
}
