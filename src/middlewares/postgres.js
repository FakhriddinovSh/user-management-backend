import pg from 'pg';

// Assuming you have configured your pool somewhere before using it
const pool = new pg.Pool({
	host: 'isabelle.db.elephantsql.com',
	user: 'vqrjaebn',
	password: 'eqQEVsVDUJKqe8n8mVHJYZjThIOZizC4',
	database: 'vqrjaebn',
});

export default (req, res, next) => {
	req.fetch = async function fetchData(query, ...params) {
		const client = await pool.connect();

		try {
			const result = await client.query(
				query,
				params.length ? params : null,
			);
			return result.rows;
		} catch (err) {
			console.log(err.message);
		} finally {
			client.release();
		}
	};

	return next();
};
