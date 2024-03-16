# Use Case: Registreren

**Primaire actor:** Gebruiker

**Stakeholders:** /

**Precondities:** De gebruiker is niet geregistreerd in het systeem

**Postcondities:** Het systeem heeft de gebruiker geregistreerd en
ingelogd

## **Normaal verloop:**

1.  De gebruiker wenst zich te registreren

2.  Het systeem toont het registratieformulier

3.  De gebruiker vult minimaal alle vereiste velden in

4.  Het systeem valideert de ingevulde gegevens volgens
    DR_Verplichte_Velden_Ingevuld en DR_Geldig_Paswoord

5.  Het systeem registreert de gebruiker en logt deze automatisch in

6.  Het systeem toont een overzicht gebaseerd op de rol van de gebruiker

## **Alternatieve verlopen:**

4A. Het systeem detecteert dat de ingevulde gegevens niet voldoen aan
DR_Velden_Ingevuld, DR_Geldig_Paswoord

> 4A1. Het systeem toont een gepaste melding
>
> 4A2. Het systeem keert terug naar stap 2 van het normaal verloop

## **Domeinspecifieke regels:**

**DR_Verplichte_Velden_Ingevuld**

Volgende velden op het registratieformulier moeten verplicht ingevuld
zijn:\
Voornaam, achternaam, bedrijf, titel, stad, mail, paswoord.

**DR_Geldig_Paswoord**

Het ingevoerde e-mailadres moet geldig zijn, en het wachtwoord moet
overeenkomen met de bevestiging van het wachtwoord.
