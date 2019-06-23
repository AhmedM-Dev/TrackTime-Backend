const ComputeScores = async (db) => {
  try {
    const users = await db.collection('users').find({}).toArray();
    const formula = await db.collection('config').findOne({ type: 'formula' });

    if (users && users.length > 0) {
      users.map(item => {
        //Computing scores for users
      })
    }

  } catch(error) {
    console.error("ComputeScores -> An error occured.")
  }
}

export default ComputeScores;