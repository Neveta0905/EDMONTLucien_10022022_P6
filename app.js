require('babel-register')
const express = require('express')
const morgan = require('morgan')('dev')
const bodyPaser = require('body-parser')
const mongoose = require('mongoose')

// Dotenv to config port
const dotenv = require("dotenv");
dotenv.config();
const MY_PORT = process.env.PORT;
const MY_APP_SECRET = process.env.APP_SECRET;

// Connect to Mongo
const app = express()
mongoose.connect('mongodb+srv://Neveta:12345@cluster0.7sr4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Mongo Model
// Imports
	// User
		const model_user = require('./assets/models/User')
	// Sauce

// Use middleware
app.use(morgan)
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

// Create User Router
let UserRouter = express.Router()

	// Sign In
	UserRouter.route('/signup')
	.post(async (req,res) =>{
		console.log(req.body)
		const new_user = new model_user({
			email:req.body.email,
			password:req.body.password
		})
		new_user.save()
			.then(()=>{res.status(201).json(({message:'user registered'}))})
			.catch(error => res.status(400).json({msg:'je ne capte pas ' + new_user.email}))
	})

	// Log In
	UserRouter.route('/login')
	.post((req,res)=>{
		res.json({message:'Je me connecte avec un mail et mdp'})
	})

// Definie User route
app.use('/api/auth/',UserRouter)

// Create sauces routes
let SaucesRouter = express.Router()

	// General
	SaucesRouter.route('')
		.get(async(req,res)=>{
			res.json({message:'je veux ttes les sauces'})
		})

		.post(async(req,res)=>{
			res.json({message:'je rajoute une sauce et sa photo'})
		})

	// Id Targeted
	SaucesRouter.route('/:id')
		.get(async(req,res)=>{
			res.json({message:'je veux la sauce ' + req.params.id})
		})

		.put(async(req,res)=>{
			res.json({message:'je modifie la sauce ' + req.params.id})
		})

		.delete(async(req,res)=>{
			res.json({message:'je supprimme la sauce ' + req.params.id})
		})


		SaucesRouter.route('/:id/like')
			.post(async(req,res)=>{
				res.json({message:'je kiffe la sauce ' + req.params.id})
			})

// Definie la route utilisée par SaucesRouter
app.use('/api/sauces/',SaucesRouter)



// Launch app on port
app.listen(MY_PORT, () => console.log(`Server running on port ${MY_PORT}`));