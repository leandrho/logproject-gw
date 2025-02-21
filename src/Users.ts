import fs from 'fs';

export class Users{
    private userSet :Set<string>;

    constructor(){
        this.userSet=new Set<string>();
    }

    public loadUserFromFile(filePath:string){
        if(!fs.existsSync(filePath))
            throw new Error(`File does not exist: ${filePath}`);

        const users = fs.readFileSync(filePath,'utf-8').split('\n');
        for(let i = 0; i<users.length; i++){
            const [user, ] = users[i].split(';');
            this.userSet.add(user);
        }
    }
    public has(user: string){
        return this.userSet.has(user);
    }
}
// let finalUser :string[] = [];

// const ginkgoUsers = fs.readFileSync('output-Login.csv','utf-8').split('\n');
// for(let i = 0; i<ginkgoUsers.length; i++){
//     const [user, ] = ginkgoUsers[i].split(';');
//     if(userBiloSet.has(user))
//         finalUser.push(user);
// }

// fs.writeFileSync('final-login-users-cross.csv', '');
// finalUser.forEach((user)=>{
//     if(!user )
//         return;
//     fs.appendFileSync('final-login-users-cross.csv',`${user}\n`);
// })
   