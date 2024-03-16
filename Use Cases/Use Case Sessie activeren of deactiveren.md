# Use Case: Sessies Activeren/Deactiveren door Beheerder

**Primaire actor:** Beheerder

**Stakeholders:** /

**Precondities:** De beheerder heeft de nodige rechten, is ingelogd in het systeem en er bestaan sessies die kunnen worden geactiveerd of gedeactiveerd.

**Postcondities:** Het systeem heeft de status van de sessies aangepast.

## **Normaal verloop:**

1.  De beheerder wenst een of meerdere sessies te activeren of
    deactiveren.

2.  Het systeem toont een lijst met beschikbare sessies waaruit de
    beheerder kan kiezen.

3.  De beheerder selecteert de sessie(s) die hij wil activeren of
    deactiveren.

4.  Het systeem toont de huidige status van de geselecteerde sessie(s)
    en biedt de optie om de status te wijzigen.

5.  De beheerder kiest voor activeren of deactiveren.

6.  Het systeem valideert de wijziging volgens DR_Sessie_Deactiveerbaar

7.  Het systeem past de status van de sessie(s) aan.

8.  Het systeem toont een bevestigingsbericht van de succesvolle
    activering/deactivering.

## **Alternatieve verlopen:**

6A. Het systeem detecteert ongeldige activerings/deactiveringspogingen
volgens DR_Sessie_Deactiveerbaar.

> 6A1. Het systeem toont een gepaste melding.
>
> 6A2. Het systeem keert terug naar stap 4 van het normale verloop.

## **Domeinspecifieke regels:**

**DR_Sessie_Deactiveerbaar**

De sessie kan alleen gedeactiveerd worden als deze nog niet begonnen is.
