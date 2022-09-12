import * as Yup from "yup"
import jwt from "jsonwebtoken"
import User from "../models/User"
import authConfig from "../../config/auth"

class SessionControler {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordInvalid = () => {
      return response
        .status(401)
        .json({ error: "email or passworn is invalid" })
    }

    if (!(await schema.isValid(request.body))) {
      userEmailOrPasswordInvalid()
    }

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      userEmailOrPasswordInvalid()
    }

    if (!(await user.checkPassword(password))) {
      userEmailOrPasswordInvalid()
    }

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionControler()
