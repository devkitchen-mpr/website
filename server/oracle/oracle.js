const oracledb = require('oracledb')
const config = require('./config.js')

try {
    oracledb.initOracleClient({ 'libDir': 'C:\\oracle\\instantclient_19_12' })
} catch (e) {
    console.error('[oracle] error initializing oracle client: ' + e)
}

//establish oracledb connection
async function connect(connection) {

    try {
        connection = await oracledb.getConnection({
            user: config.user,
            password: config.password,
            connectString: config.connectString
        })

       
    } catch (e) {
        console.error('[oracle] error connecting to database: ' + e)
    }

    return connection
}

async function close(connection) {
    try {
        await connection.close()
    } catch (e) {
        console.error('[oracle] error closing db connection: ' + connection)
    }
}

async function getPosts(connection) {
    let posts = null
    try {
        posts = connection.execute('select * from t_post', (e, r) => {
            console.log(r)
        }).catch((err) => {
            console.log('[oracle] error fetching posts: ' + err)
        }) 
    } catch (e) {
        console.error('[oracle] error getting posts: ' + e)
    }

    // posts.then((data) => {
    //     console.log('posts fetched')
    //     console.log(data.metaData)
    // })

    return posts
}

// async function getPosts(db) {
//     return await db.execute('select * from T_POST')
// }


function testRun() {
    var connection = connect(connection)

    connection.then((connection) => {
        posts = getPosts(connection)
        close(connection)

    }).catch((e) => {
        console.log('[oracle] connection promise failed')
    }).finally(() => {
        console.log('[debug] testRun() finished')
    })
}

testRun()