const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/db");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({ token, user });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.googleAuth = async (req, res) => {
    try {
        const { googleId, email, name } = req.body;

        let user = await prisma.user.findUnique({ where: { email } });

        // Check if user exists with same Google ID
        if (!user) {
            user = await prisma.user.create({
                data: { email, name, googleId }
            });
        } else if (!user.googleId) {
            // If user exists but was registered manually, update googleId
            await prisma.user.update({
                where: { email },
                data: { googleId }
            });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user });
    } catch (error) {
        console.error("Google Auth error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
