

import { Nlp } from '@nlpjs/nlp';

// Other imports...


const manager = new Nlp({ languages: ['it'], nlu: { useNoneFeature: true } });

// Rest of the code, using nlp instead of manager...

// Aggiungi un gestore di intenti per la tua festa
manager.addDocument('it', 'Quando è la festa?', 'party.date');
manager.addDocument('it', 'Dove si terrà la festa?', 'party.location');
manager.addDocument('it', 'Dove è la festa?', 'party.location');
manager.addDocument('it', 'Qual è il tema della festa?', 'party.theme');
manager.addDocument('it', 'Ci si deve vestire a tema?', 'party.dressCode');
manager.addDocument('it', 'Posso vestirmi da Joker?', 'party.noJoker');
manager.addDocument('it', 'Quante disoneste ci sono?', 'party.disoneste');
manager.addDocument('it', 'Chi è la più disonesta?', 'party.gelao');
manager.addDocument('it', 'Grazie', 'party.welcome');

manager.addAnswer('it', 'party.date', 'La festa sarà il 20 dicembre alle ore 20:30.');
manager.addAnswer('it', 'party.location', 'La festa si terrà a Sensorya. Ecco a te la posizione,brutto scemo');
manager.addAnswer('it', 'party.theme', 'Il tema della festa è Comics');
manager.addAnswer('it', 'party.disoneste', 'Almeno cinque');
manager.addDocument('it', 'party.gelao', 'Ale Gelao');
manager.addAnswer('it', 'party.dressCode', 'Tutti devono obbligatoriamente travestirsi a tema Marvel, DC o anime!');
manager.addAnswer('it', 'party.noJoker', 'Spiacente, ma il travestimento da Joker non è consentito. Scegli un altro personaggio!');
manager.addAnswer('it', 'party.welcome', 'Prego!');

// Add fun responses for unexpected questions
manager.addAnswer('it', 'None', 'Non sono sicuro, prova a chiedermi qualcosa sulla festa!');

const trainNlp = async () => {
  await manager.train();
  manager.save();
};

trainNlp();

export const getResponse = async (input) => {
  const response = await manager.process('it', input);
  return response.answer;
};
