const prisma = require("../config/db");

const createUser = async (data) => await prisma.user.create({ data });

const getUserByEmail = async (email) => await prisma.user.findUnique({ where: { email } });

module.exports = { createUser, getUserByEmail };
