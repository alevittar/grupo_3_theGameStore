const withLogin = (req, res, next) => {
  next();
};

const withoutLogin = (req, res, next) => {
  next();
};

const adminLogin = (req, res, next) => {
  next();
};


module.exports = {withLogin, withoutLogin, adminLogin};