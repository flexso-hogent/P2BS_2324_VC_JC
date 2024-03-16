# Use Case: Inloggen

**Primaire actor**: gebruiker

**Stakeholders**: /

**Precondities**: <u>de gebruiker werd geregistreerd bij het systeem</u>

**Postcondities**: het systeem heeft de gebruiker ingelogd

## **Normaal verloop**:

1.  De gebruiker wenst zich in te loggen

2.  Het systeem vraagt de logingegevens van de gebruiker

3.  De gebruiker geeft email en paswoord in

4.  Het systeem valideert de gegevens volgens DR_Velden_Ingevuld,
    DR_Geldig_Paswoord

5.  Het systeem heeft de gebruiker ingelogd

6.  Het systeem toont een overzicht gebaseerd op de rol van de gebruiker

## **Alternatieve verlopen**:

4A. Het systeem detecteert dat de gegevens niet voldoen aan
DR_Velden_Ingevuld, DR_Geldig_Paswoord

> 4A1. Het systeem toont een gepaste melding
>
> 4A2. Het systeem keert terug naar stap 2 van het normaal verloop

## **Domeinspecifieke regels**:

**DR_Velden_Ingevuld**

Alle velden moeten ingevuld zijn

**DR_Geldig_Paswoord**

Het ingeven email adres en paswoord komen overeen
