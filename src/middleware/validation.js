const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({
      error: 'All fields are required'
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters'
    });
  }
  
  next();
};

const validatePost = (req, res, next) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({
      error: 'Title and content are required'
    });
  }
  
  if (title.length > 255) {
    return res.status(400).json({
      error: 'Title must be less than 255 characters'
    });
  }
  
  next();
};

const validateCategory = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({
      error: 'Name is required'
    });
  }
  
  if (name.length > 100) {
    return res.status(400).json({
      error: 'Name must be less than 100 characters'
    });
  }
  
  next();
};

const validateTag = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({
      error: 'Name is required'
    });
  }
  
  if (name.length > 50) {
    return res.status(400).json({
      error: 'Name must be less than 50 characters'
    });
  }
  
  next();
};

const validateComment = (req, res, next) => {
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({
      error: 'Content is required'
    });
  }
  
  next();
};

const validateMessage = (req, res, next) => {
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({
      error: 'Content is required'
    });
  }
  
  next();
};

const validateReferral = (req, res, next) => {
  const { referrerId, referredId, referralCode } = req.body;
  
  if (!referrerId || !referredId) {
    return res.status(400).json({
      error: 'ReferrerId and referredId are required'
    });
  }
  
  if (referrerId === referredId) {
    return res.status(400).json({
      error: 'Referrer and referred cannot be the same user'
    });
  }
  
  if (referralCode && referralCode.length < 6) {
    return res.status(400).json({
      error: 'Referral code must be at least 6 characters'
    });
  }
  
  next();
};

module.exports = {
  validateUser,
  validatePost,
  validateCategory,
  validateTag,
  validateComment,
  validateMessage,
  validateReferral
};