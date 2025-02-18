import fs from 'fs'

type UserToken = {
    name: string,
    token: string,
}

const userTokenList = new Map<string, string>();//user-token
const tokenUserList = new Map<string, string>();//token-user
const userLoginMap = new Map<string, number>();
const UserInsertMap = new Map<string, number>();

function getParamFromLine(get:string, linea :string) {
    // 1. Extraer la URL usando una expresión regular:
    const regexURL = /(\/[^\s]+)/; // Expresión regular para encontrar el path de la URL
    const matchURL = linea.match(regexURL);
  
    if (matchURL) {
      const urlPath = matchURL[0]; // Obtiene el path de la URL extraída
  
      // 2. Obtener el valor del parámetro 'uud' usando URLSearchParams:
      try {
        const url = new URL("https://ejemplo.com" + urlPath); // Crear una URL ficticia para usar URLSearchParams
        const params = new URLSearchParams(url.search);
        const ret = params.get(get);
        console.log(`${get}: `,ret)
        return ret==null?"":ret;
      } catch (error) {
        console.error("Path de URL inválido:", error);
        return "";
      }
    } else {
      return ""; // Si no se encuentra un path de URL, devuelve null
    }
}
function processUser(line :string){
    const user:string = getParamFromLine('user',line);
    if(user=='')
        return;
    if(userLoginMap.has(user)){
        let count :number = userLoginMap.get(user) ?? 0;
        console.log('Lo tiene: ',count+1)
        userLoginMap.set(user,count+1);
    }
    else{
        userLoginMap.set(user,1);
    }
    userTokenList.set(user,'');
}
function processQuery(line :string){
    
    const token:string = getParamFromLine('token',line);
    if(tokenUserList.get(token))
        return;

    for (const [userMap, tokenMap] of userTokenList) {
        if(!tokenMap){
            userTokenList.set(userMap, token);
            tokenUserList.set(token, userMap);
            return;
        }
    }
}
function processInsert(line :string){
    if(!line.includes('insert'))
        return;
    const token:string = getParamFromLine('token',line);
    const user = tokenUserList.get(token);
    console.warn('USER QUE DIO EL ALTA: ', user, token)
}
const text = fs.readFileSync('./logs/log1.log', 'utf-8').split("\n");
for(let i=0;i<text.length;i++){
    console.log(text[i])
    if(text[i].startsWith('A'))
        continue;
    processUser(text[i]);
    processQuery(text[i]);
    processInsert(text[i]);

}
// console.log(userLoginMap);
// console.log(userTokenList);
// console.log(tokenUserList);