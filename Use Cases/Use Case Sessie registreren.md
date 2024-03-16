# Use Case: Gebruiker Registreren voor Sessies

**Primaire actor:** Gebruiker

**Stakeholders:** /

**Precondities:** De gebruiker is ingelogd in het systeem en er zijn sessies beschikbaar om aan deel te nemen.

**Postcondities:** De gebruiker is geregistreerd voor de geselecteerde sessies.

## **Normaal verloop:**

1.  De gebruiker wenst zich te registreren voor een of meerdere sessies.

2.  Het systeem toont een lijst met beschikbare sessies waaruit de
    gebruiker kan kiezen.

3.  De gebruiker selecteert de sessie(s) waarvoor hij zich wil
    registreren.

4.  Het systeem toont een overzicht van de geselecteerde sessies en
    vraagt om de registratie te bevestigen.

5.  De gebruiker bevestigt de registratie.

6.  Het systeem valideert de registratie volgens DR_Sessie_Ingeschreven.

7.  Het systeem registreert de gebruiker voor de geselecteerde sessies.

8.  Het systeem toont een bevestigingsbericht van de succesvolle
    registratie.

## **Alternatieve verlopen:**

6A. Het systeem detecteert dat een van de geselecteerde sessies niet
registreerbaar is.

> 6A1. Het systeem toont een gepaste melding.
>
> 6A2. Het systeem keert terug naar stap 2 van het normale verloop.

## **Domeinspecifieke regels:**

**DR_Sessie_Ingeschreven**

Er moeten nog beschikbare plaatsen zijn om ingeschreven te kunnen worden
op een sessie.
