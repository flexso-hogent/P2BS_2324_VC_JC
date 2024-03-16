# Use Case: Gebruiker Review Geven op Sessies

**Primaire actor:** Gebruiker

**Stakeholders:** /

**Precondities:** De gebruiker is ingelogd in het systeem, heeft
deelgenomen aan een of meerdere sessies en er is een mogelijkheid om
reviews achter te laten.

**Postcondities:** De review van de gebruiker is opgeslagen en
beschikbaar in het systeem.

## **Normaal verloop:**

1.  De gebruiker wenst een review te geven voor een of meerdere sessies
    waar hij aan heeft deelgenomen.

2.  Het systeem toont een lijst met sessies waarvoor de gebruiker een
    review kan achterlaten.

3.  De gebruiker selecteert de sessie(s) waarvoor hij een review wil
    geven.

4.  Het systeem toont een formulier waar de gebruiker zijn review kan
    invoeren, inclusief beoordeling en optionele opmerkingen.

5.  De gebruiker vult het reviewformulier in.

6.  Het systeem valideert de ingevoerde gegevens volgens de
    domeinspecifieke regels.

7.  Het systeem slaat de review op en koppelt deze aan de geselecteerde
    sessie(s).

8.  Het systeem toont een bevestigingsbericht van de succesvolle review.

## **Alternatieve verlopen:**

6A. Het systeem detecteert ongeldige reviewgegevens volgens
domeinspecifieke regels.

> 6A1. Het systeem toont een gepaste melding.
>
> 6A2. Het systeem keert terug naar stap 4 van het normale verloop.

**Domeinspecifieke regels:**

## **DR_Geldige_Beoordeling**

De beoordeling moet binnen een bepaald bereik liggen (bijvoorbeeld 1-5
sterren).

**DR_Opmerking_Limiet**

Optionele opmerkingen mogen een bepaalde lengte niet overschrijden.

**DR_Review_Per_Sessie**

Een gebruiker kan slechts één review per sessie achterlaten.
