// import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel';
// // import User from '../models/user';

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ email, password: hashedPassword });
//     res.status(201).json({ message: 'User created successfully', user });
//   } catch (error) {
//     res.status(500).json({ error: 'User creation failed', details: error });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }
//     const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed', details: error });
//   }
// });

// export default router;