import Discord from 'discord.js';
import rp from 'request-promise';
import {test} from './lib/test';
import dotenv from 'dotenv';
dotenv.config();


const client = new Discord.Client();
let point, temp;
let limit = 0;
let talk = '';

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg  => {
  if (msg.content[0] === '+' && limit < 4000) {
    if(msg.content.indexOf(' ') != -1){ 
      limit++;
      point = await test(msg.content.substring(1));
      if (point == 1) {
        talk = '와 존나 긍정적이네';
      }else if(point == 0){
        talk = '아니 적어도 긍정 부정 둘중에 하나는 해야지';
      }else if(point == -1){
        await rp(process.env.hangang, {json: true})
        .then(response => {temp =  response['temp'];});
        talk = `현재 한강물의 온도는 ${temp}도 입니다.`;
      }else{
        talk = 'ㅅㅂ 이게 에러나냐';
      }
    }else{
      talk = '문장으로 얘기해 주세요. 영어면 더 좋음';
    }

    await msg.reply(talk);
  }
});

client.login(process.env.token);