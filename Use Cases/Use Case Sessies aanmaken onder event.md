
# Use Case: Sessies Aanmaken door Beheerder onder een Evenement"


**Primaire actor:** Beheerder

**Stakeholders:** /

**Precondities:** De beheerder heeft de nodige rechten, is ingelogd in
het systeem en er bestaat minimaal één evenement waar
sessies aan gekoppeld kunnen worden.

**Postcondities:** Het systeem heeft de sessies aangemaakt en gekoppeld
aan het geselecteerde evenement.

## **Normaal verloop:**

1.  De beheerder wenst één of meerdere sessies aan te maken onder een
    bestaand evenement.

2.  Het systeem toont een lijst met beschikbare evenementen waar sessies
    aan gekoppeld kunnen worden.

3.  De beheerder selecteert het gewenste evenement.

4.  Het systeem toont het formulier voor het aanmaken van sessies met de
    vereiste velden

5.  De beheerder vult alle vereiste velden in.

6.  Het systeem valideert de ingevulde gegevens volgens de
    domeinspecifieke regels DR_Velden_Ingevuld, DR_Geldige_Datum,
    DR_Correcte_Tijdsinterval.

7.  Het systeem maakt de sessies aan en koppelt deze aan het
    geselecteerde evenement.

8.  Het systeem toont een bevestigingsbericht van de succesvolle aanmaak
    van de sessies.

## **Alternatieve verlopen:**

6A. Het systeem detecteert dat de ingevulde gegevens niet voldoen aan
DR_Velden_Ingevuld, DR_Geldige_Datum, DR_Correcte_Tijdsinterval.

> 6A1. Het systeem toont een gepaste melding.
>
> 6A2. Het systeem keert terug naar stap 4 van het normaal verloop.

## **Domeinspecifieke regels:**

**DR_Velden_Ingevuld**

Alle verplichte velden op het formulier voor het aanmaken van sessies
moeten ingevuld zijn:\
sessienaam, datum, starttijd, eindtijd, locatie, beschrijving.

**DR_Geldige_Datum**

De ingevoerde datum moet in de toekomst liggen en geldig zijn.

**DR_Correcte_Tijdsinterval**

De ingevoerde start- en eindtijd moeten een correct tijdsinterval vormen
(eindtijd na starttijd).
