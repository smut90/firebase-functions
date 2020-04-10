const { log } = require('../util/util');
const uuid = require('uuid');

const addData = async (db, payload) => {
    log('start adding data');

    const categoryId = payload.id ? payload.id : uuid.v4();
    await db.collection('categories').doc(categoryId)
        .set({
            id: categoryId,
            name: payload.name
        })
        .then(() => {
            log("successfully saved to category");
            return null;
        })
        .catch(error => {
            console.error("error saving category root info in firestore: ", error)
        });

    await payload.grammerlets.forEach( grammerlet => {
        const grammerletId = grammerlet.id ? grammerlet.id : uuid.v4();

        db.collection('categories').doc(categoryId).collection('grammerlets').doc(grammerletId)
            .set(grammerlet)
            .then(() => {
                log("successfully saved to firestore");
                return null;
            })
            .catch(error => {
                console.error("error saving balance info in firestore: " + error)
            });
    });

    return await getData(db, categoryId);
};

const getData = async (db, categoryId) => {
    log('start getting data');
    const grammerlets = [];
    const root = await db.collection('categories').doc(categoryId).get();
    const subCollections = await db.collection('categories').doc(categoryId).collection('grammerlets').get();

    const rootData = root.data();
    subCollections.forEach(doc => {
        const data = doc.data();
        data['id'] = doc.id;

        grammerlets.push(data)
    });

    return {
        id: rootData.id,
        name: rootData.name,
        grammerlets: grammerlets
    };
};

module.exports = {
    addData,
    getData
};
