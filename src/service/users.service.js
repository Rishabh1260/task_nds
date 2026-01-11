const pool = require('../config/db');


exports.getUsers = async (filters = {}) => {
  const conditions = [];
  const values = [];

  let sql = `
    SELECT
      u.id,
      u.email,
      u.name,
      u.created_at,
      up.age,
      up.city,
      up.preferences,
      up.updated_at
    FROM users u
    LEFT JOIN user_profiles up
      ON up.user_id = u.id
  `;

  if (filters.city) {
    conditions.push('LOWER(up.city) = LOWER(?)');
    values.push(filters.city);
  }

  if (filters.age_gt) {
    conditions.push('up.age > ?');
    values.push(Number(filters.age_gt));
  }

  if (filters.age_lt) {
    conditions.push('up.age < ?');
    values.push(Number(filters.age_lt));
  }

  if (conditions.length) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // pagination (always valid data)
  const limit = Number.isInteger(Number(filters.limit))
    ? Number(filters.limit)
    : 20;

  const offset = Number.isInteger(Number(filters.offset))
    ? Number(filters.offset)
    : 0;

  sql += ' LIMIT ? OFFSET ?';
  values.push(limit, offset);

  const [rows] = await pool.query(sql, values);
  return rows;
};




exports.getUserById = async (id) => {
  const sql = `
    SELECT
      u.id,
      u.email,
      u.name,
      u.created_at,
      up.age,
      up.city,
      up.preferences,
      up.updated_at
    FROM users u
    LEFT JOIN user_profiles up
      ON up.user_id = u.id
    WHERE u.id = ?
  `;

  const [rows] = await pool.query(sql, [id]);
  return rows[0] || null;
};


exports.createUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [data.name, data.email]
    );

    const userId = result.insertId;

    if (data.profile) {
      await conn.query(
        `
        INSERT INTO user_profiles (user_id, age, city, preferences)
        VALUES (?, ?, ?, ?)
        `,
        [
          userId,
          data.profile.age ?? null,
          data.profile.city ?? null,
          data.profile.preferences
            ? JSON.stringify(data.profile.preferences)
            : null
        ]
      );
    }

    await conn.commit();
    return { id: userId };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};


exports.updateUser = async (id, data) => {
  const fields = [];
  const values = [];

  for (const key of ['name', 'email']) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }

  if (!fields.length) return true;

  values.push(id);

  const [result] = await pool.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  return result.affectedRows > 0;
};

// For PUT method
exports.upsertProfile = async (userId, data) => {
  const sql = `
    INSERT INTO user_profiles (user_id, age, city, preferences)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      age = VALUES(age),
      city = VALUES(city),
      preferences = VALUES(preferences)
  `;

  const values = [
    userId,
    data.age ?? null,
    data.city ?? null,
    data.preferences ? JSON.stringify(data.preferences) : null
  ];

  await pool.query(sql, values);
};

// To delete user by ID
exports.deleteUser = async (id) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query('DELETE FROM user_profiles WHERE user_id = ?', [id]);
    const [result] = await conn.query('DELETE FROM users WHERE id = ?', [id]);

    await conn.commit();
    return result.affectedRows > 0;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
