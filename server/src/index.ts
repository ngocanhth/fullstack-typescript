require('dotenv').config()
import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import { User } from './entities/User'
import { Post } from './entities/Post'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { userResolver } from './resolvers/user'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import { COOKIE_NAME, __prod__ } from './constants'
 import { Context } from './types/Context'
import { postResolver } from './resolvers/post'

const main = async () => {
    await createConnection ({
        type: 'postgres',
        database: 'reddit',
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        logging: true,
        synchronize: true,
        entities: [User, Post]
    })

    const app = express()
    
    // Session/Cookie store
    const mongoUrl = `mongodb+srv://${process.env.SESSION_DB_USERNAME_DEV_PROD}:${process.env.SESSION_DB_PASSWORD_DEV_PROD}@cluster0.vbs8f.mongodb.net/?retryWrites=true&w=majority`
	// await mongoose.connect(mongoUrl, {
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true
	// })

    await mongoose.createConnection(mongoUrl).asPromise();


	console.log('MongoDB Connected')

    app.use(
		session({
			name: COOKIE_NAME,
			store: MongoStore.create({ mongoUrl }),
			cookie: {
				maxAge: 1000 * 60 * 60, // one hour
				httpOnly: true, // JS front end cannot access the cookie
				secure: __prod__, // cookie only works in https, production secure is true or false
				sameSite: 'none'
			},
			secret: process.env.SESSION_SECRET_DEV_PROD as string,
			saveUninitialized: false, // don't save empty sessions, right from the start, khi lon in moi save
			resave: false
		})
	)

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, userResolver, postResolver],
            validate: false
        }),
        context: ({ req, res }): Context => ({
            req,
            res,
         //   connection,
         //   dataLoaders: buildDataLoaders()
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({app})

    const PORT = process.env.PORT || 4000

    app.listen(PORT, () => console.log(`Server started on port ${PORT}. GraphQL server started on localhost:${PORT}${apolloServer.graphqlPath}`));
}

main().catch(error => console.log(error));