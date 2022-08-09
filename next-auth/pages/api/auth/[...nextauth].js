import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                id: { label: "Email", type: "text", placeholder: "email@medicalip.com" },
                pw: {  label: "Password", type: "password", placeholder: "your password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)

                return { email: credentials.id }
                // const res = axios.post('', credentials)
            }
        })
    ],
})