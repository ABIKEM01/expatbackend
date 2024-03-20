import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "firstname is required"] },
    lastName: { type: String, required: [true, "lastname is required"] },
    phone: {
      type: String,
      required: [true, "phone number is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      default: "123456",
    },
    dob: {
      type: String,
      required: [true, "date of birth  is required"],
    },
    role: {
      type: String,
      required: false,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.passwordMatched = async function (passwordToBeVerified) {
  return await bcrypt.compare(passwordToBeVerified, this.password);
};

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    // Handle the uniqueness violation error
    const uniqueFieldError = new Error("User unique already exists.");
    next(uniqueFieldError);
  } else {
    next(error);
  }
});


const User = mongoose.model("User", userSchema);

export default User;
