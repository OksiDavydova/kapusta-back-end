const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const Categories = [
  "продукты",
  "алкоголь",
  "развлечение",
  "здоровье",
  "транспорт",
  "все для дома",
  "техника",
  "коммуналка, связь",
  "спорт, хобби",
  "образование",
  "прочее",
  "зп",
  "доп. доход",
];

module.exports = { HttpCode, Categories };
