const apiRouter = require('express').Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const followController = require('./controllers/followController')
const cors = require('cors')

apiRouter.use(cors())

apiRouter.get('/', (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"))

// check token to log out front-end if expired
apiRouter.post('/checkToken', userController.checkToken)

apiRouter.post('/getHomeFeed', userController.apiMustBeLoggedIn, userController.apiGetHomeFeed)
apiRouter.post('/register', userController.apiRegister)
apiRouter.post('/login', userController.apiLogin)
apiRouter.get('/post/:id', postController.reactApiViewSingle)
apiRouter.post('/post/:id/edit', userController.apiMustBeLoggedIn, postController.apiUpdate)
apiRouter.delete('/post/:id', userController.apiMustBeLoggedIn, postController.apiDelete)
apiRouter.post('/create-post', userController.apiMustBeLoggedIn, postController.apiCreate)
apiRouter.post('/search', postController.search)

apiRouter.post('/doesUsernameExist', userController.apiDoesUsernameExist)
apiRouter.post('/doesEmailExist', userController.apiDoesEmailExist)

// profile related routes
apiRouter.post('/profile/:username', userController.apiIfUserExists, userController.apiSharedProfileData, userController.apiProfileBasicData)
apiRouter.get('/profile/:username/posts', userController.apiIfUserExists, userController.apiGetPostsByUsername)
apiRouter.get('/profile/:username/followers', userController.apiIfUserExists, userController.apiProfileFollowers)
apiRouter.get('/profile/:username/following', userController.apiIfUserExists, userController.apiProfileFollowing)

// follow routes
apiRouter.post('/addFollow/:username', userController.apiMustBeLoggedIn, followController.apiAddFollow)
apiRouter.post('/removeFollow/:username', userController.apiMustBeLoggedIn, followController.apiRemoveFollow)

module.exports = apiRouter
