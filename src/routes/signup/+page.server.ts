import type { PageServerLoad,Actions } from './$types';
import { PrismaClient, Prisma } from "@prisma/client";
import { Grabpass, createHashedPassword } from 'grabpass'

const prisma = new PrismaClient();

// デモ用（ここでは特に処理を行っていない）
export const load: PageServerLoad = async ({ cookies, setHeaders }) => {
  console.log('test')
  console.log(cookies.get('access-token'))

  // // ヘッダーを設定可能　ただし、set-cookieは使えない（cookies.setを使う）
  // setHeaders({
	// 	'Content-Type': 'text/html',
  //   'Authorization': 'Bearer ' // + 'token'
	// });
}

// フォームが送信された時に実行される
export const actions = {
    signup: async ({ cookies,request }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        
        let user: Prisma.UserCreateInput;

        user = {
            name: name,
            email: email,
            encryptedPassword: await createHashedPassword(password)
        }

        const createUser = await prisma.user.create({ data: user });

        // // ユーザー登録は下記でも可能
        // const user = await prisma.user.create({
        //     data: {
        //         name: name,
        //         email: email,
        //         encryptedPassword: await createHashedPassword(password)
        //     },
        //   })

        // 作成したユーザーのidを取得
        const createdUser = await prisma.user.findUnique({
            where: {
              email: email,
            },
            select: {
              id: true,
            },
          })

        const userId: number = createdUser.id

        // grabpassを利用してトークンを生成
        const grabpass = new Grabpass({
            config: {
              secret: 'your_very_secure_secret_key_that_meets_length_requirements',
            //   algorithm: 'HS256',  // optional
            //   accessTokenExpiresIn: '15m',  // optional
            //   refreshTokenExpiresIn: '7d'   // optional
            }
          })

        const tokens = grabpass.createAuthTokens({
          accessTokenPayload: { id: userId }, 
          refreshTokenPayload: { id: userId, reauthKey: 'some_unique_key' } 
        })

        // learと同じ形式でcookiesにトークンを保存するための成形処理
        // 1. トークンを取得
        const accessToken = tokens.accessToken;
        const refreshToken = tokens.refreshToken;

        // 2. JSONオブジェクトを作成
        const tokenData = {
          accessToken: accessToken,
          refreshToken: refreshToken
        };

        // 3. JSONオブジェクトを文字列に変換
        const tokenString = JSON.stringify(tokenData);

        // 4. 文字列をURLエンコード
        const encodedTokenString = encodeURIComponent(tokenString);

        // 5. cookies.setでエンコードされた文字列を保存
        cookies.set('token', encodedTokenString, {
          httpOnly: true,
          secure: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7 // 1週間
        });
        
        // jsonを返す
        return {
            status: 200,
            user: {
              id: userId,
              name: user.name,
              email: user.email,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken
          },
        };
    },

} satisfies Actions;