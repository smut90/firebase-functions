const log = async (msg) => {
    console.log(msg)
};

const validateRequestPayload = (requestBody) => {
    const errors = [];
    if (!requestBody.hasOwnProperty('name')) {
        const errorMsg = 'request body should contain name field';
        console.error(errorMsg);
        errors.push(errorMsg);
    } else if (!requestBody.name) {
        const errorMsg = 'name should not be empty';
        console.error(errorMsg);
        errors.push(errorMsg);
    }

    if (!requestBody.hasOwnProperty('grammerlets')) {
        const errorMsg = 'request body should contain grammerlets field';
        console.error(errorMsg);
        errors.push(errorMsg);
    } else if (!Array.isArray(requestBody.grammerlets)) {
            const errorMsg = 'grammerlets should be an array';
            console.error(errorMsg);
            errors.push(errorMsg);
    } else if (Array.isArray(requestBody.grammerlets)  && requestBody.grammerlets.length === 0) {
        const errorMsg = 'grammerlets should not be empty';
        console.error(errorMsg);
        errors.push(errorMsg);
    }

    return errors;
};

const validateGrammerlets = (grammerlets) => {
    grammerlets.forEach(item => {
        if (!item.hasOwnProperty('name')) {
            const error = {
                msg: 'errors in grammerlet structure - no name field'
            };
            throw error;
        } else if (!item.name) {
            const error = {
                msg: 'errors in grammerlet structure - empty name field'
            };
            throw error;
        }

        if (!item.hasOwnProperty('description')) {
            const error = {
                msg: 'errors in grammerlet structure - no description field'
            };
            throw error;
        } else if (!item.description) {
            const error = {
                msg: 'errors in grammerlet structure - empty description field'
            };
            throw error;
        }

        if (!item.hasOwnProperty('active')) {
            const error = {
                msg: 'errors in grammerlet structure - no active field'
            };
            throw error;
        }

        if (!item.hasOwnProperty('examples')) {
            const error = {
                msg: 'errors in grammerlet structure - no examples field'
            };
            throw error;
        } else if (Array.isArray(item.examples)  && item.examples.length === 0) {
            const error = {
                msg: 'errors in grammerlet structure - empty examples field'
            };
            throw error;
        }

        if (!item.hasOwnProperty('practice')) {
            const error = {
                msg: 'errors in grammerlet structure - no practice field'
            };
            throw error;
        } else if (Array.isArray(item.practice)  && item.practice.length === 0) {
            const error = {
                msg: 'errors in grammerlet structure - empty practice field'
            };
            throw error;
        } else {

            item.practice.forEach(practice => {
                if (!practice.hasOwnProperty('id')) {
                    const error = {
                        msg: 'errors in grammerlet.practice structure - no id field'
                    };
                    throw error;
                } else if (!practice.id) {
                    const error = {
                        msg: 'errors in grammerlet.practice structure - empty id field'
                    };
                    throw error;
                }

                if (!practice.hasOwnProperty('question')) {
                    const error = {
                        msg: 'errors in grammerlet.practice structure - no question field'
                    };
                    throw error;
                } else if (!practice.question) {
                    const error = {
                        msg: 'errors in grammerlet.practice structure - empty question field'
                    };
                    throw error
                }

                if (!practice.hasOwnProperty('hint')) {
                    const error = {
                        msg: 'errors in grammerlet.practice structure - no hint field'
                    };
                    throw error;
                } else if (!practice.hint) {
                    const error = {
                        msg: 'errors in grammerlet.practice structure - empty hint field'
                    };
                    throw error;
                }

                if (!practice.hasOwnProperty('answers')) {
                    const error = {
                        msg: 'errors in grammerlet.practice structure - no answers field'
                    };
                    throw error;

                } else if (Array.isArray(practice.answers)  && practice.answers.length === 0) {
                    const error = {
                        msg: 'errors in grammerlet.practice structure - empty answers field'
                    };
                    throw error;
                }
            })

        }
    })
};

module.exports = {
    log,
    validateRequestPayload,
    validateGrammerlets
};
