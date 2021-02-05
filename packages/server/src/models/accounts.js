import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

export const AccountsModel = model('accounts', schema)
