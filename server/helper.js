const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./const');

//db find helper
async function dbFind(db, field, value) {
  try {
    const querie = await db.find({
      selector: {
        [field]: value,
      },
    });
    querie?.docs?.map((el) => delete el.password); //delete password fields from docs

    if (querie.docs.length === 0) {
      return false;
    } else {
      return querie?.docs;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//db find by id
async function dbGet(db, id) {
  try {
    const querie = await db.get(id);
    return querie;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//db get all
async function dbAll(db) {
  try {
    const querie = await db.allDocs({
      include_docs: true,
    });
    return querie;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//db update and assign or create doc if not exists
async function dbUpdate(db, id, payload) {
  try {
    const data = await dbGet(db, id);

    //if there is no key in db
    if (!data) {
      Object.assign(payload, { _id: `${id}` });
      const response = await db.put(payload);
      if (response.ok) {
        return await db.get(id);
      } else {
        throw new Error('Failure');
      }
    }
    Object.assign(data, payload);
    const response = await db.put(data);
    if (response.ok) {
      return await db.get(id);
    } else {
      throw new Error('Failure');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function dbRemoveDoc(db, id) {
  try {
    const doc = await db.get(id)
    return await db.remove(doc);
    
    
  } catch (error) {
    console.error(error);
    return false
    
  }

}

//check if db has admin account => false init db
async function dbInit(db, doc) {
  const entry = await dbFind(db, 'name', 'admin');

  if (!entry) db.bulkDocs(doc);
}

//clean object before socket.emit
function cleanObject(data) {
  return {
    left: data?.left,
    main: data?.main,
    right: data?.right,
    timer: data?.timer,
  };
}

//clean settings body
function cleanSettingsBody(body) {
  return Object.keys(body).map((key) => {
    if (body[key] === 'true') {
      body[key] = true;
    } else if (body[key] === 'false') {
      body[key] = false;
    } else {
      body[key] = parseInt(body[key]);
    }
  });
}

//middleware to protect settings route
function middleware(req, res, next) {
  const token = req?.headers?.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded) next();
  } catch (err) {
    console.error(err);
    return res.status(403).send({ msg: 'Unauthorized' });
  }
}

//check env if running in docker
function isDocker(db) {
  try {
    if(process.env?.DOCKER_RUNNING) {
      dbUpdate(db, 'settings', {isDocker: true})
    }else{
      dbUpdate(db, 'settings', {isDocker: false})
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  dbFind,
  dbInit,
  dbGet,
  dbAll,
  dbUpdate,
  cleanObject,
  cleanSettingsBody,
  middleware,
  dbRemoveDoc,
  isDocker
};
