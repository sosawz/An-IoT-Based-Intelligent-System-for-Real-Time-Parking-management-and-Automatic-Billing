const db = require('../util/database');

module.exports = class User {

    constructor(UserId, FirstName, LastName, Email, Password) {
        this.UserId = UserId;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Password = Password;
    }

    static findAll(){
        return db.execute("select * from users");
    }

    save() {
        if (this.UserId) {
            return db.execute(
                'UPDATE users SET FirstName=?, LastName=? WHERE UserId = ?',
                [this.FirstName, this.LastName, this.UserId]
            );
        } else {
            return db.execute(
                'INSERT INTO users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)',
                [this.FirstName, this.LastName, this.Email, this.Password]
            );
        }
    }

    static login(Email, Password) {
        return db.execute(
          'SELECT * FROM users WHERE Email = ? AND Password = ?',
          [Email, Password]
        );
    }

}
