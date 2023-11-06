import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/utils/connect"

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        if (!credentials || !credentials.username || !credentials.password) return null

        try {
          const user = await prisma.user.findFirst({
            where: {
              user: credentials.username,
            }
          })
          console.log('user', user)
          if (user?.password === credentials.password) {
            return JSON.stringify(user)
          }
          return null
        } catch (error) {
          console.log('error', error)
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }