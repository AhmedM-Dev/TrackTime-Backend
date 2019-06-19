import moment from 'moment';

const setHoursPlan = async ({ db, body }, res) => {

  try { 
    
  } catch (error) {

  }

  if (query && Object.keys(query).length > 0) {
    // await db.collection('hoursPlan').insertOne({})
  } else {
    return res.status(500).json({
      error: 'Bad request.'
    })
  }

}