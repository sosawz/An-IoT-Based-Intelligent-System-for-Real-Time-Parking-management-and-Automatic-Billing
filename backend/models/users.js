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

    // save() {
    //     if (this.id) {
    //         return db.execute(
    //             'UPDATE plate_data SET plate=?, image=?, timestamp=timestamp WHERE id = ?',
    //             [this.plate, this.image, this.id]
    //         );
    //     } else {
    //         return db.execute(
    //             'INSERT INTO plate_data (plate, image) VALUES (?, ?)',
    //             [this.plate, this.image]
    //         );
    //     }
    // }

    static findById(UserId){
        return db.execute(
            'select * from users where UserId = ?',
            [UserId]
        );
    }

}
