const signInSchema = {
   type: "object",
   properties: {
      email: { type: "string" },
      password: { type: "string" }
   }
}

const refreshTokenSchema = {
   type: "object",
   properties: {
      refreshToken: { type: "string" }
   }
}

const signedInSchema = {
   type: "object",
   properties: {
      subs: { type: "string" },
      name: { type: "string" },
      username: { type: "string" },
      email: { type: "string" },
      accessToken: { type: "string" },
      refreshToken: { type: "string" }
   }
}

const resultSchema = {
   type: "object",
   properties: {
      message: { type: "string" }
   }
}

const userSchema = {
   type: "object",
   properties: {
      name: { type: "string" },
      username: { type: "string" },
      email: { type: "string" },
      password: { type: "string" }
   },
   required: ["name", "username", "pasword"]
}

const schemas = {
   "SignIn": signInSchema,
   "RefreshToken": refreshTokenSchema,
   "SignedIn": signedInSchema,
   "Result": resultSchema,
   "User": userSchema
};

export default schemas;