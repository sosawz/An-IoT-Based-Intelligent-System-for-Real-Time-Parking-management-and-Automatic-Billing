const db = require('../util/database');

module.exports = class LicensePlate {

    constructor(id, plate, timestamp, picture) {
        this.id = id;
        this.plate = plate;
        this.timestamp = timestamp;
        this.picture = picture;
    }

    static findAll(){
        return db.execute("select * from plate_data");
    }

    save() {
        if (this.id) {
            return db.execute(
                'UPDATE plate_data SET plate=?, timestamp=?, picture=? WHERE id = ?',
                [this.plate, this.timestamp, this.picture, this.id]
            );
        } else {
            return db.execute(
                'INSERT INTO plate_data (plate, timestamp, picture) VALUES (?, ?, ?)',
                [this.plate, this.timestamp, this.picture]
            );
        }
    }

    static findById(id){
        return db.execute(
            'select * from plate_data where id = ?',
            [id]
        );
    }

    static delById(id){
        return db.execute(
            'delete from plate_data where id = ?',
            [id]
        );
    }

}
