const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const extractToken = (rawHeaders) => {
  // Check if rawToken is an array
  const cookiesHeaderIndex = rawHeaders.findIndex(
    (header) => header === "Cookies"
  );

  if (cookiesHeaderIndex !== -1 && cookiesHeaderIndex + 1 < rawHeaders.length) {
    // Get the value of the 'Cookies' header
    const cookiesValue = rawHeaders[cookiesHeaderIndex + 1];

    // Extract the token from the 'Cookies' value
    const tokenMatch = /token\s*=\s*([^;]+)/.exec(cookiesValue);
    if (tokenMatch) {
      const token = tokenMatch[1];
      return token;
    }
  }

  return null; // Token not found
};

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const rawToken = req.rawHeaders;
  const token = extractToken(rawToken);

  console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please login to update the profile", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  console.log(req.user);

  next();
});
