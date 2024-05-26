const db = require('../util/database');

module.exports = class LicensePlate {

    constructor(id, plate, timestamp, image) {
        this.id = id;
        this.plate = plate;
        this.timestamp = timestamp;
        this.image = image;
    }

    static findAll(){
        return db.execute("select * from plate_data");
    }

    save() {
        if (this.id) {
            return db.execute(
                'UPDATE plate_data SET plate=?, timestamp=?, image=? WHERE id = ?',
                [this.plate, this.timestamp, this.image, this.id]
            );
        } else {
            return db.execute(
                'INSERT INTO plate_data (plate, timestamp, image) VALUES (?, ?, ?)',
                [this.plate, this.timestamp, this.image]
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
