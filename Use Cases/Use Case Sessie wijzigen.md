
# Use Case: Sessies Wijzigen door Beheerder


**Primaire actor:** Beheerder

**Stakeholders:** /

**Precondities:** De beheerder heeft de nodige rechten, is ingelogd in
het systeem en er bestaan sessies die kunnen worden gewijzigd.

**Postcondities:** Het systeem heeft de gewijzigde informatie van de
sessies opgeslagen.

## **Normaal verloop:**

1.  De beheerder wenst de informatie van een of meerdere sessies te
    wijzigen.

2.  Het systeem toont een lijst met beschikbare sessies waaruit de
    beheerder kan kiezen.

3.  De beheerder selecteert de sessie(s) die hij wil wijzigen.

4.  Het systeem toont het formulier met de huidige informatie van de
    geselecteerde sessie(s) en laat de beheerder de gewenste wijzigingen
    aanbrengen.

5.  De beheerder voert de gewenste wijzigingen in.

6.  Het systeem valideert de ingevoerde gegevens volgens <u>sessies
    aanmaken</u>.

7.  Het systeem slaat de gewijzigde informatie op en toont een
    bevestigingsbericht.

## **Alternatieve verlopen:**

6A. Het systeem detecteert ongeldige wijzigingen volgens <u>sessies
aanmaken</u>.

> 6A1. Het systeem toont een gepaste melding.
>
> 6A2. Het systeem keert terug naar stap 4 van het normale verloop.
