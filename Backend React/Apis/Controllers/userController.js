const User = require('../Models/userModel');

// POST /users/register
async function register(req, res) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = req.body.password;
    const firstName = String(req.body.firstName || '').trim();
    const lastName = String(req.body.lastName || '').trim();
    const isSubscribed = !!req.body.isSubscribed;

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: 'firstName, email and password are required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      const samePassword = await existing.comparePassword(password);
      if (samePassword) {
        if (req.session) req.session.userId = existing._id.toString();
        return res.status(200).json(existing);
      }
      return res.status(409).json({ message: 'An account with this email already exists. Please sign in.' });
    }

    const user = await User.create({ firstName, lastName, email, password, isSubscribed });

    // Save user id in session
    if (req.session) req.session.userId = user._id.toString();

    return res.status(201).json(user);
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ message: err.message || 'Registration failed.' });
  }
}

// POST /users/login
async function login(req, res) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'No account found with this email.' });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    // Save user id in session
    if (req.session) req.session.userId = user._id.toString();

    return res.status(200).json(user);
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: err.message || 'Login failed.' });
  }
}

// GET /users/:id
async function getById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.status(200).json(user);
  } catch (err) {
    console.error('getById error:', err);
    return res.status(500).json({ message: err.message });
  }
}

// PUT /users/:id
async function update(req, res) {
  try {
    const { password, ...fields } = req.body; // prevent accidental plain-text password update via this route
    const user = await User.findByIdAndUpdate(req.params.id, { $set: fields }, { returnDocument: 'after', runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.status(200).json(user);
  } catch (err) {
    console.error('update error:', err);
    return res.status(500).json({ message: err.message });
  }
}

// PUT /users/:id/cart
async function saveCart(req, res) {
  try {
    const { cart } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { $set: { cart } }, { returnDocument: 'after' });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error('saveCart error:', err);
    return res.status(500).json({ message: err.message });
  }
}

// PUT /users/:id/wishlist
async function saveWishlist(req, res) {
  try {
    const { wishlist } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { $set: { wishlist } }, { returnDocument: 'after' });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    console.error('saveWishlist error:', err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { register, login, getById, update, saveCart, saveWishlist };
