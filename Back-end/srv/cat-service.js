module.exports = (srv) => {

  // Reply mock data for Events
  srv.on ('READ', 'Events', ()=>[
    { eventID:1, naam: 'Conferentie over Kunstmatige Intelligentie', beschrijving: 'Een conferentie gewijd aan de nieuwste ontwikkelingen op het gebied van AI.', datum: '2024-06-15T09:00',locatie: 'Gent' },
    { eventID:2, naam: 'Workshop over Machine Learning', beschrijving: 'Een praktische workshop om de basis van machine learning te leren.',datum: '2024-06-25T13:00', locatie: 'Gent' },
    { eventID:3, naam: 'Data Science Summit', beschrijving: 'Een bijeenkomst van experts om de laatste trends en toepassingen in data science te bespreken.', datum:'2024-06-20T10:00:00Z', locatie: 'Aalst' }
  ])

  // Reply mock data for Sessions
  srv.on ('READ', 'Sessions', ()=>[
    { sessieID:1, naam: 'Introductie tot AI', beschrijving:'Een introductie tot de basisconcepten van kunstmatige intelligentie.', spreker:'John Doe',datum:'2024-06-15T09:00',lokaalnummer:'A2',eventID:1 },
    { sessieID:2, naam:'Toepassingen van ML in de industrie',beschrijving:'Een diepgaande analyse van machine learning-toepassingen in verschillende industrieën.',spreker:'Jane Smith', datum:'2024-06-15T10:00', lokaalnummer:'A4', eventID:1 },
    { sessieID:3, naam:'Machine Learning in de gezondheidszorg',beschrijving:'Een verkenning van machine learning-toepassingen in de medische sector.',spreker: 'Alice Johnson', datum:'2024-06-15T10:00', lokaalnummer:'A1', eventID:1 },
    { sessieID:4, naam:'Introductie tot neurale netwerken',beschrijving:'Een overzicht van de basisprincipes en toepassingen van neurale netwerken.',spreker:'David Brown',datum:'2024-06-25T13:00',lokaalnummer:'B1',eventID:2 },
    { sessieID:5, naam:'Praktische toepassingen van deep learning',beschrijving:'Een hands-on workshop over het implementeren van deep learning-modellen.',spreker:'Emma Wilson',datum:'2024-06-25T14:00',lokaalnummer:'B2',eventID:2 },
    { sessieID:6, naam:'Machine Learning Operations (MLOps) best practices',beschrijving:'Een bespreking van best practices voor het beheren van machine learning-modellen in productie.',spreker:'Michael Lee',datum:'2024-06-25T15:00',lokaalnummer:'B3',eventID:2 },
    { sessieID:7, naam:'Big Data-analyse in de zakelijke omgeving',beschrijving:'Een analyse van hoe big data de besluitvorming in bedrijven beïnvloedt.',spreker:'Sophia Garcia',datum:'2024-06-20T10:00',lokaalnummer:'C1',eventID:3 },
    { sessieID:8, naam:'Data Mining in actie',beschrijving:'Een demonstratie van data mining-technieken en -tools.',spreker:'Daniel Martinez',datum:'2024-06-20T11:00',lokaalnummer:'C2',eventID:3 },
    { sessieID:9, naam:'Data Science in de financiële sector',beschrijving:'Een verkenning van data science-toepassingen in de financiële dienstverlening.',spreker:'Olivia Adams',datum:'2024-06-20T12:00',lokaalnummer:'C3',eventID:3 },
  ])

  // Reply mock data for Users
  srv.on ('READ', 'Users', ()=>[
    { mail:'john.doe@example.com', voornaam:'John',achternaam:'Doe', bedrijf:'XYZ Corp',titel:'Data Scientist',stad:'Antwerpen',rol:'Deelnemer' },
    { mail:'jane.smith@example.com', voornaam:'Jane',achternaam:'Smith', bedrijf:'ABC Inc',titel:'Machine Learning Engineer',stad:'Gent',rol:'Organisator' },
    { mail:'emily.johnson@example.com', voornaam:'Emily',achternaam:'Johnson', bedrijf:'Data Insights Ltd',titel:'Data Analyst',stad:'Hasselt',rol:'Deelnemer' },
    { mail:'michael.brown@example.com', voornaam:'Michael',achternaam:'Brown', bedrijf:'BlockTech Solutions',titel:'Blockchain Developer',stad:'Brugge',rol:'Deelnemer' },
    { mail:'david.lee@example.com', voornaam:'David',achternaam:'Lee', bedrijf:'Cloud Innovations',titel:'Cloud Architect',stad:'Aalst',rol:'Organisator' },
  ])

}


/*const {Events} = cds.entities ('my.events')

// Reduce available places
srv.before ('CREATE', '')
}

*/


/*
const cds = require('@sap/cds');
module.exports = cds.service.impl(function() {
  this.before('CREATE', 'Event', async (req) => {
    const event = req.data;
    event.datum = new Date(event.datum);
  });

  this.after('READ', 'Event', (events) => {
    events.forEach(event => {
      event.locatie = event.locatie.toUpperCase();
    });
  });
});
}

*/