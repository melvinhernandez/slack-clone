import bcrypt from "bcrypt";
import _ from "lodash";
import { tryLogin } from "../auth";

const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map((x) => _.pick(x, ["path", "message"]));
  }
  return [{ path: "name" }];
};

export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET, SECRET2 }) => {
      return await tryLogin(email, password, models, SECRET, SECRET2);
    },
    register: async (parent, { password, ...args }, { models }) => {
      try {
        if (password.length < 6) {
          return {
            ok: false,
            errors: [
              {
                path: "password",
                message: "Password must be at least 6 characters long.",
              },
            ],
          };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({
          ...args,
          password: hashedPassword,
        });
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
