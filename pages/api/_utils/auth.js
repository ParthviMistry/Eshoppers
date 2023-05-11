var bcrypt = require("bcryptjs");
import { v4 as uuidv4 } from "uuid";
import { connectToDatabase } from "./mongoConnect";

const USER_DB = "NextJS-Demo";

// Authenticate User / Login
export async function authorizeUser(username, pw) {
  const userExists = await checkIfUsernameExists(username);

  if (!userExists) return { error_message: "Invalid Credentials" };

  const authenticated = await handleAuthentication(username, pw);

  if (!authenticated) return { error_message: "Invalid Credentials" };

  const userInfo = await loadUserInfo(username);

  return userInfo;
}

// Check if user exists
export async function checkIfUsernameExists(username) {
  let { db } = await connectToDatabase();
  const query = { username };
  const data = await db.collection(USER_DB).find(query).toArray();

  return data?.length > 0;
}

// Log User in
export async function handleAuthentication(username, pw) {
  let { db } = await connectToDatabase();
  const data = { $push: { lastAttemptedLogin: new Date() } };
  const user = await db
    .collection(USER_DB)
    .findOneAndUpdate({ username }, data);

  if (!user?.value?.hashed_pw) return false;

  const isAuthed = bcrypt.compareSync(pw, user?.value?.hashed_pw);

  return isAuthed;
}

// Get User info without private details
export async function loadUserInfo(username) {
  let { db } = await connectToDatabase();
  let userInfo = await db
    .collection(USER_DB)
    .find({ username })
    .project({
      username: 1,
      email: 1,
      firstName: 1,
      lastName: 1,
      business: 1,
      location: 1,
      id: 1,
    })
    .toArray();

  let user = await db.collection(USER_DB).findOne({ id: userInfo?.[0]?.id });
  const userData = { ...userInfo?.[0], ...user };
  delete userData.lastAttemptedLogin;
  delete userData.hashed_pw;
  delete userData.ip;
  delete userData.headerIp;
  delete userData._id;
  return userData;
}

// Create User // Register
export async function registerUser(
  username,
  pw,
  email,
  firstName,
  lastName,
  business,
  location,
  ip,
  headerIp
) {
  // Make sure user doesn't exist already
  const userExists = await checkIfUsernameExists(username);
  if (userExists)
    return { error_message: "User already exists using that username/email" };

  // Hash password
  const hashed_pw = await handlePasswordHashing(pw); // Create Hashed Password
  if (!hashed_pw)
    return { error_message: "Problem Hashing Password", info: hashed_pw };

  const id = uuidv4();

  // Create new User
  await instantiateUser(
    username,
    hashed_pw,
    email,
    firstName,
    lastName,
    business,
    location,
    ip,
    headerIp,
    id
  );
  // Create User in Database
  const isAuthenticated = await authorizeUser(username, pw); // Re-authorize User

  return isAuthenticated;
}

// Password Hashing
export async function handlePasswordHashing(pw) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pw, salt);

  return hash;
}

// Create User in DB with hashed pw
export async function instantiateUser(
  user,
  hashed_pw,
  email,
  firstName,
  lastName,
  business,
  location,
  ip,
  headerIp,
  id,
  phone = ""
) {
  let { db } = await connectToDatabase();

  await db.collection(USER_DB).insertOne({
    username: user,
    hashed_pw: hashed_pw,
    email,
    firstName,
    lastName,
    business,
    location,
    ip,
    headerIp,
    id,
    created: new Date(),
  });

  const { username } = await db.collection(USER_DB).findOne({ username: user });

  return username;
}
