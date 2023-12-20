import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

interface StoreUserType {
  email: string
  password: string
  firtName: string
  lastName: string
}

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public firt_name: string

  @column()
  public last_name: string

  @column()
  public remember_me_token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static storeUser = async (data: StoreUserType) => {
    await this.create({
      email: data.email,
      password: data.password,
      firt_name: data.firtName,
      last_name: data.lastName,
    })
    return Promise.resolve('User create ')
  }
}
