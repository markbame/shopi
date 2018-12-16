require('dotenv').config()
var config = require('12factor-config')
var cfg = config({
    private_key_id : {
        env      : 'PRIVATE_KEY_ID',
        type     : 'string',
        required : true,
    },
    private_key : {
        env      : 'PRIVATE_KEY',
        type     : 'string',
        required : true,
    },
    client_id : {
        env      : 'CLIENT_ID',
        type     : 'string',
        required : true,
    },
    project_id : {
        env      : 'PROJECT_ID',
        type     : 'string',
        required : true,
    }
})

export default cfg
