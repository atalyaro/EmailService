const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())
app.use(cors())

const users = [
	{ id: 1, username: 'yosi', password: 1234, isAdmin: true },
	{ id: 2, username: 'test', password: 1234, isAdmin: false },
]

const refreshs = {}

app.post('/login', (req, res) => {
	console.log(req.body)
	const { username, password } = req.body
	if (username && password) {
		const user = users.find((u) => u.username === username)
		if (user) {
			if (user.password == password) {
				const access_token = jwt.sign(
					{ user: { id: user.id, username, isAdmin: user.isAdmin } },
					'bLaH',
					{ expiresIn: '30m' }
				)
				const refresh_token = jwt.sign({ id: user.id }, 'refreshbLaH', {
					expiresIn: '7d',
				})
				if (!refreshs[user.id]) {
					refreshs[user.id] = []
				}
				refreshs[user.id].push(refresh_token)
				res.json({ access_token, refresh_token })
			} else {
				res.status(400).send('wrong password')
			}
		} else {
			res.status(400).send('user not found')
		}
	} else {
		res.status(400).send('missing info')
	}
})


app.post('/signup', (req, res) => {
	const { username, password, isAdmin } = req.body
	if (username && password) {
		req.body.id = Math.random().toString().split('.')[1]
		users.push(req.body)
		res.status(201).send({ msg: 'registered' })
	} else {
		res.status(400).send('missing info')
	}
})

app.get('/logout', (req, res) => {
	const { rt, type } = req.query
	const user = jwt.decode(rt)
	if (type == 'all') {
		refreshs[user.id] = []
	} else if (type == 'device') {
		refreshs[user.id] = refreshs[user.id].filter((r) => r != rt)
	}
	res.send()
	console.log('LOGOUT:', refreshs)
})


app.post('/refresh', (req, res) => {
	const { refresh_token } = req.body
	const id = jwt.decode(refresh_token).id
	if (refreshs[id].includes(refresh_token)) {
		// generate access token
		const user = users.find(u => u.id == id)
		const access_token = jwt.sign(
			{ user: { id, username: user.username, isAdmin: user.isAdmin } },
			'bLaH',
			{ expiresIn: '30m' }
		)
		res.json({ access_token })
	} else {
		res.sendStatus(403)
	}
})

app.listen(1000, () => console.log('rockin1000, auth'))
