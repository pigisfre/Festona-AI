import { Nlp } from '@nlpjs/nlp';

// Inizializza il manager NLP
const manager = new Nlp({ languages: ['it'], nlu: { useNoneFeature: true } });

// Aggiungi documenti e risposte relativi alla festa
manager.addDocument('it', 'Quando è la festa?', 'party.date');
manager.addDocument('it', 'Dove si terrà la festa?', 'party.location');
manager.addDocument('it', 'Qual è il tema della festa?', 'party.theme');
manager.addDocument('it', 'Ci si deve vestire a tema?', 'party.dressCode');
manager.addDocument('it', 'Posso vestirmi da Joker?', 'party.noJoker');
manager.addDocument('it', 'Quante disoneste ci sono?', 'party.disoneste');
manager.addDocument('it', 'Chi è la più disonesta?', 'party.gelao');
manager.addDocument('it', 'Grazie', 'party.welcome');

manager.addAnswer('it', 'party.date', 'La festa sarà il 20 dicembre alle ore 20:30.');
manager.addAnswer('it', 'party.location', 'La festa si terrà a Sensorya. Ecco a te la posizione, brutto scemo!');
manager.addAnswer('it', 'party.theme', 'Il tema della festa è Comics.');
manager.addAnswer('it', 'party.disoneste', 'Almeno cinque.');
manager.addAnswer('it', 'party.gelao', 'Ale Gelao.');
manager.addAnswer('it', 'party.dressCode', 'Tutti devono obbligatoriamente travestirsi a tema Marvel, DC o anime!');
manager.addAnswer('it', 'party.noJoker', 'Spiacente, ma il travestimento da Joker non è consentito. Scegli un altro personaggio!');
manager.addAnswer('it', 'party.welcome', 'Prego!');
manager.addAnswer('it', 'None', 'Non sono sicuro, prova a chiedermi qualcosa sulla festa!');

// Lista di trigger per gli insulti
const badWords = ['coglione', 'idiota', 'stupido', 'cretino', 'scemo', 'fesso','ricchione','frocio','stronzo'];

// Risposta per i messaggi sgradevoli
const handleBadWords = (input) => {
  for (const word of badWords) {
    if (input.toLowerCase().includes(word)) {
      return 'Non ci provare, so che stai cercando di insultare il mio padrone! Io sono FESTONA, e il coglione qui sei tu!';
    }
  }
  return null;
};

const trainNlp = async () => {
  await manager.train();
  manager.save();
};

trainNlp();

export const getResponse = async (input) => {
  // Controlla se il messaggio contiene insulti
  const badWordResponse = handleBadWords(input);
  if (badWordResponse) return badWordResponse;

  // Altrimenti usa NLP per rispondere
  const response = await manager.process('it', input);
  return response.answer;
};
