using my.events as my from '../db/data-model';

service EventService {
  entity Events    as projection on my.Events;
  entity Sessions  as projection on my.Sessions;
  entity Users     as projection on my.Users;
  entity SessionParticipants as projection on my.SessionParticipants;
  entity Feedback as projection on my.Feedback;
}
