import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const secretKey = 'apple';

function generateToken(userId) {
	const token = Jwt.sign({ userId }, secretKey, { expiresIn: '7d' });
	return token;
}

function verifyToken(token) {
	try {
		const decoded = Jwt.verify(token, secretKey);
		return decoded;
	} catch (error) {
		return null;
	}
}

const GET = async (req, res) => {
	const { userId } = req.params;

	const users = await req.fetch(
		`select user_id, username, active_status, email, last_login from users where case 
        when $1 > 0 then user_id = $1 
        else true
        end`,
		userId,
	);

	return res.json(users);
};

const REGISTER = async (req, res) => {
	const { username, email, password } = req.body;

	async function hashPassword(password) {
		const saltRounds = 10;
		return await bcrypt.hash(password, saltRounds);
	}

	const userPassword = await hashPassword(password);
	const token = generateToken(password);

	try {
		const active_status = true;
		const last_login = new Date();

		if (!username) throw new Error('Username is required');
		if (!email) throw new Error('Email is required');
		if (!password) throw new Error('Password is required');
		const newUser = await req.fetch(
			`
		    insert into users (
		            username,
		            last_login,
		            email,
		            active_status,
		            password
		        ) values ($1, $2, $3, $4, $5)
		        returning user_id, username, password, email, active_status, last_login
		        `,
			username,
			last_login,
			email,
			active_status,
			userPassword,
		);

		res.send({
			status: 201,
			user: newUser,
			token: token,
		});
	} catch (error) {
		res.send({
			status: 401,
			message: error.message,
		});
	}
};

const LOGIN = async (req, res) => {
	const { email, password } = req.body;

	const users = await req.fetch(`select * from users`);

	async function hashPassword(password) {
		const saltRounds = 10;
		return await bcrypt.hash(password, saltRounds);
	}
	const token = generateToken(password);

	try {
		const validateUser = users.find((item) => {
			return item.email == email;
		});

		if (validateUser) {
			const RegisteredPassword = validateUser.password;
			async function comparePassword(providedPassword, hasPas) {
				return await bcrypt.compare(providedPassword, hasPas);
			}
			const result = await comparePassword(password, RegisteredPassword);

			result
				? res.send({
						status: 200,
						user: validateUser,
						token: token,
				  })
				: 'No user';
		} else {
			res.send({
				status: 404,
				message: 'Not found user with this username!!!',
			});
		}
	} catch (error) {
		res.send({
			status: 404,
			message: error.message,
		});
	}
};

// const DELETE = async (req, res) => {
//   const { deletedUsers } = req.body;

//   try {
//     const placeholders = deletedUsers
//       .map((id, index) => `$${index + 1}`)
//       .join(', ');

//     // Assuming deletedUsers is an array of strings
//     await req.fetch(
//       `DELETE FROM users
//        WHERE user_id IN (${placeholders})`,
//       deletedUsers
//     );

//     res.send({
//       status: 200,
//       message: 'Users successfully deleted from the database!!!',
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const DELETE = async (req, res) => {
	try {
		const { deletedUsers } = req.body;

		const result = await deletedUsers.map((item) =>
			req.fetch(`DELETE FROM USERS where USER_ID = ${item}`),
		);
	} catch (error) {
		res.send({
			error: error.message,
		});
	}
};

const PUT = async (req, res) => {
	try {
		console.log(req.body);
	} catch (error) {
		res.send({
			error: error.message,
		});
	}
};

export default { GET, REGISTER, LOGIN, DELETE, PUT };
