const language = require('@google-cloud/language');
import dotenv from 'dotenv';
dotenv.config();

const client = new language.LanguageServiceClient({projectId: process.env.id, keyFilename: process.env.file});

export const test = (async (text) => {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const [result] = await client.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

  if (sentiment.score >= 0.7) {
    return 1;
  }else if (sentiment.score < 0.7 && sentiment.score >= 0.2){
    return 0;
  }else if (sentiment.score < 0.2){
    return -1;
  }else{
    return;
  }
});
