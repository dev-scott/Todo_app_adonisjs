import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

const users = [
  {
    email: 'sado@gmail.com',
    password: '2345',
    firt_name: 'bom',
    last_name: 'dree',
  },
]

export default class extends BaseSeeder {
  public async run() {
    try {
      await Database.table('users').multiInsert(users)
      console.info('usrs seeded')
    } catch (error) {
      console.error(error)
    }
  }
}
