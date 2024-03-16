# Use Case: Event Aanmaken door Beheerder

**Primaire actor:** Beheerder

**Stakeholders:** /

**Precondities:** De beheerder heeft de nodige rechten en is ingelogd in het systeem

**Postcondities:** Het systeem heeft het evenement aangemaakt en de nodige informatie geregistreerd

## **Normaal verloop:**

1.  De beheerder wenst een nieuw evenement aan te maken

2.  Het systeem toont het formulier voor het aanmaken van een evenement

3.  De beheerder vult alle vereiste velden in

4.  Het systeem valideert de ingevulde gegevens volgens
    DR_Velden_Ingevuld, DR_Geldige_Datum

5.  Het systeem maakt het evenement aan en registreert de nodige
    informatie

6.  Het systeem toont een bevestigingsbericht van de succesvolle aanmaak
    van het evenement

## **Alternatieve verlopen:**

4A. Het systeem detecteert dat de ingevulde gegevens niet voldoen aan
DR_Velden_Ingevuld, DR_Geldige_Datum

> 4A1. Het systeem toont een gepaste melding
>
> 4A2. Het systeem keert terug naar stap 2 van het normaal verloop

## **Domeinspecifieke regels:**

**DR_Velden_Ingevuld**

Alle verplichte velden op het formulier voor het aanmaken van een
evenement moeten ingevuld zijn:\
sessienaam, startdatum, einddatum, starttijd, eindtijd, locatie,
beschrijving

**DR_Geldige_Datum**

De ingevoerde datum moet in de toekomst liggen
